<?php

// DO NOT EDIT BELOW THIS LINE
ini_set('display_errors', '0');

error_reporting(E_ALL | E_STRICT);

$_access_token = $_POST['fb_app_id'].'|'.$_POST['fb_app_secret'];//$_GET['access-token'];//
$page = isset($_POST['page']) ? $_POST['page'] : 'ufc';
$limit = isset($_POST['limit']) ? (int) ($_POST['limit'] > 80 ? 80 : $_POST['limit']) : 10;
$wall = isset($_POST['wall_type']) ? $_POST['wall_type'] : 'feed';


$api_v = 'v2.10';

	$fields =  "id,message,picture,link,name,description,type,icon,created_time,from,object_id,source,attachments,comments.summary(1){id},likes.summary(1){id}";	
			
if($wall == "posts") {
    $fields = "id,message,picture,link,name,description,type,icon,created_time,from,object_id,source,attachments,comments.summary(1){id},likes.summary(1){id}";
}
$gURL = 'https://graph.facebook.com/'.$api_v.'/'.$page.'/'.$wall.'?key=value&access_token='.$_access_token.'&fields='.$fields.'&limit='.$limit;
$pURL = 'https://graph.facebook.com/'.$api_v.'/'.$page.'?key=value&access_token='.$_access_token.'&fields=id,link,name';


// get page details
$pageObject = file_get_contents($pURL);

if ( $pageObject === false )
{
   $pageObject = dc_curl_get_contents($pURL);
}

$pageDetails  = json_decode($pageObject);
$pageLink = isset($pageDetails->link) ? $pageDetails->link : 'https://web.facebook.com/groups/' . $page ;
$pageName = isset($pageDetails->name) ? $pageDetails->name : '';

// get page feed
$graphOBJ = file_get_contents($gURL);

if ( $graphOBJ === false )
{
   $graphOBJ = dc_curl_get_contents($gURL);
}

$parsedJson  = json_decode($graphOBJ);


$pagefeed = $parsedJson->data;
$count = 0;
$link_url = '';
$_data = array();

$_data['d']['feed']['LINK'] = "";


if(is_array($pagefeed)) {

	foreach($pagefeed as $data)
	{
		
		if(isset($data->message))
		{
			$message = str_replace("\n","</br>",$data->message);
		} else if(isset($data->story))
		{
			$message = $data->story;
		} else {
			$message = '';
		}
		
		if(isset($data->description))
		{
			$message .= ' ' . $data->description;
		}
		
		$link = isset($data->link) ? $data->link : '';
		$image = isset($data->picture) ? $data->picture : null;
		$type = isset($data->type) ? $data->type : '';
		$profile_photo = 'https://graph.facebook.com/'.$page.'/picture?type=normal';
		
		
		if($link == ''){
			$id = isset($data->id) ? $data->id : '';
			$idArray = explode('_', $id);
			$link = $pageLink . '/posts/' . $idArray[1];
		}
		
		
		$link_url = $link;

		
		if($type == 'status' && isset($data->story)) {
			continue;
		}
		

		if(!isset($data->object_id) && $type != 'video') {
			$pic_id = explode("_", $image);	
			if(isset($pic_id[1])){
				$data->object_id = $pic_id[1];
			}
		}
		
		if(isset($data->object_id)){
		
			if(strpos($image, 'safe_image.php') === false && is_numeric($data->object_id)) {
				$image = 'https://graph.facebook.com/'.$data->object_id.'/picture?type=normal';
			}
		
		}


		if(isset($data->attachments->data))
		{
			$imagefeed = $data->attachments->data;
			if(is_array($imagefeed)) {
				foreach($imagefeed as $attach)
				{
					$image = $attach->media->image->src;
				}
			}
		}
		
		if( $data->type == 'video' )
		$_data['d']['feed']['entries'][$count]['VIDEO_SOURCE'] = $data->source;
		
		$_data['d']['feed']['entries'][$count]['POST_ID'] = $data->id;
		$_data['d']['feed']['entries'][$count]['ATTACHMENT_ID'] = $data->attachments->data[0]->target->id;
		$_data['d']['feed']['entries'][$count]['TYPE'] = $data->type;
		$_data['d']['feed']['entries'][$count]['pageURL'] = $pageLink;
		$_data['d']['feed']['entries'][$count]['pageTITLE'] = $pageName;
		$_data['d']['feed']['entries'][$count]['LINK'] = $link;
		$_data['d']['feed']['entries'][$count]['CONTENT'] = $message;
		$_data['d']['feed']['entries'][$count]['THUMB'] = $image;
		$_data['d']['feed']['entries'][$count]['PROFILE_PHOTO'] = $profile_photo;
		$_data['d']['feed']['entries'][$count]['DATE'] = date("D, d M Y H:i (O)", strtotime($data->created_time));
		$_data['d']['feed']['entries'][$count]['COMMENTS_COUNT'] = $data->comments->summary->total_count;
		$_data['d']['feed']['entries'][$count]['LIKES_COUNT'] = $data->likes->summary->total_count;
		$count++;
	}
}

function dc_curl_get_contents($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}


header("Content-Type: application/json; charset=UTF-8");
echo json_encode($_data);



