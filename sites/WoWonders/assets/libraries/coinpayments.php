<?php
namespace MineSQL;

class CoinPayments
{

	private $secretKey, $merchantId, $formFields;
	// for all available POST fields navigate to: https://www.coinpayments.net/merchant-tools-simple 
	public $requiredFields = ['merchant', 'item_name', 'currency', 'amountf', 'cmd', 'reset'];

	const ENDPOINT = 'https://www.coinpayments.net/index.php';
	
	//Chainable setters
	public function setMerchantId($id)
	{
		$this->merchantId = $id;
		return $this;
	}
	
	//Chainable setters
	public function setSecretKey($secret)
	{
		$this->secretKey = $secret;
		return $this;
	}

	public function setFormElement($name, $value)
	{
		$this->formFields[$name] = $value;
	}

	public function createForm()
	{
	    //Automatically set merchant field
	    $this->setFormElement('merchant', $this->merchantId);
	    $this->setFormElement('cmd', '_pay');
	    $this->setFormElement('reset', 1);
	    
	    $formFields = $this->formFields;
	    
	    // This checks and ensures that the required fields (listed above in the class properties)
	    // is in the payment configuration with CoinPayments::setFormElement()
		foreach($this->requiredFields as $field)
		{
		    // Checks if there is an entry into the given form fields
			if(!array_key_exists($field, $formFields))
			{
				//there is not an entry for a required field. Throw an error.
				throw new Exception($field.' value is required for form creation.');
			}
		}
		
	    // Start the creation of a new form
	    $form = '<form action="'.self::ENDPOINT.'" method="post">';
        
        //Cycle through all the fields given and create hidden post fields.
		foreach($formFields as $name => $value) {
			$form .= '<input type="hidden" name="'.$name.'" value="'.$value.'">';
		}
		
		//create a generic button to forward the user to the coinpayments gateway
		$form .= '<button type="submit" name="coinPaymentsBtn" class="CoinPayments">Pay With CoinPayments</button></form>';

		return $form;
	
	}

    //dependancy injection for $_POST & $_SERVER
	public function listen(array $post, array $server)
	{
	    $merchantId = $this->merchantId;
	    $secretKey = $this->secretKey;
	    
		if(!isset($post['ipn_mode']) || !isset($post['merchant']))
		{
			//$this->callbackError(400, 'Missing POST data from callback.');
			return false;

		}


		if($post['ipn_mode'] == 'httpauth') 
		{
			//Verify that the http authentication checks out with the users supplied information 
			if($server['PHP_AUTH_USER']!=$merchantId || $server['PHP_AUTH_PW']!=$secretKey)
			{				
		        //$this->callbackError(401, 'Unauthorized HTTP Request.');
		        
		        return false;
			}

		}
		elseif($post['ipn_mode'] == 'hmac') 
		{
            // Create the HMAC hash to compare to the recieved one, using the secret key.
			$hmac = hash_hmac("sha512", file_get_contents('php://input'), $secretKey);
	        
			if($hmac != $server['HTTP_HMAC']) {
	
				// $this->callbackError(401, 'Unauthorized HMAC Request.');
		        
		        return false;
			}

		} 
		else 
		{

			//$this->callbackError(402, 'Unknown or Malformed Request.');
		        
		    return false;
		}
		
		// Passed initial security test - now check the status
        $status = intval($post['status']);
        $statusText = $post['status_text'];
        
        if($post['merchant']!=$merchantId)
        {
            //$this->callbackError(403, 'Mismatching merchant ID.');
            
            return false;
        }
        
        if($status < 0 )
        {
            // There has been an error with the payment - throw an error
            //$this->callbackError($status, $statusText);
            return false;
        }
        elseif($status == 0)
        {
            // the payment is pending
            return false;
        }
        elseif($status>=100 || $status == 2)
        {
            // the payment has been successful
            return true;
        }

	}
	
	private function callbackError(int $errorCode, string $errorMessage)
	{
	    //throw new Exception('#'.$errorCode.' There was a problem establishing integrity with the request: '.$errorMessage);
	}


}
