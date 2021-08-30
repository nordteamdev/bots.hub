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
 
class _MARKET extends _global_co {


public $userid;
public $time;
public $id;
public $market_templates;

public function __construct($filter_function = false){

//the old building from parent class
parent::__construct();


 
$this->userid = isset($this->USER['id']) ? $this->USER['id'] : 0;

$this->id = isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : (isset($_GET['id']) ? (int) $this->test_input($_GET['id']) : '');
$this->id = preg_replace('/[^0-9]/', '', $this->id);
$this->time = time();
$this->market_templates = $this->theme_dir."/market/";


$this->template->assign('this',$this);



}


// index
public function market(){

 
	$limit = 25;
	$category = isset($_GET['category']) ? $this->test_input(base64_decode(str_replace('.php','', $_GET['category']))) : '';

 
	if($category){
 

	$query = $this->query_select("select SQL_CALC_FOUND_ROWS * from ".tbl_market." 
	where userid <> '{$this->userid}' and `product_category`='{$category}'
	group by id order by added desc limit 100");
	}else {
		
	$query = $this->query_select("select SQL_CALC_FOUND_ROWS m.* from ".tbl_market."m
	
	left join ".tbl_friends."f1 ON f1.userid = '{$this->userid}' and f1.status='confirmed'
	left join ".tbl_friends."f2 ON f2.userid = f1.friendid and f2.status='confirmed'
	where m.userid <> '{$this->userid}' and (
												m.userid = f1.friendid
												||
												m.userid = f2.friendid
												)
	group by m.id order by m.added desc limit ".$limit);	
	
	}
		
	
	$count = $this->db->query("SELECT FOUND_ROWS() as c");
	$count = $count->fetch_array(MYSQLI_ASSOC);
	$count = $count['c'];
 
	
	$this->template->assign([
	"count" => $count,
	"query" => $query,
	"limit" => $limit,
	"filter" => 0,
	"order" => "",
	"category" => $category,
	"price_from" => "",
	"price_to" => "",
	"location" => "",
	"view_as" => ""
    
]	);







	$content = $this->template->fetch($this->theme_dir.'/market/index.html');
	echo $this->getPage($content);
}

public function new_product(){
	
	$content = $this->template->display($this->theme_dir.'/market/new-product.html');
	
}

public function edit_product(){
	
	$q = $this->query_select("select * from ".tbl_market." where `id`='{$this->id}' limit 1");
	
	if(count($q) <= 0){
		
	$content = $this->info_msg($this->lang['sorry_product_was_not_found']);
	
	} else {
		
		if ($q[0]['userid'] != $this->USER['id'])
			$content = $this->info_msg($this->lang['sorry_product_was_not_found']);
		else{
			$this->template->assign("q",$q);
			$content = $this->template->display($this->theme_dir.'/market/edit-product.html');
		}
		
	}
	
   
	
}

public function upload_images(){
	
	 
	
	if($this->settings['AMAZON_S3_ENABLED'])
		$this->marketUploadPicturesToS3();
	else
		$this->marketUploadPictures();
	
	
}

// upload pictures
public function marketUploadPictures(){
	
	$author_id = $this->USER['id'];
	$max_file_size = 1048576 * $this->settings['MAX_FILE_UPLOAD'];
    $dir = __ROOT__.__MARKET_IMAGES_DIR;
    $large       = $dir.'/'.$author_id.'/large/';
    $medium      = $dir.'/'.$author_id.'/medium/';
    $small       = $dir.'/'.$author_id.'/small/';

	$image_url_done_large = $this->settings['HOST'].__MARKET_IMAGES_DIR.'/'.$author_id.'/large/';
	$image_url_done_small = $this->settings['HOST'].__MARKET_IMAGES_DIR.'/'.$author_id.'/small/';

    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

    // large dir
    if(!file_exists($large))
    mkdir($large, 0777, true);

    // medium dir
    if(!file_exists($medium))
    mkdir($medium, 0777, true);

    // small dir
    if(!file_exists($small))
    mkdir($small, 0777, true);


$uploadOk = 1;

$message = array();
$count   = 0;
  
	
	    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $this->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
		$fileExt = end($temp);
                $newName = basename($author_id.'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
		$mainImage = $large . $newName;

                // No error found! Move uploaded files 
                if (move_uploaded_file($_FILES["files"]["tmp_name"][$f], $mainImage)) {
                    $count++; // Number of successfully uploaded files


        $fileSize = filesize($mainImage);
	//Let's check allowed $ImageType, we use PHP SWITCH statement here
	switch(strtolower($_FILES['files']['type'][$f]))
	{
		case 'image/png':
			//Create a new image from file 
			$CreatedImage = imagecreatefrompng($mainImage);
			break;
		case 'image/gif':
			$CreatedImage = imagecreatefromgif($mainImage);
			break;			
		case 'image/jpeg':
		case 'image/pjpeg':
		case 'image/jpg':
			$CreatedImage = imagecreatefromjpeg($mainImage);
			break;
		default:
			$this->dieErr(['response' => 'Unsupported File!']); //output error and exit
	}
			list($CurWidth,$CurHeight)=getimagesize($mainImage);

	 
    // small dir
    $small_size = cropImage($CurWidth,$CurHeight,
	$this->settings['MARKET_PRODUCTS_SMALL_IMAGES_SIZE'],
	$small.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);
  
		
    // medium dir
    /*$medium_size = smart_resize_image($mainImage, 
                                       null,
                                       $this->settings['MARKET_PRODUCTS_MEDIUM_IMAGES_SIZE'],
                                       $this->settings['MARKET_PRODUCTS_MEDIUM_IMAGES_SIZE'],
                                       true,
                                       $medium.$newName,
                                       FALSE ); 
									   */
 					   
   $medium_size = cropImage($CurWidth,$CurHeight,
	$this->settings['MARKET_PRODUCTS_MEDIUM_IMAGES_SIZE'],
	$medium.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);



	
	$time = $this->time;
    $fake_item_id = $author_id.'*'.$time;	
	$picture_id = $this->query_insert("insert into ".tbl_market_pictures." set `userid`='{$author_id}',`filename` = '{$newName}', `added`='{$time}',
	`size`='{$fileSize}', `type`='{$fileExt}',`product_id`='{$fake_item_id}'");
				
				

				      if (!$picture_id) {
                        @unlink($mainImage);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
						
						// add to feed
					//	if(!$is_post) $this->insertIntoFeed($picture_id,$this->id,'picture');
						
					}
				
				}
				
			}
		}
	}
	
if ($message) 
    echo json_encode($message);
 else
    echo json_encode(array("status" => "OK", 
"photoid" => $picture_id, 
"filename" => $newName, 
"userid" => $author_id, 
"added" => $time, 
"fake_item_id" => $fake_item_id,
"size" => $fileSize, 
"s3" => "no",
"extension" => $fileExt,
"small_image_url" => $image_url_done_small.$newName
));



}
 private function unlinkMarketPicture($author_id,$filename){
	 
    $dir = __ROOT__.__MARKET_IMAGES_DIR;
    $large       = $dir.'/'.$author_id.'/large/';
    $medium      = $dir.'/'.$author_id.'/medium/';
    $small       = $dir.'/'.$author_id.'/small/';

// delete large
if(file_exists($large.$filename))
 unlink($large.$filename);

// delete medium
if(file_exists($medium.$filename))
 unlink($medium.$filename);

// delete small
if(file_exists($small.$filename))
 unlink($small.$filename);

return true;
	 
 }
 public function deletePicture($pic_id = 0, $_return = false){
	 
	
 
$picture_id = $pic_id ? $pic_id : (isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : 0);
$author_id = $this->USER['id'];
$filename_post = isset($_POST['fname']) ? $this->test_input($_POST['fname']) : '';


if($filename_post){
	// delete from database
	$delete = $this->query_delete("delete from ".tbl_market_pictures." where `id`='{$picture_id}'");
	echo $this->unlinkMarketPicture($author_id,$filename_post);
	exit;
}

// check for s3
$q = $this->db->query("select `id`,`s3`,`userid`,`filename` from ".tbl_market_pictures." where `id`='{$picture_id}' limit 1");
$row = $q->fetch_array(MYSQLI_ASSOC);


$msg = 1;	

if(!isset($row['id'])){
	echo 0;exit;
}

$s3 = $row['s3'];
$userid = $row['userid'];
$filename = $row['filename'];	
	
if($author_id !== $userid || !$picture_id)
$msg = 0;


if( $s3 == 'no'){
$this->unlinkMarketPicture($author_id,$filename);


// delete from database
$delete = $this->query_delete("delete from ".tbl_market_pictures." where `id`='{$picture_id}'");

if($delete) $msg = 1;
 else 
	 $msg = 0;
}
 else if ($s3 == 'yes'){
	 

foreach($this->settings['AMAZON_S3_MARKET_PICTURES_BUCKETS'] as $_bucket):
          
						
									// Delete objects from a bucket
							 
								$delete = $this->s3->deleteObject(AWS_S3_BUCKET_NAME.'/market/images/'.$author_id.'/'.$_bucket, $filename);
												   endforeach;
	 
// delete from database
$delete_sql = $this->query_delete("delete from ".tbl_market_pictures." where `id`='{$picture_id}'");

if($delete) $msg = 1;
 else 
	 $msg = 0;
	 
 }
 
 if($_return) return $msg; else echo $msg; 
 }
 
 
 
 
// upload pictures to S3
public function marketUploadPicturesToS3() {
	
	/* create folders */
	$buckets = $this->settings['AMAZON_S3_MARKET_PICTURES_BUCKETS'];
	$author_id = $this->USER['id'];
 
	if( !  in_array(AWS_S3_BUCKET_NAME, $this->s3->listBuckets()) ) {
	
			//create a new bucket
			$this->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
	
		$max_file_size = 1048576 * $this->settings['MAX_FILE_UPLOAD'];
		$uploadOk = 1;

		$message = array();
		$count   = 0;
 
	
	
	
	$s3_dir = __ROOT__.'/stcmd/s3-market-pictures/';
	$s3_dir_large = $s3_dir.'/'.strtoupper(AWS_S3_BUCKET_NAME).'LARGE/';
	$success = false;
		
		
    // generate dir  
    if (!file_exists($s3_dir))
    mkdir($s3_dir, 0777, true);
 
    // generate dir  
    if (!file_exists($s3_dir_large))
    mkdir($s3_dir_large, 0777, true);
	
	
		    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name):
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $this->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
				$fileExt = end($temp);
                $newName = basename($author_id.'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
				$mainImage = $s3_dir_large . $newName;
			    $fileTempName = $_FILES['files']['tmp_name'][$f];
				$r = 0;
		
				if (move_uploaded_file($fileTempName, $mainImage)) {
 
				$count++; // Number of successfully uploaded files
				
			foreach($buckets as $bucket):
		
		
				    // generate dir  
					$s3_b_dir = $s3_dir.strtoupper(AWS_S3_BUCKET_NAME.$bucket).'/';
		
		if (!file_exists($s3_b_dir))
					mkdir($s3_b_dir, 0777, true);
				
				
				if ( strstr($bucket, "medium") !== false ) {
					
						/*$r_image =	smart_resize_image($mainImage, 
                                       null,
                                       $this->settings['MARKET_PRODUCTS_MEDIUM_IMAGES_SIZE'],
                                       $this->settings['MARKET_PRODUCTS_MEDIUM_IMAGES_SIZE'],
                                       true,
                                       $s3_b_dir.$newName,
                                       FALSE ); 
									   */
					$fileSize = filesize($mainImage);
					
					//Let's check allowed $ImageType, we use PHP SWITCH statement here
					switch(strtolower($_FILES['files']['type'][$f]))
					{
						case 'image/png':
							//Create a new image from file 
							$CreatedImage = imagecreatefrompng($mainImage);
							break;
						case 'image/gif':
							$CreatedImage = imagecreatefromgif($mainImage);
							break;			
						case 'image/jpeg':
						case 'image/pjpeg':
						case 'image/jpg':
							$CreatedImage = imagecreatefromjpeg($mainImage);
							break;
						default:
							$this->dieErr(['response' => 'Unsupported File!']); //output error and exit
					}
					
					
					list($CurWidth,$CurHeight) = getimagesize($mainImage);
									   
						$r_image = cropImage($CurWidth,$CurHeight,
											$this->settings['MARKET_PRODUCTS_MEDIUM_IMAGES_SIZE'],
											$s3_b_dir.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);	   

				 
					}else if( strstr($bucket, "small") !== false){
	 
									
					$fileSize = filesize($mainImage);
					
					//Let's check allowed $ImageType, we use PHP SWITCH statement here
					switch(strtolower($_FILES['files']['type'][$f]))
					{
						case 'image/png':
							//Create a new image from file 
							$CreatedImage = imagecreatefrompng($mainImage);
							break;
						case 'image/gif':
							$CreatedImage = imagecreatefromgif($mainImage);
							break;			
						case 'image/jpeg':
						case 'image/pjpeg':
						case 'image/jpg':
							$CreatedImage = imagecreatefromjpeg($mainImage);
							break;
						default:
							$this->dieErr(['response' => 'Unsupported File!']); //output error and exit
					}
					
					
					list($CurWidth,$CurHeight) = getimagesize($mainImage);
					
					
					
					    $r_image = cropImage($CurWidth,$CurHeight,
												$this->settings['MARKET_PRODUCTS_SMALL_IMAGES_SIZE'],
												$s3_b_dir.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);
																

									   

					}
 
					
					$folderName = 'market/images/'.$author_id.'/'.$bucket.'/';  // path on s3 bucket.
					
		 
				    //move the file
					if($this->s3->putObjectFile($s3_b_dir.$newName, AWS_S3_BUCKET_NAME, $folderName.$newName, S3::ACL_PUBLIC_READ)){
					$r = 1;
				 
					// delete images from localhost
					 if ( strstr($bucket, "large") === false) unlink($s3_b_dir.$newName);
					}
				
				
				if ($r) {
					 
					$success = true;
				}else{
					$message[] = "Something went wrong while uploading your file... sorry.";
				}
				
				
				endforeach;
				// delete main image from server
				if( $success ) unlink($mainImage);

 
				if($success):
					
					$time = $this->time;
					$fake_item_id = $author_id.'*'.$time;	
					$picture_id = $this->query_insert("insert into ".tbl_market_pictures." set `s3`='yes',`userid`='{$author_id}',`filename` = '{$newName}', `added`='{$time}',
					`size`='{$fileSize}', `type`='{$fileExt}',`product_id`='{$fake_item_id}'");
					
					$image_url_done_small = '//'.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/'.$folderName;
					
				if (!$picture_id) {
                     
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    }  
					
					
					
					
					
				endif;
				
				
				
				}
		
		
		
		
		}
		}
		
	endforeach;
 

if ($message) 
    echo json_encode($message);
 else
    echo json_encode(array("status" => "OK", 
"photoid" => $picture_id, 
"filename" => $newName, 
"userid" => $author_id, 
"added" => $time, 
"fake_item_id" => $fake_item_id,
"size" => $fileSize, 
"extension" => $fileExt,
"s3" => "yes",
"small_image_url" => $image_url_done_small.$newName
));

	
	
}
 
 public function createNewProduct(){
	 
	 
	 $p_title = isset($_POST['product_title']) ? $this->test_input($_POST['product_title']) : '';
	 $p_descr = isset($_POST['product_description']) ? $this->test_input($_POST['product_description']) : '';
	 $p_price = isset($_POST['product_price']) ? $this->test_input($_POST['product_price']) : '';
	 $p_location = isset($_POST['product_location']) ? $this->test_input($_POST['product_location']) : '';
	 $p_category = isset($_POST['product_category']) ? $this->test_input($_POST['product_category']) : '';
	 $p_cover = isset($_POST['product_cover']) ? $this->test_input($_POST['product_cover']) : '';
	 $p_pictures = isset($_POST['product_pictures']) ? json_decode($_POST['product_pictures'],true) : '';
	 $product_id = isset($_POST['product_id']) ? $this->test_input($_POST['product_id']) : false;
	 $author = $this->USER['id'];
	 $new_product_id = $product_id ? $product_id : 0;
 
	if($product_id){
		
		// update product
		$update_product = $this->query_update("update ".tbl_market." set 
																	`userid`='{$author}',
																	`added`='{$this->time}',
																	`product_name`='{$p_title}',
																	`product_category`='{$p_category}',
																	`product_description`='{$p_descr}',
																	`product_cover`='{$p_cover}',
																	`product_location`='{$p_location}',
																	`price`='{$p_price}'
																	
																	where `id`='{$product_id}'	
																	");
		
	} else {
 
		// add new product
		$new_product_id = $this->query_insert("insert into ".tbl_market." set 
																	`userid`='{$author}',
																	`added`='{$this->time}',
																	`product_name`='{$p_title}',
																	`product_category`='{$p_category}',
																	`product_description`='{$p_descr}',
																	`product_cover`='{$p_cover}',
																	`product_location`='{$p_location}',
																	`price`='{$p_price}'");
																	
																	
		$this->toFeed($new_product_id,'market_product','productToFeed',0,false);														
		
	}

	 if(isarray($p_pictures) && $new_product_id){
		 
		 foreach($p_pictures as $picture):
		 
			$this->query_update("update ".tbl_market_pictures." set `product_id`='{$new_product_id}' where `id`='{$picture}'");
		 
		 endforeach;
		 
	 }
	 if($new_product_id) echo $new_product_id; else echo 0;
 }
 
public function viewProduct($popup = false){
	 $product_id = isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : (isset($_GET['id']) ? (int) $this->test_input($_GET['id']) : 0);
	 $nop = isset($_POST['nop']) ? $this->test_input($_POST['nop']) : (isset($_GET['nop']) ? $this->test_input($_GET['nop']) : 0);
	 $q = $this->query_select("select * from ".tbl_market." where `id`='{$product_id}' limit 1");
	if($nop) $popup = true;
	$author_id = $q['0']['userid'];
	// next & previous id
	$n_prev_id = $this->query_select(" select id from ".tbl_market." 
		where ( 
        id = IFNULL((select min(id) from ".tbl_market." where id > '{$product_id}' and `userid`='{$author_id}'),0) 
        or  id = IFNULL((select max(id) from ".tbl_market." where id < '{$product_id}' and `userid`='{$author_id}'),0)
      )");

	$prev_id = isset($n_prev_id[1]['id']) ? (int) $n_prev_id[1]['id'] : '';
	$next_id = isset($n_prev_id[0]['id']) ? (int) $n_prev_id[0]['id'] : '';

	 $content = '';
	 if(!count($q)){
		 
		 $this->template->assign(["empty" => 1, "id" => $product_id]); 
		 $content = $popup ? $this->template->fetch($this->theme_dir.'/market/popup_product-details.html') : $this->info_msg($this->lang['sorry_product_was_not_found']);
		 
	 } else {
		 
		 
		$this->template->assign(["q" => $q, "nop" => $nop, "next_id" => $next_id,"prev_id" => $prev_id, "empty" => 0, "id" => $product_id]); 
		$content = $popup ? $this->template->fetch($this->theme_dir.'/market/popup_product-details.html') : $this->template->fetch($this->theme_dir.'/market/product-details.html');
 

		 
		 
	 }
	 
	 
	echo $this->getPage($content); 
	 
}
 
public function getProductPictures($product_id,$limit = 6){
	return $this->query_select("select * from ".tbl_market_pictures." where `product_id`='{$product_id}' limit ".$limit);
 
}
 
public function addToFavorites(){
	 
	 $uid = $this->USER['id'];
 
	 $response = array("mode" => "", "succ" => 0);
	 if($this->id > 0 && is_numeric($this->id)){
		 
		 
		 // check if item exit, remove it
		 if( count($this->query_select("select id from ".tbl_market_favorites." where `userid`='{$uid}' and `product_id`='{$this->id}' limit 1"))){
			 
			$remove = $this->query_delete("delete from ".tbl_market_favorites." where `userid`='{$uid}' and `product_id`='{$this->id}'");
			$response['mode'] = "removed";
			if($remove) $response['succ'] = 1;
		 } else {
			 $response['mode'] = "added";
			 $insert = $this->query_insert("insert into ".tbl_market_favorites." set `userid`='{$uid}', `added`='{$this->time}',`product_id`='{$this->id}'");
			 if($insert) $response['succ'] = 1;
		 
		 }
		 
	 } else {
		 $response['succ'] = 0;
	 }
	echo json_encode($response);
}
 
public function itemIsFavorite($id){
	$uid = $this->USER['id'];
	return count($this->query_select("select id from ".tbl_market_favorites." where `product_id`='{$id}' and `userid` = '{$uid}' limit 1"));
}
 
public function myFavoritProductsCount(){
 
	$q = $this->db->query("select COUNT(*) from ".tbl_market_favorites." where `userid` = '{$this->userid}'");
	$c = $q->fetch_row();	 
	return $c[0]; 
}
public function myProductsCount(){
 
	$q = $this->db->query("select COUNT(*) from ".tbl_market." where `userid` = '{$this->userid}'");
	$c = $q->fetch_row();	 
	return $c[0]; 
}
public function myproducts(){
	
	
	$page = isset($_GET['page']) ? (int) $this->test_input($_GET['page']) : 1;
	$limit = 10;
	$start = ($page * $limit) - $limit;
	
	 
	 $q = $this->query_select("select * from ".tbl_market." where `userid`='{$this->userid}' order by added desc limit {$start},{$limit}");
	 $content = '';
	 
		 
		$this->template->assign(["q" => $q, "empty" => 0, "limit" => $limit]); 
		$content = $this->template->fetch($this->theme_dir.'/market/my-products.html');
 
	 
	echo $this->getPage($content); 	
}

public function searchProducts(){
	
	$page = isset($_GET['page']) ? (int) $this->test_input($_GET['page']) : 1;
	$limit = 15;
	$start = ($page * $limit) - $limit;
	
	 $key = isset($_GET['k']) ? str_replace('.php', '' ,$this->test_input($_GET['k'])) : '';
 
	 $q = $this->query_select("select * from ".tbl_market." 
																	where (`product_name` LIKE N'%{$key}%' 
																	OR `product_description` LIKE '%{$key}%')
																	and `userid`<>'{$this->userid}'
																	order by `product_name` asc limit {$start},{$limit}");
	 
	 $content = '';
 
		 
		$this->template->assign(["query" => $q, "filter" => 0, "key" => $key, "limit" => $limit]); 
		$content = $this->template->fetch($this->theme_dir.'/market/search-res.html');
 
 
	
	echo $this->getPage($content); 
	
}
 public function favoriteProducts(){
	 
	$q = $this->query_select("select * from  ".tbl_market_favorites." f, ".tbl_market." m
								where f.userid='{$this->userid}' and m.id = f.product_id
								group by f.id order by f.added");
	 $content = '';
	 
 
		 
		 
		$this->template->assign(["q" => $q, "empty" => 0]); 
		$content = $this->template->fetch($this->theme_dir.'/market/favorite-products.html');
 
	 
	 
	echo $this->getPage($content); 
	 
 }
 
 public function deleteProduct(){
	 
	 
	  $p_details = $this->db->query("Select * from ".tbl_market." where `id`='{$this->id}' and `userid`='{$this->userid}' limit 1");
	  $p_details = $p_details->fetch_array(MYSQLI_ASSOC);
 
	  
	  
	  if(!$p_details['id']){
		  $err = 'not_found';
		  
	  } else if($p_details['id']){
		  
		  // delete pictures
		  $product_pictures = $this->query_select("Select `id` from ".tbl_market_pictures." where `product_id`='{$this->id}'");
		  
		  if(count($product_pictures)){
			  
			  foreach($product_pictures as $pic):
				$this->deletePicture($pic['id'],1);
			  endforeach;
			  
		  }
		  
		  // delete likes
		  $delete_likes = $this->query_delete("delete from ".tbl_klass." where `type`='market_product' and `itemid`='{$this->id}'");
		  // delete comments
		  $delete_comments = $this->query_delete("delete from ".tbl_comments." where `item_type`='market_product' and `itemid`='{$this->id}'");
		  // delete from feed
		  $delete_feed = $this->query_delete("Delete from ".tbl_feed." where `categ`='market_product' and `itemid`='{$this->id}'");
		  // delete product
		  $delete_product = $this->query_delete("delete from ".tbl_market." where `id`='{$this->id}'");
		  
		  if($delete_product)
			  $err = 'success';
	  } else {
		  
		  $err = 'unknown';
		  
	  }
	 
	 
	 echo $err;
	 
 }
 
 public function getProductDetails($id){
	 
	 $q = $this->db->query("select * from ".tbl_market." where `id`='{$id}' limit 1");
	 return $q->fetch_array(MYSQLI_ASSOC);
	 
 }
 
 public function filterProducts(){
	 
	$order = isset($_GET['order']) ? $this->test_input($_GET['order']) : '';
	$category = isset($_GET['category']) ? $this->test_input(base64_decode($_GET['category'])) : '';
	$price_from = isset($_GET['price-from']) ? $this->test_input($_GET['price-from']) : '';
	$price_to = isset($_GET['price-to']) ? $this->test_input($_GET['price-to']) : '';
	$location = isset($_GET['location']) ? $this->test_input($_GET['location']) : '';
	$filter = isset($_GET['filter']) ? $this->test_input($_GET['filter']) : '';
	$view_as_json = isset($_GET['view_as']) ? true : false;
	 
	 
	 
	 $sql_order = 'order by id desc';
	 
	 
	// order
		switch($order){
			default:
			case 'new':
			$sql_order = "order by id desc";
			break;
			
			case 'high':
			$sql_order = "order by price asc";
			break;
			
			case 'low':
			$sql_order = "order by price desc";
			break;
			
			
		}
		
		
	$sql_categ = $category ? " and `product_category`='{$category}'" : '';
 
	$sql_price_from = $price_from ? " and `price` >= '{$price_from}'" : '';
	$sql_price_to = $price_to ? " and `price` <= '{$price_to}'" : '';
	$sql_location = $location ? " and `product_location`='{$location}'" : '';
	
	 
	
	$query = $this->query_select("select SQL_CALC_FOUND_ROWS * from ".tbl_market."
	
	where userid <> '{$this->userid}' ".$sql_categ.$sql_price_from.$sql_price_to.$sql_location." 
	group by id ".$sql_order);
		
	$count = $this->db->query("SELECT FOUND_ROWS() as c");
	$count = $count->fetch_array(MYSQLI_ASSOC);
	$count = $count['c'];
	 
	$this->template->assign([
	"count" => $count,
	"query" => $query,
	"order" => $order,
	"category" => $category,
	"price_from" => $price_from,
	"price_to" => $price_to,
	"location" => $location,
	"view_as" => $view_as_json,
	"limit" => 25,
	"filter" => 1
    
]	);
	$content = $this->template->fetch($this->theme_dir.'/market/index.html');
	echo $this->getPage($content);
 }

} // end class