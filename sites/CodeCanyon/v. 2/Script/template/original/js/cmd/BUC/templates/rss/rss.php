<?php
ini_set('display_errors', '0');
error_reporting(E_ALL | E_STRICT);

header('Content-Type: application/json');
$feed = new DOMDocument();

$page_id = isset($_POST['id']) ? $_POST['id'] : '';
$limit = isset($_POST['limit']) ? $_POST['limit'] : 20;
$type = isset($_POST['type']) ? $_POST['type'] : 'rss';

if($type == 'pinterest')
{
	$source = isset($_POST['feed']) ? $_POST['feed'] : 'user';

	if ( $source == 'board' ){
	   $feed_url = 'https://www.pinterest.com/' . $page_id . '.rss';
	} else {
	   $feed_url = 'https://www.pinterest.com/' . $page_id . '/feed.rss';
	}
} else {

	$feed_url = 'http://' . $page_id;
	
}

$feed->load($feed_url);
$count = 0;
$json = array();

$feed_title = $feed->getElementsByTagName('channel')->item(0)->getElementsByTagName('title')->item(0)->firstChild->nodeValue;
$items = $feed->getElementsByTagName('channel')->item(0)->getElementsByTagName('item');

$json['item'] = array();

foreach($items as $item) {

   $title = $item->getElementsByTagName('title')->item(0)->firstChild->nodeValue;
   $description = $item->getElementsByTagName('description')->item(0)->firstChild->nodeValue;
   
   $text = $item->getElementsByTagName('description')->item(0)->firstChild->nodeValue;
   $image = dc_get_image($text);
   
	$clear = trim(preg_replace('/ +/', ' ', preg_replace('[^A-Za-z0-9АИМСЗаимсз]', ' ', urldecode(html_entity_decode(strip_tags($text))))));
   

   $link = $item->getElementsByTagName('guid')->item(0)->firstChild->nodeValue;  
   $publishedDate = $item->getElementsByTagName('pubDate')->item(0)->firstChild->nodeValue;
   
   $json['item'][$count] = array("title"=>$title,"description"=>$description,"link"=>$link,"publishedDate"=>$publishedDate,"text"=>$clear,"feedTitle"=>$feed_title,"image"=>$image);
   $count++;
}

echo json_encode($json);

function dc_get_image($html)
{
	$doc = new DOMDocument();
	@$doc->loadHTML($html);
	$xpath = new DOMXPath($doc);
	$src = $xpath->evaluate("string(//img/@src)"); # "/images/image.jpg"
	return $src;
}
?>