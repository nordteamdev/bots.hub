<?php 

header('Content-type:application/json;charset=utf-8');


$url = 'https://api.flickr.com/services/feeds/photos_public.gne?method=flickr.photos.getRecent&format=json&nojsoncallback=1';
//  Initiate curl
$ch = curl_init();
// Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// Will return the response, if false it print the response
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Set the url
curl_setopt($ch, CURLOPT_URL,$url);
// Execute
$result=curl_exec($ch);
// Closing
curl_close($ch);

echo $result;