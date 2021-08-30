<?php

if ($fl['loggedin'] == false) {
    $data = array(
        'status' => 400,
        'error' => 'Not logged in'
    );
}

use PayPal\Api\Payer;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Details;
use PayPal\Api\Amount;
use PayPal\Api\Transaction;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;


$payment_currency = "USD";
$payer            = new Payer();
$item             = new Item();
$itemList         = new ItemList();
$details          = new Details();
$amount           = new Amount();
$transaction      = new Transaction();
$redirectUrls     = new RedirectUrls();
$payment          = new Payment();
$payer->setPaymentMethod('paypal');

if ($s == 'upto') {
	$data    = array('status' => 400);
	$request = (!empty($_POST['amount']) && is_numeric($_POST['amount']));

	if ($request === true) {
		$rep_amount  = $_POST['amount'];
		$redirectUrl = FL_Link("ajax_requests.php?f=wallet&s=get_paid&status=success&amount=$rep_amount");
		$redirectUrls->setReturnUrl($redirectUrl);    
		$redirectUrls->setCancelUrl(FL_Link('')); 

	    $item->setName('Replenish your balance');
	    $item->setQuantity(1);
	    $item->setPrice($rep_amount);
	    $item->setCurrency($payment_currency);

	    $itemList->setItems(array($item));    
	    $details->setSubtotal($rep_amount);

	    $amount->setCurrency($payment_currency);
	    $amount->setTotal($rep_amount);
	    $amount->setDetails($details);

	    $transaction->setAmount($amount);
	    $transaction->setItemList($itemList);
	    $transaction->setDescription('Replenish your balance');
	    $transaction->setInvoiceNumber(time());

	    $payment->setIntent('sale');
	    $payment->setPayer($payer);
	    $payment->setRedirectUrls($redirectUrls);
	    $payment->setTransactions(array($transaction));

	    try {
	        $payment->create($paypal);
	    }

	    catch (Exception $e) {
	        $data = array(
	            'status' => 500,
	            'details' => json_decode($e->getData())
	        );

	        if (empty($data['details'])) {
	            $data['details'] = json_decode($e->getCode());
	        }
	        echo json_encode($data);
	    	exit();
	    }

	    $data = array(
	        'status' => 200,
	        'type' => 'SUCCESS',
	        'url' => $payment->getApprovalLink()
	    );

	}
}



if ($s == 'get_paid') {
	$data['status'] = 500;

	$request   = array();
	$request[] = (!empty($_GET['paymentId']) && !empty($_GET['PayerID']));
	$request[] = (!empty($_GET['status']) && $_GET['status'] == 'success');
	$request[] = (!empty($_GET['amount']) && is_numeric($_GET['amount']));
	$request   = (!in_array(false, $request) === true);


	if ($request === true) {

		$paymentId = FL_Secure($_GET['paymentId']);
		$PayerID   = FL_Secure($_GET['PayerID']);
		$payment   = Payment::get($paymentId, $paypal);
	    $execute   = new PaymentExecution();
	    $execute->setPayerId($PayerID);

	    try{
	        $result = $payment->execute($execute, $paypal);
	    }

	    catch (Exception $e) {
	        $data = array(
	            'type' => 'ERROR',
	            'details' => json_decode($e->getData())
	        );

	        if (empty($data['details'])) {
	            $data['details'] = json_decode($e->getCode());
	        }

	        echo json_encode($data);
	    	exit();
	    }

		$amount  = $_GET['amount'];
		$update  = array('wallet' => ($fl['user']['wallet'] += $amount));

		$db->where('user_id',$fl['user']['id'])->update(T_USERS,$update);
		$_SESSION['refilled_balance'] = $amount;

		$payment_data = array(
    		'user_id' => $fl['user']['id'],
    		'type'    => 'wallet',
    		'amount'  => $amount,
    		'date'    => date('n') . '/' . date('Y'),
    		'expire'  => 0
    	);

	    $db->insert(T_PAYMENTS,$payment_data);

		$url     = FL_Link('settings/wallet');
    	header("Location: $url");
    	exit();
	}
}
