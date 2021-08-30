<?php
/*

Kontackt License Agreement (DMCA License)

Copyright (c) 2015, Alex Dobrovolscki (dobriisasa@gmail.com)
All rights reserved.

* Redistributions of source code is strictly forbidden.

* By using Kontackt you may have your own purchase copy, if you are not own a license, you can buy one from https://codecanyon.net/user/dobrovolscki/portfolio.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/


// engine file
require_once('inc/_core.php');


try {
	
	// build engine
	$core = new _SOCIALPLUS;
    $glb  = $core->im_global();


	$id = isset($_GET['p']) ? (int) $core->test_input($_GET['p']) : '';
	$size = isset($_GET['sz']) ? $core->test_input($_GET['sz']) : 'large';  
	$product_id = isset($_GET['product_id']) ? (int) $core->test_input($_GET['product_id']) : '';
  
	
	if(!is_numeric($id))
	die;

	$fn = $glb->marketGeneratePicture($size,$product_id,$id);

	if($core->CheckS3Pictures($fn)){
		
	 	if(!$core->checkAWSfileExists($fn)) $fn = __ROOT__._MARKET_DEFAULT_COVER;
		 
	}
 
	header('Content-Type: image/jpeg');
	
	echo file_get_contents($fn);

} catch (Exception $e) {
	print $e->getMessage();
}



