<?php

$category = isset($_POST['category']) ? $_POST['category'] : 'general';
$source = isset($_POST['source']) ? $_POST['source'] : 'bbc-news';
$apikey = isset($_POST['key']) ? $_POST['key'] : '';
$country  = isset($_POST['country']) ? $_POST['country'] : 'us';
$language  = isset($_POST['language']) ? $_POST['language'] : 'en';




$url = "https://newsapi.org/v1/articles?source={$source}&language={$language}&country={$country}&category={$category}&apiKey={$apikey}";

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


header('Content-type:application/json;charset=utf-8');

echo($result);