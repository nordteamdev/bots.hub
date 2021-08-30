<?php

    $script = [
        'title' => 'Лучшие игроки',
        'head' => [
            [
                'text' => "Игрок"
            ],
            [
                'text' => "Баланс",
                'align' => "right"
            ]
        ],
        'body' => [],
        'more' => 'Играть в бота',
        'more_url' => 'vk.me/hack_bots'
    ];
	$db =  new mysqli("localhost", "root", "riconc1020", "bot"); 
    $db->set_charset('utf8mb4');
    $type = "dollar";
    $info = $db->query("SELECT `id`, `id_VK`, `name`, `{$type}` FROM `users` WHERE `role` < 3 GROUP BY `id` ORDER BY {$type} DESC LIMIT 10");
    while($row = $info->fetch_assoc())
    {

        $row[$type] = strrev(floor($row[$type]));
        for($i = 3; $i < mb_strlen($row[$type]); $i += 4)
        {
            $row[$type] = substr_replace($row[$type], ".", $i, 0);
        }
        $name =  $row["name"] == "" ? "vk.com/id".$row["id_VK"] : htmlspecialchars_decode($row['name']);
        $row[$type] = strrev($row[$type]);
        array_push($script["body"], [
            [
                'icon_id' => 'id'.$row["id_VK"],
                'text' => $name,
                'url' => 'vk.com/id'.$row["id_VK"]
            ],
            [
                'text' => $row[$type].'$'
            ]
        ]);
    }
    

    $url = "https://api.vk.com/method/appWidgets.update";
    $post_data = array (
        "type" => "table",
        "code" => "return ".json_encode($script, JSON_UNESCAPED_UNICODE).";",
        "access_token" => "1459d1b0540c08592447c7e1261091a48ab6fce91cacff6459cc2580d1844fb35d850f4d2a878f8324e7d",
        "v" => "5.92"
    );
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    $response = curl_exec($ch);
    curl_close($ch);
    echo $response;
    
    //

    $db->close();

    
?>