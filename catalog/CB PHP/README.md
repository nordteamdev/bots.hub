[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![Minimum PHP Version](https://img.shields.io/badge/php-%3E%3D%207.0-8892BF.svg?style=flat-circle)](https://php.net/)

client-for-vk-chatbots 1.0
=======
VK API client for chatbots with support v. 5.80.

Documentation
---------------
* [Beginning of work](https://github.com/mamadaliev/vk#beginning-of-work)
* [The universal method](https://github.com/mamadaliev/vk#the-universal-method)
* [Example](https://github.com/mamadaliev/vk#example)

Beginning of work
---------------
```php
// config.php

define('VERSION', '5.80');          // VK API version
define('TOKEN', '9d94d3...70d59e'); // your token
define('KEY', '4cw0de5e');          // your security key
```
```php
// example.php

require_once('vk.php'); // connection library for working with VK API
$vk = new VK();         // creating a VK class object
```

The universal method
---------------
```php
$vk->request($method, $callback = []);
```

``$method``      - [methods of VK API](https://vk.com/dev/methods)

``$callback``    - array of transmitted fields

#### Request:
```php
$user_info = $vk->request('users.get', ['user_ids' => '391726310']);
```
#### Response:
```JSON
{
    "response":
    [
        {
            "id": 391726310,
            "first_name": "Sherzod",
            "last_name": "Mamadaliev"
        }
    ]
}
```
#### Output:
```php
echo 'Name: ' . $user_info['response'][0]['first_name']; // Name: Sherzod
```
Example
---------------
```php
require_once('vk.php'); // connection library for working with VK API

$vk = new VK();         // creating a VK class object

if ($vk->data['type'] == 'message_new') // if there is an event message_new
{
    $peer_id = $vk->data['object']['peer_id'];  // user ID
    $text = $vk->data['object']['text'];        // incoming message

    if ($text == 'Start') // if the text is Start, it will send a Started message.
    {
        $vk->send($peer_id, 'Started');
    }
    elseif ($text == 'Hi') // if the text is Hi, it will send a Hello message.
    {
        $vk->send($peer_id, 'Hello');
    }
    else
    {
        $vk->send($peer_id, 'Error'); // error
    }
}
```
