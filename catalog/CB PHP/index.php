<?php
require_once('vk.php');

$vk = new VK();

if ($vk->data['type'] == 'message_new')
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
