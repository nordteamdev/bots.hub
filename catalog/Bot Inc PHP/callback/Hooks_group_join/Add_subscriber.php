<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 20.06.17
 * Time: 14:52
 * Используется, чтобы быстро определить подписан ли человек на сообщество
 */

$Sql->add_subscriber($data->group_id, $data->object->user_id);