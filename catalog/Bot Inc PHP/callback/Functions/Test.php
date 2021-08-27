<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 19.06.17
 * Time: 20:37
 */

class test
{
    public function go()
    {
        global $Vk, $data;
        $Vk->messages_send($data->object->user_id, "", "test");

        return true;
    }
}
