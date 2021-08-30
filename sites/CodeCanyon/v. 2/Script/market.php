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
	$market = $core->im_market();
	$cmd = isset($_GET['cmd']) ? $core->test_input($_GET['cmd']) : ( isset($_POST['cmd']) ? $core->test_input($_POST['cmd']) : '');
	$view_as_json = isset($_GET['view_as']) ? $core->test_input($_GET['view_as']) : ( isset($_POST['view_as']) ? $core->test_input($_POST['view_as']) : '');
	
	
	// get header
	if ($_SERVER['REQUEST_METHOD'] != "POST" && !$view_as_json) 
	$core->build_header();

 
	
		switch($cmd) {
		
		default:
		case '':
		 // create page
         $market->market();
		break;
		
		case 'new-product':
		$market->new_product();
		break;
		
		case 'edit-product':
		$market->edit_product();
		break;
		
		case 'upload-images':
		$market->upload_images();
		break;
		
		case 'deletePicture':
		$market->deletePicture();
		break;
		
		case 'create-new-product':
		$market->createNewProduct();
		break;
		
		case 'view-product':
		$market->viewProduct();
		break;
		
		case 'open-product-via-popup':
		$market->viewProduct(1);
		break;
		
		case 'add-to-favorites':
		$market->addToFavorites();
		break;
		
		case 'myproducts':
		$market->myproducts();
		break;
		
		case 'search-products':
		$market->searchProducts();
		break;
		
		case 'favorite-products':
		$market->favoriteProducts();
		break;
		
		case 'delete-product':
		$market->deleteProduct();
		break;
		
		case 'filter':
		$market->filterProducts();
		break;
		
		}

	//get footer
	if ($_SERVER['REQUEST_METHOD'] != "POST" && !$view_as_json) 
	$core->get_footer();

} catch (Exception $e) {
	print $e->getMessage();
}
