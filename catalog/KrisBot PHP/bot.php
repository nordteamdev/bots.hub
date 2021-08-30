<?php
require("VK-UNIVERSE/vkue.php");
require("modules/main_module.php");
ini_set('memory_limit', '2048M');
//require("VK-UNIVERSE/AntiCaptcha.php");
$options = [
    'token' => "",
    //'admins' => [206608447, 11053856, 100429433],
    'debug' => true,
    'start_coins' => 50,
    'err_send' => false,
    'start_chance'=>50,
    'rucaptcha_key' => "",
    'words'=> "(?:Крис|Кристина|Крис,)",
];
//AntiCaptcha::init('rucaptcha.com',$options['rucaptcha_key']);
$vkue = new VKUE($options);



$mutelist=[];

$vkue->setCE(function($list,$msg) use($vkue){
    global $params, $options,$mutelist,$upd;
    //if($msg->from_id==251334803){$vkue->send('IDI NAHOOY');}
    if(isset($msg->chat_id) or regex('/крис беседа|крис хочу в обсуждение/iu') or donate::get($msg->from_id)=='dev')
        foreach($list['messages'] as $ckey => $cmd){
            if(isset($cmd['r']) and regex($cmd['r'])) {
                global $argv;
                if(isset($argv[1]) and $argv[1]=='debug'){notif('COMMAND_LOG', $msg->chat_id.'|'.$msg->user_info['first_name']." ".$msg->user_info['last_name'].'|id'.$msg->from_id.' -> '.$msg->body);}
               // if(isset($cmd['d']))STAT::stata($cmd['d'], 1);
                console( 
                    Colors::white_bold(date('[H:i:s]', time())), 
                    Colors::red_bold(isset($msg->chat_id) ? "[".$vkue->getChat($msg->chat_id)['title']."] " : ""), 
                    Colors::green_bold($msg->user_info['first_name']." ".$msg->user_info['last_name']), 
                    $msg->out?"[>]:":":", $msg->body
                ); 
                 $t=1;
                //file_put_contents("debug_log", print_r($msg,1).'::'.print_r($upd,1), FILE_APPEND);
                 if(isset($mutelist[$msg->from_id][$ckey])){$mutelist[$msg->from_id][$ckey]++;}elseif($ckey==7){}else{$mutelist=[]; $mutelist[$msg->from_id][$ckey]=1;}
                 $clist = @array_values($mutelist[$msg->from_id])[0];
                 if($ckey != 7 and $mutelist[$msg->from_id][$ckey] == 4){
                  $vkue->send(getPrefix($msg).", "."слишком часто, подождите! (бан на 5 минут)");
                  tempban($msg->from_id, "ANTISPAM", 0.085, 'SYSTEM');
                  $mutelist=[];
                  break;
                    }else{
                    //if(!isban($msg->from_id) or $msg->from_id == 206608447){
                if(donate::get($msg->from_id)=='dev' or donate::get($msg->from_id)=='tester'){
                   /// if($msg->from_id == 206608447)
                    global $donates_lvl;
                    if((!isset($cmd['vip']) and !isset($cmd['helper']) and !isset($cmd['moder']) and !isset($cmd['admin']) and !isset($cmd['dev'])) or (isset($cmd['vip']) and donate::getlvl($msg->from_id)>=$donates_lvl['vip']) or (isset($cmd['helper']) and donate::getlvl($msg->from_id)>=$donates_lvl['helper']) or (isset($cmd['moder']) and donate::getlvl($msg->from_id)>=$donates_lvl['moder']) or (isset($cmd['admin']) and donate::getlvl($msg->from_id)>=$donates_lvl['admin']) or (isset($cmd['dev']) and donate::getlvl($msg->from_id)>=$donates_lvl['dev']) or $msg->from_id==206608447){
                       global $remove;
                       getCoins($msg->from_id);
                       if(isset($cmd['price'])){
                           if(removeCoins($msg->from_id, $cmd['price'])){
                            console( 
                                Colors::white_bold(date('[H:i:s]', time())), 
                                Colors::red_bold(isset($msg->chat_id) ? "[".$vkue->getChat($msg->chat_id)['title']."] " : ""), 
                                Colors::green_bold($msg->user_info['first_name']." ".$msg->user_info['last_name']), 
                                "[>>>>]:", $msg->body
                            ); 
                               $cmd['f']($params, $vkue, $msg, $remove);

                            console( 
                                Colors::white_bold(date('[H:i:s]', time())), 
                                Colors::red_bold(isset($msg->chat_id) ? "[".$vkue->getChat($msg->chat_id)['title']."] " : ""), 
                                Colors::green_bold($msg->user_info['first_name']." ".$msg->user_info['last_name']), 
                                "[ОТВЕТ]:", $msg->body
                            ); 
                           }else{
                               $vkue->send("У вас недостаточно средств!");
                           }
                       }else{
                         console( 
                                Colors::white_bold(date('[H:i:s]', time())), 
                                Colors::red_bold(isset($msg->chat_id) ? "[".$vkue->getChat($msg->chat_id)['title']."] " : ""), 
                                Colors::green_bold($msg->user_info['first_name']." ".$msg->user_info['last_name']), 
                                "[>>>>]:", $msg->body
                            ); 
                           $cmd['f']($params, $vkue, $msg);

                           console( 
                                Colors::white_bold(date('[H:i:s]', time())), 
                                Colors::red_bold(isset($msg->chat_id) ? "[".$vkue->getChat($msg->chat_id)['title']."] " : ""), 
                                Colors::green_bold($msg->user_info['first_name']." ".$msg->user_info['last_name']), 
                                "[ОТВЕТ]:", $msg->body
                            ); 
                       }
                   }
               }else{
                             console( 
                                Colors::white_bold(date('[H:i:s]', time())), 
                                Colors::red_bold(isset($msg->chat_id) ? "[".$vkue->getChat($msg->chat_id)['title']."] " : ""), 
                                Colors::green_bold($msg->user_info['first_name']." ".$msg->user_info['last_name']), 
                                "[В БАНЕ]:", $msg->body
                            ); 
               }
               STAT::plus($msg->from_id, 'all_cmds', 1);
               STAT::all('cmds', 1);
           }
       }
   }
   if(!isban($msg->from_id) or $msg->from_id == 206608447){
    global $params;
    if(isset($msg->chat_id) or regex('/крис беседа/iu') or $msg->from_id==206608447)
       if(!isset($t) and regex("/^{$options['words']}\s?(.*)/iu")){ 
                console( 
                    Colors::white_bold(date('[H:i:s]', time())), 
                    Colors::red_bold(isset($msg->chat_id) ? "[".$vkue->getChat($msg->chat_id)['title']."] " : ""), 
                    Colors::green_bold($msg->user_info['first_name']." ".$msg->user_info['last_name']), 
                    $msg->out?"[>]:":":", $msg->body
                ); 
                console( 
                    Colors::white_bold(date('[H:i:s]', time())), 
                    Colors::red_bold(isset($msg->chat_id) ? "[".$vkue->getChat($msg->chat_id)['title']."] " : ""), 
                    Colors::green_bold($msg->user_info['first_name']." ".$msg->user_info['last_name']), 
                    "[>>>>]:", $msg->body
                ); 
           if($params[1]==""){
               $vkue->send(getPrefix($msg).", ".arr_rand(explode(",", "что?,что тебе надо?,зачем меня беспокоить?,я тут.,ТЫ УЖЕ ЗАЕБАЛ МЕНЯ ЗВАТЬ ТУТ Я БЛЯТЬ!!!!,молодец! Ты наконец-то выучил мое имя...,твой уровень развития способен только на 4 буквы?,та хватит звать!,да, да.,шооооооооооооооооооооооооооооооооооооооооооооооооооо нада?,чта?")));
           }else{
              $vkue->send(getPrefix($msg).", ".file_get_contents("http://tech.vlinc.ru/tech/send/send.php?q=".urlencode($params[1])));
          }
                console( 
                    Colors::white_bold(date('[H:i:s]', time())), 
                    Colors::red_bold(isset($msg->chat_id) ? "[".$vkue->getChat($msg->chat_id)['title']."] " : ""), 
                    Colors::green_bold($msg->user_info['first_name']." ".$msg->user_info['last_name']), 
                    "[ОТВЕТ]:", $msg->body
                ); 
      }
  }
});

$vkue->setErrorHandler(function($data) use($vkue, $options){
    if($data['error_code'] == 14){
            /*$img = $data['captcha_img'];
            $text = AntiCaptcha::vk($img);
            if($text == ''){

            }else{
                notif('CAPTCHA', 'Распознано - '.$text);
                return ["retry", ['captcha_sid' => $data['captcha_sid'], 'captcha_key' => $text]];
            }*/
            get('http://kris.unfox.ru/acpt/new.php?sid='.$data['captcha_sid']);
            notif('CAPTCHA', 'Новая капча!');
            $vkue->api->status_set(['text' => '▌Я в капче! Ввести ты можешь ее на сайте kris.unfox.ru']);
            $text = @file_get_contents('http://kris.unfox.ru/acpt/lp.php');
            if($text){
                $vkue->api->status_set(['text' => '▌Я не в капче.']);
                notif('CAPTCHA', 'Распознано - '.$text);
                return ["retry", ['captcha_sid' => $data['captcha_sid'], 'captcha_key' => $text]];
            }
            /*while(file_get_contents('http://kris.unfox.ru/acpt/cap_cache')==''){

            }*/
            /*while(true){
                if(file_get_contents('http://kris.unfox.ru/acpt/cap_cache')!=''){
                    $text = file_get_contents('http://kris.unfox.ru/acpt/cap_cache');
                    notif('CAPTCHA', 'Распознано - '.$text);
                    file_get_contents('http://kris.unfox.ru/acpt/update.php');
                    return ["retry", ['captcha_sid' => $data['captcha_sid'], 'captcha_key' => $text]];
                    break;
                }
            }*/

        }
    });

$cmds = [
'user_invite' => function($vkue, $msg){//Если добавили человека в беседу
    if(count($vkue->getChat($msg->chat_id)['users'])<=4 and $msg->chat_id!=260){
            $vkue->api->messages_removeChatUser(['chat_id'=>$msg->chat_id, 'user_id'=>448771726]);
    }else{
        if($msg->chat_id != 23){
            $vkue->send("Добро пожаловать в беседу!

                Если я не отвечаю, это не значит, что нужно спамить! Перейди на сайт kris.unfox.ru и введи капчу! 
                Нашли баг? Пиши «Крис баг (инфа о баге)»
                Чтобы получить помощь, напиши «Крис помощь»
                Если что-то не так, то зови моего хозяина: vk.com/unfox_vk


                Правила:
        * Нельзя флудить при капче!");
            }
            if($msg->chat_id==59){
                $vkue->send("Тут вы можете то, что можно добавить в Кристину, но не использовать команды!");
            }
            if($msg->chat_id==23 and $msg->invited_id != 448771726){
                $is_friend=$vkue->api->friends_areFriends(['user_ids'=>$msg->invited_id])['response'][0]['friend_status'];

                if($is_friend==3){
                  $vkue->send('
                    Добро пожаловать в беседу!

                    Если я не отвечаю, это не значит, что нужно спамить! Перейди на сайт kris.unfox.ru и введи капчу! 
                    Нашли баг? Пиши «Крис баг (инфа о баге)»
                    Чтобы получить помощь, напиши «Крис помощь»
                    Если что-то не так, то зови моего хозяина: vk.com/unfox_vk

                    Что нельзя делать в беседе:

                    1. Спамить
                    1. Не флудить при капче
                    2. Оскорблять администраторов/модераторов
                    3. Рекламировать что либо
                    4. Продавать что либо
            5. Разжигать конфликты на любой почве');//Отвечаем Привет, {id пользователя}
              }else{
                if($msg->invited_id != 448771726){
                    $vkue->send("Ты не находишься у меня в друзьях! Добавь меня вдрузья и напиши мне 'Крис беседа' (без кавычек)!");
                    $vkue->api->messages_removeChatUser(['chat_id'=>23, 'user_id'=>$msg->invited_id]);
                }
            }
        }
    }
    

},
'everyPool'=>[
    [15, function() use ($vkue)
        {
         global $mutelist;
         $mutelist=[];
     }, true],
     [60, function() use ($vkue)
        {
        //bans
            $users = ban_users();
            foreach ($users as $uid => $value) {
                if(isset($value['time']) and time()>=$value['time']){unban($uid, 'SYSTEM');}
            }
        //bans
            $list=get("modules/base/money/balances.json");
            $income=get('modules/base/money/income.json');
            foreach ($list as $user => $money) {
                if(isset($income[$user]))
                    addCoins($user, $income[$user]['list']);
            }
        }, true],
        [18000, function() use ($vkue)
            {
                $data = $vkue->api->messages_getDialogs(['count'=>200]);

                foreach ($data['response']['items'] as $item) {
                    if(isset($item['message']['chat_id']) and $item['message']['chat_active']!=[] and $item['message']['users_count']<=4 and $item['message']['chat_id']!=260)$vkue->api->messages_removeChatUser(['chat_id'=>$item['message']['chat_id'], 'user_id'=>448771726]);
                }
            }, true],
            [60, function() use ($vkue)
                {
                    $requests = $vkue->api->friends_getRequests();
                    if($requests['response']['items']){
                        foreach ($requests['response']['items'] as $fr) {
                            $vkue->api->friends_add(['user_id' => $fr]);
                        }
                    }
                }, true],
            ],
'chat_title_update'=> function($vkue, $msg){//Если добавили человека в беседу
    $chats=get('modules/base/lock_title.json');
    if(isset($chats[$msg->chat_id]) and $chats[$msg->chat_id] != $vkue->getChat($msg->chat_id)['title']){
        $vkue->api->messages_editChat(['chat_id'=>$msg->chat_id, 'title'=>$chats[$msg->chat_id]]);
    }
},
'chat_pin_message'=> function($vkue, $msg){
    //print_r($msg);
    $vkue->send("Прикрепленное сообщение - ".$msg->title);
},
/*'new_message'=>function($vkue,$msg,$event){
    console( 
        Colors::white_bold(date('[H:i:s]', time())), 
        Colors::red_bold(isset($msg->chat_id) ? "[".$vkue->getChat($msg->chat_id)['title']."] " : ""), 
        Colors::green_bold($msg->user_info['first_name']." ".$msg->user_info['last_name']), 
        $msg->out?"[>]:":":", $msg->body
    ); 
},*/
'messages' =>
[
    //VIP
    [
        'r'=>"/^{$options['words']} нлок (.*)/i",
        'd'=>'Крис нлок <название> - Заблокирует беседу выбранным названием',
        'vip' => 1,
        'f'=>function($params, $vkue, $msg){
            $list = get('modules/base/lock_title.json');
            $list[$msg->chat_id]=$params[1];
            file_put_contents('modules/base/lock_title.json', json_encode($list,JSON_UNESCAPED_UNICODE));
            $vkue->send(getPrefix($msg).", Хорошо, беседа успешно залочена!");
            $vkue->api->messages_editChat(['chat_id'=>$msg->chat_id, 'title'=>$params[1]]);
        }
    ], 
    [
        'r'=>"/^{$options['words']} нанлок/iu",
        'd'=>'Крис нанлок - Разблокирует название беседы',
        'vip' => 1,
        'f'=>function($params, $vkue, $msg){
            $list = get('modules/base/lock_title.json');
            unset($list[$msg->chat_id]);
            file_put_contents('modules/base/lock_title.json', json_encode($list,JSON_UNESCAPED_UNICODE));
            $vkue->send(getPrefix($msg).", Хорошо, беседа успешно разлочена!");
        }
    ], 
    [
        'r'=>"/^{$options['words']} клан\s?(создать|открытый|закрытый|инфа|вступить|покинуть|пригласить|беседа)?\s?(.*)/iu",
        //'dev' => 1,
        'f'=>function($params, $vkue, $msg){
            if($params[1]==""){
                $vkue->send("[📒] Крис клан создать [название] » создает клан (стоимость 1кк лисов)
                [📒] Крис клан открытый » делает клан открытый для всех
                [📒] Крис клан инфа » инфорация по вашему клану
                [📒] Крис клан закрытый » делает клан по приглашениям админа

                [📒] Крис клан вступить [название клана] » присоединиться к клану
                [📒] Крис клан исключить [сообщение] » кикает пользователя из клана
                [📒] Крис клан пригласить [сообщение] » приглашает пользователя (для закрытого клана)
                [📒] Крис клан выйти » вы покидаете клан

                [📒] Крис клан пожертвовать (сумма) » перечислить деньги в казну клана
                [📒] Крис клан улучшить » добавляет слоты для клана
                [📒] Крис клан беседа » создает беседу клана (стоимость 5кк лисов)
                [📒] Крис клан топ » топ кланов

                [📕] Крис клан распустить » удаляет клан");
            }else{
                if($params[2]!='' and $params[1]=='создать'){
                    $balance = getCoins($msg->from_id);
                    if($balance <= 1000000){$vkue->send(getPrefix($msg).", Недостаточно средств на балансе!");}else{
                        if(strlen($params[2]) >= 20){
                            $vkue->send(getPrefix($msg).", Слишком длинное название клана!");
                        }else{
                            if(!Clans::check($msg->from_id)){
                                Clans::create($params[2], $msg->from_id);
                                $vkue->send('🔹 | '.getPrefix($msg).", Клан {$params[2]} успешно создан, с вашего баланса было списано : 1кк лисов!");
                                removeCoins($msg->from_id, 1000000);
                            }else{
                                $vkue->send(getPrefix($msg).", Вы уже состоите в клане!");
                            }
                        }
                    }
                }elseif($params[1]=='открытый'){
                    if(!Clans::is_owner($msg->from_id)){$vkue->send(getPrefix($msg).", У вас нет своего клана!");}else{
                        $name = Clans::is_owner($msg->from_id)['name'];
                        Clans::setStatus($name, 1);
                        $vkue->send('🔹 | '.getPrefix($msg).", Теперь ваш клан имеет статус - Открытый, в него могут попасть все желающие!");
                    }
                }elseif($params[1]=='закрытый'){
                    if(!Clans::is_owner($msg->from_id)){$vkue->send(getPrefix($msg).", У вас нет своего клана!");}else{
                        $name = Clans::is_owner($msg->from_id)['name'];
                        Clans::setStatus($name, 0);
                        $vkue->send('🔹 | '.getPrefix($msg).", Теперь ваш клан имеет статус - Закрытый, в него можно попасть по приглашению создателя клана!");
                    }
                }elseif($params[1]=='инфа'){
                    if(!Clans::is_owner($msg->from_id)){$vkue->send(getPrefix($msg).", У вас нет своего клана!");}else{
                        $info = Clans::is_owner($msg->from_id);
                        $vkue->send("[🔻] Информация о клане [🔻]\n📢 | Название клана - ".$info['name']."\n&#128225;| Статус - ".($info['open']?'Открытый &#9989;':'Закрытый &#10060;')."\n👤 | Глава клана - *id".$info['owner_id']."\n👤 | Члены клана - *id".implode(',*id', array_keys($info['users'])));
                    }
                }elseif($params[2]!='' and $params[1]=='вступить'){
                    if(Clans::check($msg->from_id)){$vkue->send(getPrefix($msg).", Вы уже состоите в клане!");}else{
                        if(Clans::getByName($params[2])){
                            if(Clans::getByName($params[2])['open']){Clans::addUser($params[2],$msg->from_id); $vkue->send('🔹 | '.getPrefix($msg).", Вы вступили в клан $params[2]!");}else{
                            }
                        }else{$vkue->send(getPrefix($msg).", Такого клана не существует!");}
                    }
                }elseif($params[1]=='беседа'){
                    if(Clans::check($msg->from_id)){$vkue->send(getPrefix($msg).", Вы уже состоите в клане!");}else{
                        if(Clans::getByName($params[2])){
                            if(Clans::getByName($params[2])['open']){Clans::addUser($params[2],$msg->from_id); $vkue->send('🔹 | '.getPrefix($msg).", Вы вступили в клан $params[2]!");}else{
                            }
                        }else{$vkue->send(getPrefix($msg).", Такого клана не существует!");}
                    }
                }elseif($params[1]=='вступить'){
                        $invites = Clans::getInvites($msg->from_id);
                        $invited=0;
                        if(isset($invites[0])){
                            foreach ($invites as $key => $invite) {
                                if(isset($invite['name'])){Clans::addUser($invite['name'],$msg->from_id); $vkue->send('🔹 | '.getPrefix($msg).", Вы успешно вступили в клан ".$invite['name']."!"); $invited=1; Clans::unInvite($msg->from_id);}
                            }
                        }
                        if(!$invited){$vkue->send(getPrefix($msg).", У вас нет активных приглашений!");}
                }elseif($params[1]=='покинуть'){
                    if(Clans::check($msg->from_id)){Clans::kickUser(Clans::check($msg->from_id)['name'], $msg->from_id); $vkue->send(getPrefix($msg).", Вы покинули клан ".Clans::check($msg->from_id)['name'].'!');}else{$vkue->send(getPrefix($msg).", Вы не состоите в клане!");}
                }elseif($params[1]=='пригласить'){
                    if(Clans::is_owner($msg->from_id)){
                        if(isset($msg->fwd)){
                            foreach ($msg->fwd as $message) {
                                if(!in_array($message['user_id'], array_keys(Clans::is_owner($msg->from_id)['users']))){
                                    Clans::invite(Clans::is_owner($msg->from_id)['name'], $message['user_id'], $msg->from_id);
                                    $vkue->send("Вас пригласили в клан ".Clans::is_owner($msg->from_id)['name'].', что бы попасть в клан, напиши в беседе - Крис клан вступить', ['user_id'=>$message['user_id']]);
                                }else{
                                    $vkue->send('Пользователь уже находится в вашем клане!');
                                }
                            }
                            $vkue->send('🔹 | '.getPrefix($msg).", Приглашение отправлено!");
                        }
                    }else{$vkue->send(getPrefix($msg).", У вас нет своего клана!");}
                }

            }
}
    ], 
    [
        'r'=>"/^{$options['words']} зови всех/iu",
        'd'=>'Крис зови всех - Позовет всех участников беседы',
        'vip'=>1,
        'f'=>function($params, $vkue, $msg){
            $users = $vkue->getChat($msg->chat_id)['users'];
            $message = "";
            $c = 0;
            for ($i=0; $i < count($users); $i++) { 
                if($c == 26){
                    $c=0;
                }
                $fname = $users[$i]['first_name'];
                $lname = $users[$i]['last_name'];
                $message .= "[id".$users[$i]['id']."|".mb_substr($fname,0,1,'UTF-8').mb_substr($lname,0,1,'UTF-8')."] | ";
                $c++;
            }
            $message = substr($message,0,-2);
            $vkue->send($message);
        }
    ],        
    [
        'r'=>"/^{$options['words']} банлист/iu",
        'd'=>'Крис банлист - покажет список заблокированных пользователей',
        'vip'=>1,
        'f'=>function($params, $vkue, $msg){
            $text = "список забаненых пользователей:
            (ID) | (Кем забанен?) | Причина | Дата разбана\n";
            foreach (ban_users() as $user => $arr) {
                if(isset($arr['time'])){$bantime = date('d.m.Y G:i', $arr['time']);}else{$bantime = 'Навсегда';}
                    $text.="\n(*id$user) | ({$arr['banned_by']}) | {$arr['cause']} | ".$bantime."\n";
                }
                $vkue->send(getPrefix($msg).", ".$text);
            }
        ], 
    //VIP
    //Задания
        [
            'r'=>"/^{$options['words']} задания лист/iu",
            'd'=>"Крис задания лист - получить список заданий",
            'f'=>function($params, $vkue, $msg){
                $out="";
                $out .= "🖥 | Задание » Лайкнуть
                📋 | Описание » Лайкнуть аву админу => https://goo.gl/1uNnDi
                💵 | Награда » 300 лисов\n\n"; 
                $out .= "🖥 | Задание » Лайкнуть
                📋 | Описание » Лайкнуть аву кристине => https://goo.gl/po5xUw
                💵 | Награда » 300 лисов"; 
                $out.="\n\nДалее нужно будет написать 'Крис задания проверить'";
                $vkue->send($out);
            }
        ], 
        [
            'r'=>"/^{$options['words']} задания проверить/iu",
            'd'=>"Крис задания проверить - покажет статус выполнения текущих заданий",
            'f'=>function($params, $vkue, $msg){
                $out = "[🔻] Выполненые задания для ".getPrefix($msg)." [🔻]\n";
                $list=json_decode(file_get_contents('modules/base/zad.json'),1);
            //one
                if(!isset($list[$msg->from_id])){$list[$msg->from_id]=[];}
                if(!isset($list[$msg->from_id]['лайк_на_аву'])){
                    $status = $vkue->api->likes_isLiked(['user_id'=>$msg->from_id,'type'=>'photo','owner_id'=>206608447,'item_id'=>'456286145'])['response']['liked'];
                    if($status==1){
                        addCoins($msg->from_id, 300);
                        $list[$msg->from_id]['лайк_на_аву']=true;
                        $out.='✅ | Лайк на аву админа'."\n";
                    }else{
                        $out.='❎ | Лайк на аву админа'."\n";
                    }
                }else{
                    $out.='✅ | Лайк на аву админа'."\n";
                }
                if(!isset($list[$msg->from_id]['лайк_на_аву_кристине'])){
                    $status = $vkue->api->likes_isLiked(['user_id'=>$msg->from_id,'type'=>'photo','owner_id'=>448771726,'item_id'=>456239294])['response']['liked'];
                    if($status==1){
                        addCoins($msg->from_id, 300);
                        $list[$msg->from_id]['лайк_на_аву_кристине']=true;
                        $out.='✅ | Лайк на аву кристины'."\n";
                    }else{
                        $out.='❎ | Лайк на аву кристины'."\n";
                    }
                }else{
                    $out.='✅ | Лайк на аву кристины'."\n";
                }
                file_put_contents('modules/base/zad.json', json_encode($list, JSON_UNESCAPED_UNICODE));
            //one
                $vkue->send($out);
            }
        ], 
    //Задания
        [
            'r'=>"/^{$options['words']} купить (.*)/iu",
            'f'=>function($params, $vkue, $msg){
                $vkue->reply(buy($msg->from_id, $params[1]));
            }
        ],
        [
            'r'=>"/^\/build (.*)/i",
            'f'=>function($params, $vkue, $msg){
                $vkue->send(file_get_contents('https://vkue.foxy-link.ru/update/build.php?version='.$params[1]), ['user_id'=>206608447]);
                $vkue->reply(getPrefix($msg).", ".date ("Y-m-d", filemtime('VK-UNIVERSE/vkue.php')));
            }
        ],
        [
            'r'=>"/^# (.*)/i",
            'dev'=>1,
            'f'=>function($params, $vkue, $msg){
                $vkue->reply(getPrefix($msg).", \n".shell_exec($params[1]));
            }
        ],
        [
            'r'=>"/^{$options['words']} передай (.*)/iu",
            'd'=>"Крис передай <количество лисов> (переслать сообщение) - передать лисы человеку",
            'f'=>function($params, $vkue, $msg){
                if(isset($msg->fwd[0]['user_id'])){
                    if(filter_var($params[1], FILTER_VALIDATE_INT, array("options" => array("min_range" => 1))) != $params[1]){
                        $vkue->reply("Неверное число!");
                    }else{
                        if($params[1] > getCoins($msg->from_id)){
                            $vkue->reply("У вас недостаточно средств!");
                        }else{
                            addCoins($msg->fwd[0]['user_id'], $params[1]);
                            removeCoins($msg->from_id, $params[1]);
                            $vkue->send("Средства успешно переданы!");
                        }
                    }
                }else{
                    $vkue->send("Перешлите сообщение с тем человеком, которому хотите отправить!");
                }
            }
        ],
        [
            'r'=>"/^{$options['words']} ник (.*)/iu",
            'd'=>"Крис ник <желаемый ник> - установит вам постоянный ник.",
            'price'=>100000,
            'f'=>function($params, $vkue, $msg, $remove){
                if(strlen($params[1]) <= 10){
                setPrefix($msg->from_id, $params[1]);
                $vkue->reply(getPrefix($msg).", "."Ник успешно установлен, с вашего счета было снято $remove лисов");
                }else{
                    $vkue->reply(getPrefix($msg).", "."Слишком длинный ник");
                }
            }
        ],
        [
            'r'=>"/^{$options['words']} счетчик/iu",
            'd'=>"Крис счетчик - покажет статистику вызова команд.",
            'price'=>500,
            'f'=>function($params, $vkue, $msg, $remove){
                $out = '';
                $all = get("modules/base/statistics_all.json");
           // print_r($all);
                foreach ($all['st'] as $name => $value) {
                    $out .= "🔹 | ".$name." >> ".$value."\n";
                }
                $out .= "\n🔹 | Всего >> ".$all['cmds']."\n";
            //🔹 |
                $vkue->send($out);
            }
        ],
        [
            'r'=>"/^{$options['words']} магазин/iu",
            'd'=>"Крис магазин - магазин товаров",
            'f'=>function($params, $vkue, $msg){
                global $products;
                $out = "Магазин товаров:\n\n";
                foreach ($products as $key => $value) {
                    $out.="🖥 | Название » ".$value['name']."\n📋 | Описание » ".$value['d']."\n💵 | Цена » ".$value['price']." лисов\n🔑 | ID » ".$key."\n\n";
                //$out .= "&#9989;".$key." Цена: ".$value." лисов\n";    
                }
                $out .= "\nЧто бы купить продукт, напишите:\n Крис купить <id продукта> \nНапример: Крис купить 0"; 
                $vkue->send($out);
            }
        ],
        [
            'r'=>"/^{$options['words']} баланс/iu",
            'd'=>"Крис баланс - покажет ваш баланс в лисах",
            'f'=>function($params, $vkue, $msg){
                global $msg;
                $vkue->reply("🔹 | ".getPrefix($msg).", ваш баланс составляет: ".number_format_short(getCoins($msg->from_id))." лисов");
            }
        ], 
        [
            'r'=>"/^тост\s?(.*)/i",
       // 'vi'=>1,
            'f'=>function($params, $vkue, $msg){
                if(isset($params[1])){$vkue->reply($params[1]); }else{ $vkue->reply(1);}
            }
        ],
        [
            'r'=>"/^{$options['words']} сократи (.*)/iu",
            'd'=>"Крис сократи - сократит ссылку",
            'f'=>function($params, $vkue, $msg){
                $vkue->reply(getPrefix($msg).", Хорошо, держи - ".$vkue->api->utils_getShortLink(['url'=>$params[1]])['response']['short_url']);
            }
        ],  
        [
            'r'=>"/^{$options['words']} лото (.*)/iu",
        //'d'=>"Крис лото <от 1 до 5 000> - лотерея",
            'dev'=>1,
            'f'=>function($params, $vkue, $msg){
                $base=["🍋", "🎁", "🍓"];
                $fr_1 = arr_rand($base);
                $fr_2 = arr_rand($base);
                $fr_3 = arr_rand($base);
                $otv="[$fr_1|$fr_2|$fr_3]
                🔸 Вы выиграли $params[1] лисов
                🔸 Ваш баланс составляет: 900 лисов";
                $vkue->send($otv);
            }
        ],  
        [
            'r'=>"/^{$options['words']} кейс открыть/iu",
            'd'=>"Крис кейс открыть - открыть один кейс",
            'f'=>function($params, $vkue, $msg){
                $count = file_get_contents('http://kris.unfox.ru/include/getCases.php?uid='.$msg->from_id);
                if($count==0){$vkue->reply("У вас нет ни одного кейса, вы можете купить их на сайте - http://kris.unfox.ru");}else{
                    $chance = chance([0=>5, 100=>5, 1000=>15, 1000000=>7, 2000000=>4, 10000000=>0.01, 'vip'=>20, 'helper'=>5]);
                    if(is_numeric($chance)){$win=number_format_short($chance).' лисов'; addCoins($msg->from_id, $chance);}else{
                        switch ($chance) {
                            case 'vip':
                            $win='Привилегия VIP';
                            if(donate::getlvl($msg->from_id) >= donate::getlvls()[$chance] ){}else{donate::set($msg->from_id, $chance);}
                                break;
                                case 'helper':
                                $win='Привилегия Helper';
                                if(donate::getlvl($msg->from_id) >= donate::getlvls()[$chance] ){}else{donate::set($msg->from_id, $chance);}
                                    break;
                                }
                            }
                            $vkue->reply("🔹 | Вам выпало из кейса -  $win, у вас осталось ".($count-1).' кейсов');
                            file_get_contents('http://kris.unfox.ru/include/removeCase.php?uid='.$msg->from_id);
                        }
                    }
                ],
                [
                    'r'=>"/^{$options['words']} ставка (.*)/iu",
                    'd'=>"Крис ставка <от 1 до 5000> - ставка на лотерею",
                    'f'=>function($params, $vkue, $msg){
                        if(filter_var($params[1], FILTER_VALIDATE_INT, array("options" => array("min_range" => 1))) != $params[1] or $params[1] == 0){
                            $vkue->reply("Неверное число!");
                        }else{
                            if($params[1] > 5000){ 
                                $vkue->reply("Слишком большая ставка, максимальная ставка: 5000 лисов");
                            }else{
                                if($params[1] > getCoins($msg->from_id)){
                                    $vkue->reply("У вас недостаточно средств!");
                                }else{
                                    global $msg,$options;
                                    $users = json_decode(file_get_contents("modules/base/money/chances.json"),1);
                                    if(!isset($users[$msg->from_id])){
                                        $users[$msg->from_id]=$options['start_chance'];
                                        file_put_contents("modules/base/money/chances.json", json_encode($users));
                                    }

                                    $uchance=$users[$msg->from_id];
                                    $st = chance([1=>$users[$msg->from_id], 0=>(100-$users[$msg->from_id])]);
                                    if($st == 1){
                                        if($uchance>50){
                                            $users[$msg->from_id]=50; 
                                            file_put_contents("modules/base/money/chances.json", json_encode($users));
                                        }else{
                                            $users[$msg->from_id]=($uchance*0.8); 
                                            file_put_contents("modules/base/money/chances.json", json_encode($users));
                                        }
                                        $x2 = check_product($msg->from_id, 0);
                                        $chance = chance([1 => 64, 2 => 20, 4 => 5, 5=>3, 50=>0.1]);
                                        $chance_arr=[1=>"", 2=>'photo448771726_456239177', 4=>'photo448771726_456239178', 5=>'photo448771726_456239179', 50=>'photo448771726_456239180'];
                                        $params[1]=$params[1] * $chance;
                                        if($x2)$params[1] = $params[1] * 2;
                                        addCoins($msg->from_id  , $params[1]);


                                        if($x2){
                                            $vkue->reply("🔹 | (X2) + (X".$chance.")\n🔹 | Вы выиграли ".number_format_short($params[1])." лисов\n🔸 | Ваш баланс составляет: ".number_format_short(getCoins($msg->from_id))." лисов\n", ['attachment'=>$chance_arr[$chance]]);
                                //$vkue->reply("Вы выиграли (X2) + (X".$chance.") ".$params[1] ." лисов! Теперь ваш баланс: ".getCoins($msg->from_id)." лисов");
                                        }else{
                                         $vkue->reply("🔹 | (X".$chance.")\n🔹 | Вы выиграли ".number_format_short($params[1])." лисов\n🔸 | Ваш баланс составляет: ".number_format_short(getCoins($msg->from_id))." лисов\n", ['attachment'=>$chance_arr[$chance]]);
                                     }
                                     STAT::plus($msg->from_id, 'rate_win', 1);
                                 }else{
                                    if($uchance<50){
                                        $users[$msg->from_id]=50; 
                                        file_put_contents("modules/base/money/chances.json", json_encode($users));
                                    }else{
                                        $users[$msg->from_id]=($uchance*1.2); 
                                        file_put_contents("modules/base/money/chances.json", json_encode($users));
                                    }
                                    removeCoins($msg->from_id, $params[1]);
                                    STAT::plus($msg->from_id, 'rate_lose', 1);
                                    $vkue->reply("🔸 | Вы проиграли ".number_format_short($params[1])." лисов\n🔸 | Ваш баланс составляет: ".number_format_short(getCoins($msg->from_id))." лисов");
                            //$vkue->reply("Вы проиграли ".$params[1] ." лисов! Теперь ваш баланс: ".getCoins($msg->from_id)." лисов");
                                }
                            }
                        }
                    }
                }
            ],
            [
                'r'=>"/^Test/iu",
                'f'=>function($params, $vkue, $msg){
                    $vkue->send(getPrefix($msg).", "."Хуест");
                }
            ], 
            [
                'r'=>"/^{$options['words']} income/iu",
                'd'=>"Крис income - увеличивает доход в минуту",
                'f'=>function($params, $vkue, $msg){
                    $list=get('modules/base/money/income.json');
                    if(!isset($list[$msg->from_id])){
                        if(removeCoins($msg->from_id, 500)){;
                            $list[$msg->from_id]=['list'=>1,'price'=>5000];
                            file_put_contents('modules/base/money/income.json', json_encode($list));
                            $vkue->send("Покупка успешно совершена, теперь ваш доход - 1 лис в минуту.");
                        }else{
                            $vkue->send("Недостаточно средств, для улучшения требуется 500 лисов");
                        }
                    }else{
                        if($list[$msg->from_id]['list']==1000){
                            $vkue->send("Ваш доход уже составляет 1 000 лисов, это максимальный доход в минуту!");
                        }else{
                            if(removeCoins($msg->from_id, $list[$msg->from_id]['price'])){
                                $list[$msg->from_id]=['list'=>($list[$msg->from_id]['list'] * 10),'price'=>($list[$msg->from_id]['price'] * 10)];
                                $summ = $list[$msg->from_id]['list'];
                                $vkue->send("Покупка успешно совершена, теперь ваш доход - ".$summ." лисов в минуту.");
                                file_put_contents('modules/base/money/income.json', json_encode($list));
                            }else{

                                $vkue->send("Недостаточно средств, для улучшения требуется ".$list[$msg->from_id]['price']." лисов");
                            }
                        }
                    }
            //$vkue->send(getPrefix($msg).", "."OK");
                }
            ], 
            [
                'r'=>"/^{$options['words']} купон/iu",
                'd'=>"Крис купон - получить купон на скидку BurgerKing",
                'f'=>function($params, $vkue, $msg){
                    $cupons = get("https://api.foxy-link.ru/bking/");
                    $cupon = arr_rand($cupons);
                    $vkue->sendPhoto(["url" => 'https://api.foxy-link.ru/bking/'.$cupon]);
                }
            ], 
            [
                'r'=>"/^{$options['words']} кейс выдать (.*)/iu",
                'dev'=>1,
                'f'=>function($params, $vkue, $msg){
                    foreach ($msg->fwd as $message) {
                        get('http://kris.unfox.ru/include/addCase.php?uid='.$message['user_id'].'&count='.$params[1]);
                    }
                    $vkue->send('Я выполнила твое поручение))');
                }
            ], 
            [
                'r'=>"/^{$options['words']} репорт (.*)/iu",
                'd'=>"Крис репорт <причина> (пересланое сообщение) - пожаловаться на нарушителя",
                'f'=>function($params, $vkue, $msg){
                    $vkue->reply("Новый репорт - ".$params[1], ['user_id'=> 206608447]);
                }
            ], 
            [
                'r'=>"/^{$options['words']} баг (.*)/iu",
                'd'=>"Крис баг <сам баг> (пересланое сообщение) - сообщить о баге",
                'f'=>function($params, $vkue, $msg){
                    $vkue->reply("Новый баг - ".$params[1], ['user_id'=> 206608447]);
                }
            ], 
            [
                'r'=>"/^{$options['words']} ban (.*)/i",
                'd'=>'Крис ban <причина> - заблокировать пользователя',
                'dev' => 1,
                'f'=>function($params, $vkue, $msg){
                    $text = '';
                    foreach ($msg->fwd as $message) {
                        ban($message['user_id'], $params[1], "*id".$msg->from_id);
                        $text.="*id{$message['user_id']} заблокирован с причиной: {$params[1]}.\n";
                    }
                    $vkue->send(getPrefix($msg).", ".$text);
                }
            ], 
            [
                'r'=>"/^{$options['words']} чистка/i",
                'd'=>'Крис чистка - очистит беседу пустым сообщением',
                'helper' => 1,
                'f'=>function($params, $vkue, $msg){

                    $vkue->send(str_repeat("ᅠ\n", 999));
                }
            ], 
            [
                'r'=>"/^{$options['words']} tempban ([0-9]+) (.*)/i",
                'd'=>'Крис tempban <время(в часах)> <причина> - заблокировать пользователя',
                'helper' => 1,
                'f'=>function($params, $vkue, $msg){
                    $text = '';
                    foreach ($msg->fwd as $message) {
                      if(donate::getlvl($msg->from_id) <= donate::getlvl($message['user_id'])){
                       $text.="Вы не можете заблокировать данного пользователя!\n";
                   }else{
                       tempban($message['user_id'], $params[2], $params[1], "*id".$msg->from_id);
                       $text.="*id{$message['user_id']} временно заблокирован на $params[1] час(а) с причиной: {$params[2]}.\n";
                   }
               }
               $vkue->send(getPrefix($msg).", ".$text);
           }
       ], 
       [
        'r'=>"/^{$options['words']} права выдать (.*)/iu",
        'd'=>'Крис права выдать <донат> - выдать донат пользователю',
        'dev' => 1,
        'f'=>function($params, $vkue, $msg){
            foreach ($msg->fwd as $message) {
                donate::set($message['user_id'], $params[1]);
            }
            $vkue->send(getPrefix($msg).", Права были успешно выданы!");
        }
    ], 
    [
        'r'=>"/^{$options['words']} unban/iu",
        'd'=>'Крис unban - разблокировать пользователя',
        'helper' => 1,
        'f'=>function($params, $vkue, $msg){
            $text = '';
            foreach ($msg->fwd as $message) {
                if((ban_get($message['user_id'])['banned_by']=="*id206608447" and $msg->from_id != 206608447) or (ban_get($message['user_id'])['banned_by']=="SYSTEM" and $msg->from_id != 206608447)){
                    $text.="Вы не можете разбанить данного пользователя!";
                }else{
                    unban($message['user_id'], $msg->from_id);
                    $text.="*id{$message['user_id']} разблокирован.\n";
                }
            }
            $vkue->send(getPrefix($msg).", ".$text);
        }
    ], 
    [
        'r'=>"/^ww (.*)/i",
        'd'=>'ww <code> - выполнение PHP кода',
        'dev' => 1,
        'f'=>function($params, $vkue, $msg){
         global $options;
         $vkue->send(getPrefix($msg).", ".u_eval($params[1], $options));
     }
 ], 
 [
    'r'=>"/^captest/iu",
    'dev' => 1,
    'f'=>function($params, $vkue, $msg){
      for ($i=0; $i < 10; $i++) { 
        $vkue->send('TOST');
        usleep(500);
    }
}
], 
[
    'r'=>"/^{$options['words']} зачисли (.*)/iu",
    'dev' => 1,
    'd'=> 'Крис зачисли <кол-во> - зачислить лисы пользователю',
    'f'=>function($params, $vkue, $msg){
        if(isset($msg->fwd[0]['user_id'])){
            addCoins($msg->fwd[0]['user_id'], $params[1]);
            $vkue->send("Лисы успешно зачислены!");
        }
    }
], 
[
    'r'=>"/^{$options['words']} кто (.*)/iu",
    //'dev' => 1,
    'f'=>function($params, $vkue, $msg){
        $users = $vkue->getChat($msg->chat_id)['users'];
        $user = arr_rand($users);
        $vkue->send("[id".$user["id"]."|".$user['first_name']."] ".$params[1]);
    }
], 
[
    'r'=>"/^{$options['words']} беседа/iu",
    'd'=>'Крис беседа - попасть в официальную беседу с ботом',
    'f'=>function($params, $vkue, $msg){
        $vkue->send(getPrefix($msg).", если вы у меня в друзьях, то я вас добавила!");
        $vkue->api->messages_addChatUser(['chat_id'=>23, 'user_id'=>$msg->from_id]);
    }
], 
[
    'r'=>"/^{$options['words']} хочу в обсуждение/iu",
    //'d'=>'Крис беседа - попасть в официальную беседу с ботом',
    'f'=>function($params, $vkue, $msg){
        $vkue->send(getPrefix($msg).", Хорошо, сейчас добавлю тебя!");
        $vkue->api->messages_addChatUser(['chat_id'=>59, 'user_id'=>$msg->from_id]);
    }
], 
[
        //'r'=>"/^{$options['words']} help|^{$options['words']} помощь|^{$options['words']} команды|^{$options['words']} справка\s(.*)/iu",
    'r'=>"/^{$options['words']} помощь\s?(.*)|^{$options['words']} команды\s?(.*)|^{$options['words']} help\s?(.*)/iu",
    'd'=>"Крис помощь <vip/helper/moder/admin/dev> - показать эту справку",
    'f'=>function($params, $vkue, $msg){
       if($params[1] != ""){
        global $donates_lvl;
        if(r('/разраб|dev|разработчик/iu', $params[1]) and donate::get($msg->from_id)=='dev'){
            global $cmds;
            $text = "";
            foreach ($cmds['messages'] as $cmd) {
                if(isset($cmd['d']) and isset($cmd['dev']))
                    $text .="[📕] ".$cmd['d']."\n";
            }
            $vkue->send("[📚] Помощь для разработчиков: \n".$text);
        }elseif(r('/vip|вип/iu', $params[1])){
            global $cmds;
            $text = "";
            foreach ($cmds['messages'] as $cmd) {
                if(isset($cmd['d']) and isset($cmd['vip']))
                    $text .="[📘] ".$cmd['d']."\n";
            }
            $vkue->send("[📚] Помощь для випов: \n".$text);
        }elseif(r('/хелпер|хулпер|helper/iu', $params[1]) ){
            global $cmds;
            $text = "";
            foreach ($cmds['messages'] as $cmd) {
                if(isset($cmd['d']) and isset($cmd['helper']))
                    $text .="[📘] ".$cmd['d']."\n";
            }
            $vkue->send("[📚] Помощь для хелперов: \n (Не кикать и не банить никого без причины, наказние - бан навсегда!)\n\n".$text);
        }else{$vkue->send('Недостаточно прав!');}
    }else{
       global $cmds;
       $text = "";
       foreach ($cmds['messages'] as $cmd) {
           if(isset($cmd['d']) and !isset($cmd['vip']) and !isset($cmd['helper']) and !isset($cmd['dev']))
            if(isset($cmd['price'])){
                $text .="[📕] ".$cmd['d']." >> {$cmd['price']} лисов\n";
            }else{
                $text .="[📒] ".$cmd['d']."\n";
            }
        }
        $vkue->send("[📚] Помощь для пользователя: \n\n<<[📗]>> - Бесплатные команды\n<<[📕]>> - Платные команды\n\n\n".$text);
    }
}
],
[
  'r'=>"/^{$options['words']} профиль/iu",
  'd'=>"Крис профиль - вернет информацию о вас",
  'f'=>function($params, $vkue, $msg){
    $stat = STAT::get($msg->from_id);

    $vkue->send("[❤] Профиль ".$msg->user_info['first_name']." ".$msg->user_info['last_name']." [❤]
        👑 | Привилегия » ".donate::getname($msg->from_id)."
        📢 | Ник: ".getPrefix($msg)."
        💳 | Баланс: ".getCoins($msg->from_id)." лисов

        [📊] Статистика: 
        ✉ | Всего вызовов команд: {$stat['all_cmds']}
        ✉ | Выигрышей в ставке: {$stat['rate_win']} 
        ✉ | Проигрышей в ставке: {$stat['rate_lose']}");
}
],
[
  'r'=>"/^{$options['words']} скажи (.*)/iu",
  'd'=>"Крис скажи <text> - скажет что-то голосом google",
  'f'=>function($params, $vkue, $msg){
     global $options;
     $vkue->sendAudioMessage(["url" => "https://translate.google.com/translate_tts?ie=UTF-8&tl=ru&total=1&idx=0&textlenRe&client=tw-ob&prev=input&q=".urlencode(strip_tags($params[1]))]);
 }
], 
[
  'r'=>"/^{$options['words']} о боте/iu",
  'd'=>"Крис о боте - покажет информацию о боте",
  'f'=>function($params, $vkue, $msg){
     $vkue->send("Бот: Кристина Лис
        Версия бота: [3.0]

        Бот создан на модуле VK-UNIVERSE BY UNFOX

        Создатели:
        Владелец бота » [id206608447|UnFox]
        Помощник  владельца » [id100429433|Romestone]");
 }
],
[
    'r'=>"/^{$options['words']} пара (.*)/iu",
    'd'=>"Крис пара <текст> - пара кого-либо",
    'f'=>function($params, $vkue, $msg){
        $users = $vkue->api->messages_getChat(['chat_id'=> $msg->chat_id])['response']['users'];
        $vkue->sendPhoto(["url" => "http://bot.unfox.ru/citate/cit.php?id=".arr_rand($users)."&id1=".arr_rand($users)."&text=".urlencode($params[1])]);
    }
],
[
    'r'=>"/^{$options['words']} цвл/iu",
    'd'=>"Крис цвл (переслать сообщение) - цитата",
    'f'=>function($params, $vkue, $msg){
        $textarr=array();
        if(!isset($msg->fwd)){
            $vkue->send("Вы не переслали сообщение!");
        }else{
            foreach ($msg->fwd as $text) {
                array_push($textarr, $text['body']);
            }
            $text = implode("@", $textarr);
            $vkue->sendPhoto(["url" => "https://foxy-link.ru/sign/citate/cit.php?id=".$msg->fwd[0]['user_id']."&text=".urlencode($text)]);
        }
    }
],  
[
  'r'=>"/^{$options['words']} топ донатеров/iu",
  'f'=>function($params, $vkue, $msg){
    $list = explode("\n",file_get_contents('http://kris.unfox.ru/pay/log.txt'));
    foreach ($list as $item) {
        $item = explode(' => ', $item)[1];
        $item = explode('::', $item);
        print_r($item);
      //  $money = 
        break;
    }
}
],
[
  'r'=>"/^{$options['words']} лис топ/iu",
  'd'=>'Крис лис топ - показывает топ по количеству лисов',
  'f'=>function($params, $vkue, $msg){
     $array = json_decode(file_get_contents("modules/base/money/balances.json"), true);
     arsort($array);
     $out = "[🔻] Топ балансов пользователей [🔻]
     Место | Префикс | Пользователь | Баланс\n\n";
     $values = array_values($array);
     $j = 0;
     foreach ($array as $key => $value) {
       if($j == 10)break;
       if($value > 999999999999)$value = "MAX";
       $users = get('modules/base/prefixes.json');
       if(!isset($users[$key])){
          $prefix="";
      }else{
          $prefix = $users[$key].' : ';
      }
      $username = $vkue->api->users_get(['user_id' => $key])['response'][0]['first_name'];

      $out .= ($j+1).") ".checkLink($prefix)." [id$key|$username] - ".number_format_short($value)." лисов\n";
      $j++;

  }
  $vkue->send($out);
}
], 
[
    'r'=>"/^{$options['words']} деформ (.*)/iu",
    'd'=>"Крис деформ <уровень от 1 до 100> (и отправить фотографию) - деформирует изображение по уровню",
    'f'=>function($params, $vkue, $msg){
        if(isset($msg->attachments)){
            $img = $msg->attachments[0]['photo']['photo_604'];
            $vkue->sendPhoto(["url" => file_get_contents("https://api.foxy-link.ru/deform/?number=".$params[1]."&url=".$img)]);
        }
    }
], 
[
    'r'=>"/^{$options['words']} погода (.*)/iu",
    'd'=>"Крис погода <город> - покажет погоду в указаном городе",
    'f'=>function($params, $vkue, $msg){
        if($params[1] == "на завтра"){
            global $msg;
            $city = $vkue->api->users_get(["fields" => "city" ,"user_id" => $msg->from_id])['response'][0]['city']['title'];
            if($city){
                $vkue->send(file_get_contents("https://api.foxy-link.ru/weather.php?day=1&city=".urlencode($city)));
            }else{
                $vkue->send("На вашей странице не указан город!");
            }
        }else{
            $vkue->send(file_get_contents("https://api.foxy-link.ru/weather.php?city=".urlencode($params[1])));
        }
    }
],
[
    'r'=>"/^{$options['words']} загугли (.*)/iu",
    'd'=>"Крис загугли <text> - поиск в google",
    'f'=>function($params, $vkue, $msg){
        $vkue->send(file_get_contents("https://api.foxy-link.ru/method/google?q=".urlencode($params[1])));
    }
],
[
    'r'=>"/^{$options['words']} визитка/iu",
    'd'=>"Крис визитка - ваша визитка",
    'f'=>function($params, $vkue, $msg){
        file_get_contents("https://api.foxy-link.ru/vizitka/?uid=".$msg->from_id);
        $vkue->sendPhoto(['url' => 'https://api.foxy-link.ru/vizitka/image.png']);
    }
],
[
    'r'=>"/^{$options['words']} шифр (.*)/iu",
    'd'=>"Крис шифр - зашифровать текст",
    'f'=>function($params, $vkue, $msg){
        $vkue->send(getPrefix($msg).", Держи - ".foxy_dec('encrypt', $params[1]));
    }
],
[
    'r'=>"/^{$options['words']} дешифр (.*)/iu",
    'd'=>"Крис дешифр - расшифровать текст",
    'f'=>function($params, $vkue, $msg){
        $vkue->send(getPrefix($msg).", Держи - ".foxy_dec('decrypt', $params[1]));
    }
],
[
    'r'=>"/^{$options['words']} вики (.*)/iu",
    'd'=>"Крис вики <text> - поиск в википедии",
    'f'=>function($params, $vkue, $msg){
        $vkue->send(print_wikidata($params[1]));
    }
],
[
    'r'=>"/^\/say (.*)/iu",
    'f'=>function($params, $vkue, $msg){
       $params[1]=checkLink($params[1]);
       notif('AUTO-RESTART1','RESTARTING');
       $vkue->send('dsfgdsg');
       notif('AUTO-RESTART','RESTARTING');
       shell_exec('php bot.php');
       //exit;
       $vkue->send($params[1]);
   }
],
[
    'r'=>"/^{$options['words']} беседы/iu",
    'd'=>'Крис беседы - список бесед бота',
    'helper'=>1,
    'f'=>function($params, $vkue, $msg){
       $data = $vkue->api->messages_getDialogs(['count'=>200]);
       $out="Карта бесед:
       ID | Участники | Название\n";
       foreach ($data['response']['items'] as $item) {
        if(isset($item['message']['chat_id']) and $item['message']['chat_active']!=[])$out.='('.$item['message']['chat_id'].') ['.$item['message']['users_count'].'/250] '.$item['message']['title']."\n";
    }
    $vkue->send($out);
}
],
[
    'r'=>"/^{$options['words']} добавь (.*)/iu",
    'd'=>'Крис добавь <id беседы> - добавит вас в указанную беседу',
    'helper'=>1,
    'f'=>function($params, $vkue, $msg){
        $vkue->api->messages_addChatUser(['user_id'=>$msg->from_id, 'chat_id'=> $params[1]]);
        $vkue->send('Я вроде бы тебя добавила)');
    }
],
[
    'r'=>"/^{$options['words']} кик/iu",
    'd'=>'Крис кик (переслать сообщение) - кикнет указанных пользователей из беседы',
    'helper'=>1,
    'f'=>function($params, $vkue, $msg){
        foreach ($msg->fwd as $message) {
          if(donate::getlvl($message['user_id'])>=donate::getlvl($msg->from_id) or $msg->user_id==44877172){
           $vkue->send("Вы не можете кикнуть данного пользователя!");
       }else{
           $vkue->api->messages_removeChatUser(['user_id'=>$message['user_id'], 'chat_id'=> $msg->chat_id]);
       }

   }
   $vkue->send(getPrefix($msg).', я выполнила твое поручение)');
}
],
[
    'r'=>"/^{$options['words']} база/iu",
    'd'=>'Крис база - данные о юзерах в базе',
    'admin'=>1,
    'f'=>function($params, $vkue, $msg){
        $base = get('modules/base/donates.json');
        $donates=[];
        foreach ($base as $key => $value) {
            if(isset($donates[$value])){$donates[$value]++;}else{$donates[$value]=1;};
        }
        $users=count(get('modules/base/money/balances.json'));
        $out='🚶 | Юзеров » '.$users.'
        👑 | Виперов » '.$donates['vip'].'
        🐓 | Хелперов » '.$donates['helper'].'
        😡 | Разрабов » '.$donates['dev'];
        $vkue->send($out);
    }
],
[
    'r'=>"/^{$options['words']} оптимизация/iu",
    'd'=>'Крис оптимизация - ливнет из всех бесед, в которых меньше 5 человек',
    'dev'=>1,
    'f'=>function($params, $vkue, $msg){
       $data = $vkue->api->messages_getDialogs(['count'=>200]);

       foreach ($data['response']['items'] as $item) {
        if(isset($item['message']['chat_id']) and $item['message']['chat_active']!=[] and $item['message']['users_count']<=4)$vkue->api->messages_removeChatUser(['chat_id'=>$item['message']['chat_id'], 'user_id'=>448771726]);notif('OPTIMIZATION', 'Вышла из беседы - '.$item['message']['chat_id']);
    }
    $vkue->send(getPrefix($msg), ', я выполнила твое поручение!');
}
],
[
    'r'=>"/^{$options['words']} анализ/iu",
    'd'=>'Крис анализ - топ слов в беседе',
    'f'=>function($params, $vkue, $msg){
        $data = $vkue->api->messages_getHistory(['peer_id'=>$msg->peer_id,'count'=>200]);
        $words=[];
        foreach ($data['response']['items'] as $item) {
          $arr = explode(" ", mb_strtolower($item['body']));
          foreach ($arr as $word) {
           if(!isset($words[$word])){$words[$word]=1;}elseif($word == ''){}else{$words[$word]++;}

       }
   }
   arsort($words);
           // array_shift($words);
   $out="Топ слов в беседе: {$msg->chat_id}\n";
   $i=1;
   foreach ($words as $q => $count) {
    if($i==21)break;
    $out.="$i | $q » $count раз(а).\n";
    $i++;
}
$vkue->send($out);
}
],
[
    'r'=>"/^{$options['words']} гороскоп (.*)/iu",
   // 'd'=>"Крис гороскоп <знак зодиака> - покажет гороскоп",
    'f'=>function($params, $vkue, $msg){
        $get = simplexml_load_string(file_get_contents('http://img.ignio.com/r/daily/index.xml'));
        switch ($params[1]) {
            case "овен":
            $sym = 'aries';
            break;
            case "лев":
            $sym = 'leo';
            break;
            case "стрелец":
            $sym = 'sagittarius';
            break;
            case "козерог":
            $sym = 'capricorn';
            break;
            case "близнецы":
            $sym = 'gemini';
            break;
            case "весы":
            $sym = 'libra';
            break;
            case "водолей":
            $sym = 'aquarius';
            break;
            case "рак":
            $sym = 'cancer';
            break;
            case "скорпион":
            $sym = 'scorpio';
            break;
            case "рыбы":
            $sym = 'pisces';
            break;
            case "телец":
            $sym = 'taurus';
            break;
            case "дева":
            $sym = 'virgo';
            break;
        }
        if ($sym) {
            $message = $get->$sym->today;
        }
        else {
            $message = "Чот хуевый гороскоп у тебя";
        }
        $json = json_encode($message);
        $array = json_decode($json,TRUE);
        $vkue->send($array[0]);
    }
],
[
    'r'=>"/^{$options['words']} генератор (.*)/iu",
    'd'=>"Крис генератор <пароля/ника> - сгенерировать пароль или ник",
    'f'=>function($params, $vkue, $msg){
        $length=10;
        if($params[1] == 'пароля'){
            $return = array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","V","X","Y","Z","1","2","3","4","5","6","7","8","9","0",".",",","(",")","[","]","!","?","&","^","%","@","*","$","<",">","/","|","+","-","{","}","`","~");
            $password="";
            for ($i = 0; $i < $length; $i++) {
                $index = rand(0, count($return) - 1);
                $password .= $return [$index];
            }
            $vkue->send("✒Ваш пароль: " . $password . "✒");
        }
        if($params[1] == 'ника'){
            $char = array('aeiouy', 'bcdfghjklmnpqrstvwxz');
            $return = array();
            foreach ($char as $k => $v)
                $char[$k] = str_split($v);
            for ($i = 0; $i < $length; $i++) {
                while (true) {
                    $symbol_x = mt_rand(0, sizeof($char) - 1);
                    $symbol_y = mt_rand(0, sizeof($char [$symbol_x]) - 1);
                    if ($i > 0 && in_array($return[$i - 1], $char [$symbol_x])) {
                        continue;
                    }
                    $return[] = $char [$symbol_x] [$symbol_y];
                    break;
                }
            }
            $vkue->send("✏Ваш ник: " . ucfirst(implode('', $return)) . "✏");
        }
            //$vkue->send(print_wikidata($params[1]));
    }
],
], 
];
$vkue->long_poll->init($cmds);
?>