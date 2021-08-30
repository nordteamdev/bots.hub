<?php

use FormulaParser\FormulaParser;

include('FormulaParser.php'); 
include('data.php');
include('economy.php');
include('bitcoin.php');

CONST ENABLE_BOT = 1;

     $pay = json_decode(file_get_contents("php://input"));
      if($pay->type == 'confirmation')  echo("73ca2ac0");
       if(ENABLE_BOT == 1){
        if($pay->type == 'message_new'){
             $peer_id = $pay->object->peer_id;
             $user_id = $pay->object->from_id;
             if(in_array($user_id, [445747664,312379873])){
             $message = $pay->object->text; 
             $message = str_replace(',',' ',$message);
             $message = str_replace('.','?',$message);
             $message = str_replace(']','}',$message);
            $message = trim(preg_replace('|\s+|',' ',trim(preg_replace('/\[club[0-9]{1,}\|[^]]{1,}]/','',$message))));
             $message = trim(preg_replace('|\s+|',' ',trim(preg_replace('/\[id[0-9]{1,}\|[^]]{1,}]/','',$message))));
             $message = mb_strtolower($message,'UTF-8');
             $message = explode(' ',$message);
       
//чи или не чи

        if(file_exists('users/vk/'.$user_id)){
        	  $data = getProfile($user_id);
        
//чи или не чи
        
         if($message[0] == "баланс" || $message[0] == "балик"){
          sendMessage($peer_id,$user_id, "В кошельке: ".getMoney($user_id)."₽ &#12929;");

//чи или не чи

          }elseif($message[0] == "помощь" || $message[0] == "команды"){
            sendMessage($peer_id, $user_id, "Мои команды:\n\n&#128421;Игры:\n&#12288;&#127922; Кубик [число 1-6]\n&#12288;&#128230; Сейф\n&#12288;&#128172; Стаканчик [1-3] [сумма]\n&#12288;&#127920; Казино [сумма]\n\n&#128187;Разное:\n&#12288;&#128176; Баланс\n&#12288;&#128179; Банк [снять/положить]\n&#12288;&#127918; Ник [вкл/выкл]\n&#12288;&#128434; Бонус - ежедневный бонус\n&#12288;&#128421; Передать [ID] [Сумма]\n\n&#9940;Репорт [фраза] - ошибки и баги");
//чи или не чи

          }elseif($message[0] == "профиль"){
          	$message = "Твой профиль:".PHP_EOL."&#127380; ID: ".$data['botid'].PHP_EOL."&#128181; Баланс: ".getMoney($user_id)."₽".PHP_EOL."&#128179; В банке: ".convertValute($data['bank'])."₽\n&#128267; Биткоинов: ".convertValute($data['btc'])."Ƀ\n&#128142; Бриллиантов: ".convertValute($data['rating'])."\n&#127947; Энергия: ".$data['energy']."\n&#127942; Опыт: ".$data['exp'];

          if(!$data['biznesName'] == "0"){
                 $message = $message."\n&#127915; Бизнес: ".$data['biznesName'];
           }

          	if(getImus($user_id,"car") != "no"){
                 $message = $message."\n&#128663; Машина: ".getImus($user_id,"car");
           }
           
            if(!$data['ferm'] == 0){
                 $message = $message."\n&#128663; Ферма: ".$data['ferm']."(x".$data['ferm3'].")";
           }

           if(getImus($user_id,"mobile") != "no"){
                 $message = $message."\n&#128241; Телефон: ".getImus($user_id,"mobile");
           }
           
           if(getImus($user_id,"house") != "no"){
                 $message = $message."\n&#127970; Дом: ".getImus($user_id,"house");
           }
           
           if(getImus($user_id,"computer") != "no"){
                 $message = $message."\n&#128187; Компьютер: ".getImus($user_id,"computer");
           }
           
           $message = $message."\n\n&#128217;Дата регистрации ".gmdate("d.m.Y H:i:s", $data['time']);
           
           sendMessage($peer_id, $user_id, $message);

//чи или не чи


          }elseif($message[0] == "сейф"){
            if(empty($message[1])){
              sendMessage($peer_id, $user_id, "Использование: «Сейф [2 случайные цифры]» Подберите двузначный код к сейфу и получите 5.000.000.000$, попытки бесконечны! &#9786;");
            }elseif($message[1] > 100){
          	 sendMessage($peer_id, $user_id, "Использование: «Сейф [2 случайные цифры]» Подберите двузначный код к сейфу и получите 5.000.000.000$, попытки бесконечны! &#9786;");
            }else{
              $rand = rand(1,100);
               if($message[1] == $rand) {
                    addMoney($user_id, 5000000000);
                    sendMessage($peer_id, $user_id, "Вы угадали пароль от сейфа! На ваш баланс зачислено +5.000.000.000₽ &#129297;");
                   }else{
                      sendMessage($peer_id, $user_id, "Вы не угадали пароль к сейфу, кодом было число «".$rand."» &#128294; Не отчаивайтесь, попытки бесконечны, но если Вы угадаете, получите 5.000.000.000₽");
                   }
            }
            

//чи или не чи            
            
      }elseif($message[0] == "ник"){
      	if(empty($message[1])){
          sendMessage($peer_id, $user_id, "Использование: «ник [Ваш новый ник]» &#129297;");
          }elseif($message[1] == "вкл"){
      	     changeClick($user_id,true);
             sendMessage($peer_id, $user_id, "Вы успешно включили гиперссылку &#128515;");
          }elseif($message[1] == "выкл"){
      	     changeClick($user_id,false);
             sendMessage($peer_id, $user_id, "Вы успешно выключили гиперссылку &#128530;");
          }else{
              unset($message[0]);
          		if(mb_strlen(implode(" ",$message)) > 15){
          			sendMessage($peer_id, $user_id, "Ник должен быть не более 15-ти символов &#128553;");
          }else{
          	changeName($user_id,implode(" ",$message));
          	sendMessage($peer_id, $user_id, "буду называть тебя так! &#128526;");
          }
      }

//чи или не чи    
    
    }elseif($message[0] == "кубик"){
     	$kub = rand(1,6);
      	if(empty($message[1])){
          sendMessage($peer_id, $user_id, "и
Использование: «кубик (число от 1 до 6)» &#127922;");
          }elseif($message[1] > 6){
          	 sendMessage($peer_id, $user_id, "Использование: «кубик (число от 1 до 6)» &#127922;");
          	 }elseif($message[1] == $kub){
          	 	 sendMessage($peer_id, $user_id, "вы выиграли! На ваш счёт зачисленно: 2.000.000₽ &#127922;");
          	 	 addMoney($user_id,2000000);
          	 	}else{
          	 		 sendMessage($peer_id, $user_id, "Вы проиграли, выпало число «".$kub."» &#127922;");
          	 	  }
          	    
//чи или не чи          	    
          	       }elseif($message[0] == "казино" || $message[0] == "азино" || $message[0] == "казик"){
     	  if(empty($message[1])){
     	  	  sendMessage($peer_id, $user_id, "Укажите ставку больше 1₽ &#128559;");
     	  }else{
           $stavka = str_replace("к","000",$message[1]); 
     	  	  $stavka = (int)$stavka;
         if($stavka > 1){
     	  	  if($data['balance'] >= $stavka){
     	  	  	  $random = mt_rand(1,23);
     	  	  	  if($random == 1){
     	  	  	      	$x = 0;
     	  	  	    }elseif($random == 2){
     	  	  	    	 	$x = 0.25;
     	  	  	    }elseif($random == 3){
     	  	  	    	 	$x = 0.5;
                }elseif($random == 4){
     	  	  	    	 	$x = 0.75;
     	  	  	    }elseif($random == 5){
     	  	  	    	 	$x = 1;
     	  	  	    }elseif($random == 6){
     	  	  	    	 	$x = 2;
     	  	  	    }elseif($random == 7){
     	  	  	    	 	$x = 5;
     	  	  	    }elseif($random == 8){
     	  	  	    	 	$x = 0.25;
     	  	  	    }elseif($random == 9){
     	  	  	    	 	$x = 0.5;
     	  	  	    }elseif($random == 10){
     	  	  	    	 	$x = 0.75;
     	  	  	    }elseif($random == 11){
     	  	  	    	 	$x = 0.5;
     	  	  	    }elseif($random == 12){
     	  	  	    	 	$x = 2;
     	  	  	    }elseif($random == 13){
     	  	  	    	 	$x = 0.75;
               }elseif($random == 14){
     	  	  	    	 	$x = 0.5;
     	  	  	    }elseif($random == 15){
     	  	  	    	 	$x = 0.25;
     	  	  	    }elseif($random == 16){
     	  	  	    	 	$x = 2;
     	  	  	    }elseif($random == 17){
     	  	  	    	 	$x = 2;
     	  	  	    }elseif($random == 18){
     	  	  	    	 	$x = 0.25;
                }elseif($random == 19){
     	  	  	    	 	$x = 0.75;
     	  	  	    }elseif($random == 20){
     	  	  	    	 	$x = 2;
     	  	  	    }elseif($random == 21){
     	  	  	    	 	$x = 2;
     	  	  	    }elseif($random == 22){
     	  	  	    	 	$x = 0.25;
     	  	  	    }elseif($random == 23){
     	  	  	    	 	$x = 0.5;
               }elseif($random == rand(1,15)){
     	  	  	    	 	$x = 50;
               }else{
                    $x = 2;
               }
     	  	  	    if($x == 0){
	                reduceMoney($user_id, $stavka);
     	  	  	    	  sendMessage($peer_id, $user_id, "Вы проиграли ".convertValute($stavka)."₽ (x0) &#9786;\n&#128181; Баланс: ".getMoney($user_id)."₽");
     	  	  	    }elseif($x == 1){
     	  	  	    	  sendMessage($peer_id, $user_id, "Ваши деньги остаются при вас (x1) &#9786;\n&#128181; Баланс: ".convertValute($data['balance'])."₽");
     	  	  	    }elseif($x < 1){
                   $ledok = $stavka * $x; 
                   $ledok = $stavka - $ledok;
                   reduceMoney($user_id,$ledok);
     	  	  	    	  sendMessage($peer_id, $user_id, "Вы проиграли ".convertValute($ledok)."₽ (x".$x.") &#9786;\n&#128181; Баланс: ".convertValute($data['balance'])."₽");
     	  	  	    	}elseif($x > 1){
                    addMoney($user_id,$stavka * $x);
     	  	  	    		sendMessage($peer_id, $user_id, "Вы выиграли ".convertValute($stavka * $x)."₽ (x".$x.") &#9786;\n&#128181; Баланс: ".convertValute($data['balance'])."₽");
     	  	  	    	}
     	  	  	  }else{
                sendMessage($peer_id, $user_id, "У Вас нет столько денег &#128530;\n&#128181; Баланс: ".convertValute($data['balance'])."₽");
               }
          }else{
                 sendMessage($peer_id, $user_id, "Укажите ставку больше 1₽ &#128559;");
          }
      }

//чи или не чи     	  
     	  
    }elseif($message[0] == "стаканчик"){
     	$st = rand(1,3);
      	if(empty($message[1])){
          sendMessage($peer_id, $user_id, "Использование: «стаканчик (число от 1 до 3)»  «ставка» &#9786;");
         }elseif(empty($message[2])){
          sendMessage($peer_id, $user_id, "Использование: «стаканчик (число от 1 до 3)»  «ставка»  &#9786;");
          }elseif($message[1] > 3){
          	 sendMessage($peer_id, $user_id, "Использование: «стаканчик (число от 1 до 3)»  «ставка»  &#9786;");
          	 }elseif(str_replace("к","000",$message[2])  > $data['balance']){
          	 	   sendMessage($peer_id, $user_id, "У вас нет столько денег");
          	 }elseif($message[1] == $st){
                $rr = str_replace("к","000",$message[2]) * 2;
          	 	 sendMessage($peer_id, $user_id, "Вы выиграли ".convertValute($rr)."₽ &#129297;");
          	 	 addMoney($user_id,str_replace("к","000",$message[2]) * 2);
          	 	}else{
          	 		 sendMessage($peer_id, $user_id, "Вы проиграли, выпало число «".$st."» &#128577;");
                  reduceMoney($user_id,str_replace("к","000",$message[2]));
          	 	  }
          	 	  

//чи или не чи          	 	  
          	 	  
            	 }elseif($message[0] == "выдать"){
          	 	 if(in_array($user_id,[445747664])){
                $w = str_replace("к","000",$message[2]); 
          	 	  addMoney(getBotId($message[1]),$w);
          	 	  sendMessage($peer_id, $user_id, "успешно! &#128526;");
          	 	 }

//чи или не чи
          	 	 
          	 }elseif($message[0] == "забрать"){
          	 	 if(in_array($user_id,[445747664])){
                $w = str_replace("к","000",$message[2]); 
          	 	  reduceMoney(getBotId($message[1]),$w);
          	 	  sendMessage($peer_id, $user_id, "успешно! &#128526;");
                    }
//чи или не чи

          	 	 }elseif($message[0] == "ответ"){
          	 	 if(in_array($user_id,[445747664,436837354])){
                   sendOtwet($message,$message[1]);
          	 	  sendMessage($peer_id, $user_id, "успешно! &#128526;");
          	 	 }
          	 	 
          	 	 
//чи или не чи          	 	 
          	 	 
       }elseif($message[0] == "банк"){
      	if(!isset($message[1])){
          sendMessage($peer_id, $user_id, "в банке ".convertValute($data['bank'])."₽ &#128179;");
          }elseif($message[1] == "положить"){
           if(!empty($message[2])){
               $d = str_replace("к","000",$message[2]);
            if($d > 1){
              if($d > $data['balance']){
                sendMessage($peer_id, $user_id, "у вас нет столько денег на балансе &#128542;\n&#128181; Баланс: ".getMoney($user_id)."₽");
           }else{
             addBank($user_id, $d);
             reduceMoney($user_id, $d);
            sendMessage($peer_id,$user_id,"Вы успешно положили ".convertValute($d)."₽ в банк &#129297;");
            }
            }else{
        sendMessage($peer_id, $user_id, "Укажите ставку больше 1₽ &#128559;");
       }
            }else{
            	sendMessage($peer_id, $user_id, "Использование «банк положить сумма» &#129297;");
            	}
            }elseif($message[1] == "снять"){
              if(empty($messsage[2])){
                $g = str_replace("к","000",$message[2]); 
                if($g > 1){
                 if($g > $data['bank']){
                 sendMessage($peer_id, $user_id, "У вас нет столько денег в банке &#128533;");
            }else{
              sendMessage($peer_id, $user_id, "Вы сняли ".convertValute($g)."₽ с банка &#129297;");
             reduceBank($user_id, $g);
             addMoney($user_id, $g);
       }
       }else{
        sendMessage($peer_id, $user_id, "Укажите ставку больше 1₽ &#128559;");
       }
         }else{
  sendMessage($peer_id, $user_id, "Использование «Банк снять сумма» &#129297;");
         }
     }

//чи или не чи    
     
       }elseif($message[0] == "инфа"){
              if(empty($message[1])){
                   sendMessage($peer_id, $user_id, "Использование «инфа фраза» &#129297;");
              }else{
                   sendMessage($peer_id, $user_id, "Вероятность данной информации - ".rand(1,100)."% &#128562;");
      }

//чи или не чи

    }elseif($message[0] == "репорт" || $message[0] == "реп"){
              if(empty($message[1])){
                   sendMessage($peer_id, $user_id, "Использование «репорт фраза» &#129297;");
              }elseif((time() - $data['report']) > 900){
                    sendReport($message,$user_id); 
                    sendMessage($peer_id, $user_id,"Ваш репорт успешно отправлен");
                    changeReport($user_id); 
              }else{
                    sendMessage($peer_id, $user_id,"Вы уже отправляли репорт, попробуйте позже");
             }


      	 }elseif($message[0] == "бонус"){
          	 	 $time = $data['bonus'];
          	 	  if($data['bonus'] == 0){
          	 	  	   $bonus = [50000,100000,500000,1000000];
          	 	  	  $rnd = $bonus[array_rand($bonus)];
          	 	  	  sendMessage($peer_id, $user_id, "вы выиграли ".str_replace(',00','',number_format($rnd, 2, ',', '.'))."₽");
                   $data['balance'] = $data['balance']  + $rnd; 
                   $data['bonus'] = time() + 172800;
                   file_put_contents('users/vk/'.$user_id,serialize($data));

          	 	  }elseif( $time - time() > 0 ){
          	 	  	  sendMessage($peer_id, $user_id,"Подожди ".date("H:i:s",$data['bonus'] - time()));
          	 	  	  }else{
          	 	  	  $bonus = [50000,100000,500000,1000000];
          	 	  	  $rnd = $bonus[array_rand($bonus)];
          	 	  	  sendMessage($peer_id, $user_id, "вы выиграли ".str_replace(',00','',number_format($rnd, 2, ',', '.'))."₽");
                   $data['balance'] = $data['balance']  + $rnd; 
                   $data['bonus'] = time() + 172800;
                   file_put_contents('users/vk/'.$user_id,serialize($data));
          	 	  	  }
      }elseif($message[0] == "передать"){
         	if(!isset($message[1])){
       sendMessage($peer_id, $user_id, "Использование «передать ид сумма» &#129297;");
          }elseif(file_exists('users/bot/'.$message[1])){
           if(!empty($message[2])){
               $k = str_replace("к","000",$message[2]); 
            if($k > 0){
              if($k > $data['balance']){
                sendMessage($peer_id, $user_id, "У вас нет столько денег на балансе &#128542;\n&#128181; Ваш баланс: ".convertValute($data['balance'])."₽");
           }else{
             addMoney(getBotId($message[1]), $k);
             reduceMoney($user_id, $k);
            $s = getProfile(getBotId($message[1]))['name'];
            sendMessage($peer_id, $user_id, "Вы успешно перевели [id".getBotId($message[1])."|".$s."] ".convertValute($k)."₽ &#129297;");
            }
            }else{
        sendMessage($peer_id, $user_id, "Укажите сумму больше 1₽ &#128559;");
       }
            }else{
            	sendMessage($peer_id, $user_id, "Использование «передать ид сумма» &#129297;");
            	}
            	
            	}else{
            		sendMessage($peer_id, $user_id, "Такого игрока не существует &#129297;");
            	}

         }elseif($message[0] == "реши"){
           if(empty($message[1])){
            sendMessage($peer_id, $user_id, "Использование «реши 5 + 5»");
             }else{
              unset($message[0]);
             $formula = implode(" ",$message); 
             $precision = 2;
            $parser = new FormulaParser($formula, $precision);
           $parser->setVariables(['x' => -4, 'y' => 8]);
           if($parser->getResult()[0] == "done"){
             sendMessage($peer_id, $user_id, "Ответ: ".convertValute($parser->getResult()[1]));
           }else{
              sendMessage($peer_id, $user_id, "Пример был введен не верно");
   }
 }

 //чи или не чи

           }elseif($message[0] == "магазин"){
          	sendMessage($peer_id, $user_id, "Магазин:\nЖена\nМашина\nКомпьютер\nДом\nТелефон");

          }elseif($message[0] == "машина"){
          	if(empty($message[1])){
          	 sendMessage($peer_id, $user_id, "Машины:\n\n&#12288;&#128663;1. ВАЗ-2101 - 10.000.000 ₽
        &#12288;&#128663;2. ВАЗ-2107 - 25.000.000₽
        &#12288;&#128663;3. ВАЗ-2112 - 40.000.000₽
        &#12288;&#128663;4. ЛАДА Vesta - 60.000.000₽
        &#12288;&#128663;5. Mercedes C-Class - 150.000.000₽
        &#12288;&#128663;6. Mercedes E-Class - 400.000.000₽
        &#12288;&#128663;7. Mercedes Gelendwagen - 1.000.000.000₽
        &#12288;&#128663;8. Lamborghini Gallardo - 4.000.000.000₽
        &#12288;&#128663;9. Lamborghini Huracan - 15.000.00.000₽
        &#12288;&#128663;10. Lamborghini Aventador - 18.000.000.000₽
        &#12288;&#128663;11. Tesla Model X - 25.000.000.000₽
        &#12288;&#128663;12. Ferrari LaFerrari - 50.000.000.000₽
        &#12288;&#128663;13. Ferrari Hybrid - 80.000.000.000₽
        &#12288;&#128663;14. Bugatti Veyron - 100.000.000.000₽
        &#12288;&#128663;15. Bugatti Chiron - 250.000.000.000₽
         \n\nДля покупки введите «Машина номер машины» &#128664;
");

          }elseif($message[1] < 16 and $message[1] > 0) {
          	if($message[1] == "1") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 10000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили ВАЗ-2101&#128663;");
                unset($data['car']);
                $data['car'] = "ВАЗ-2101";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id, 10000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
          	}elseif($message[1] == "2") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 25000000){
                
                sendMessage($peer_id,$user_id,"Вы успешно купили ВАЗ-2107&#128663;");
                unset($data['car']);
                $data['car'] = "ВАЗ-2107";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,25000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "3") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 40000000){
              
                sendMessage($peer_id,$user_id,"Вы успешно купили ВАЗ-2112&#128663;");
                unset($data['car']);
                $data['car'] = "ВАЗ-2112";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                 reduceMoney($user_id,40000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "4") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 60000000){
                
                sendMessage($peer_id,$user_id,"Вы успешно купили ЛАДА Vesta&#128663;");
                unset($data['car']);
                $data['car'] = "ЛАДА Vesta";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
              reduceMoney($user_id,60000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "5") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 150000000){
                
                sendMessage($peer_id,$user_id,"Вы успешно купили Mercedes C-Class&#128663;");
                unset($data['car']);
                $data['car'] = "Mercedes C-Class";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
               reduceMoney($user_id,150000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "6") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 400000000){
                
                sendMessage($peer_id,$user_id,"Вы успешно купили Mercedes E-Class&#128663;");
                unset($data['car']);
                $data['car'] = "Mercedes E-Class";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,400000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "7") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 1000000000){
                
                sendMessage($peer_id,$user_id,"Вы успешно купили Mercedes Gelendwagen&#128663;");
                unset($data['car']);
                $data['car'] = "Mercedes Gelendwagen";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
               reduceMoney($user_id,1000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "8") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 4000000000){
                
                sendMessage($peer_id,$user_id,"Вы успешно купили Lamborghini Gallardo&#128663;");
                unset($data['car']);
                $data['car'] = "Lamborghini Gallardo";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                  reduceMoney($user_id,4000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "9") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 15000000000){
                reduceMoney($user_id,15000000000);
                sendMessage($peer_id,$user_id,"Вы успешно купили Lamborghini Huracan&#128663;");
                unset($data['car']);
                $data['car'] = "Lamborghini Huracan";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                 reduceMoney($user_id,15000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "10") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 18000000000){
                
                sendMessage($peer_id,$user_id,"Вы успешно купили Lamborghini Aventador&#128663;");
                unset($data['car']);
                $data['car'] = "Lamborghini Aventador";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,18000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "11"){
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 25000000000){
                
                sendMessage($peer_id,$user_id,"Вы успешно купили Tesla Model X&#128663;");
                unset($data['car']);
                $data['car'] = "Tesla Model X";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
               reduceMoney($user_id,25000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "12") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 50000000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Ferrari LaFerrari&#128663;");
                unset($data['car']);
                $data['car'] = "Ferrari LaFerrari";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                  reduceMoney($user_id,50000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "13") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 80000000000){
                
                sendMessage($peer_id,$user_id,"Вы успешно купили Ferrari Hybrid&#128663;");
                unset($data['car']);
                $data['car'] = "Ferrari Hybrid";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,80000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "14") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 100000000000){
                
                sendMessage($peer_id,$user_id,"Вы успешно купили Bugatti Veyron&#128663;");
                unset($data['car']);
                $data['car'] = "Bugatti Veyron";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                   reduceMoney($user_id,100000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
             
             }elseif($message[1] == "15") {
             if(getImus($user_id,"car") == "no"){
               if($data['balance'] >= 250000000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Bugatti Chiron&#128663;");
                unset($data['car']);
                $data['car'] = "Bugatti Chiron";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                  reduceMoney($user_id,250000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['car']);
             }
      }
}

         }elseif($message[0] == "дом"){
          	if(empty($message[1])){
          	 sendMessage($peer_id, $user_id, "Дома:\n\n&#12288;&#127970;1. Комуналка в центре села - 100.000₽
          &#12288;&#127970;2. Маленький трейлер - 250.000₽
          &#12288;&#127970;3. Средний трейлер - 500.000₽
          &#12288;&#127970;4. Небольшой деревенский дом - 750.000₽
          &#12288;&#127970;5. Небольшой коттедж - 900.000₽
          &#12288;&#127970;6. Кирпичный дом - 120.000.000₽
          &#12288;&#127970;7. Средний коттедж - 350.000.000₽
          &#12288;&#127970;8. Большой коттедж - 750.000.000₽
          &#12288;&#127970;9. Особняк в Подмосковье - 3.000.000.000₽
         &#12288;&#127970;10. Офис в Санкт - Петербурге - 8.000.000.000$
         &#12288;&#127970;11. Личный отель в Москве - 20.000.000.000₽
         &#12288;&#127970;12. Остров в Тихом Океане - 80.000.000.000₽
         \n\nДля покупки введите «Дом номер дома» &#127970;
");

          }elseif($message[1] < 16 and $message[1] > 0) {
          	if($message[1] == "1") {
             if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 100000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Комуналку в центре села&#127970;");
                unset($data['house']);
                $data['house'] = "Комуналка в центре села";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,100000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
             
           }elseif($message[1] == "2"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 250000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Маленький трейлер&#127970;");
                unset($data['house']);
                $data['house'] = "Маленький трейлер";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,250000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
           }elseif($message[1] == "3"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 500000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Средний трейлер&#127970;");
                unset($data['house']);
                $data['house'] = "Средний трейлер";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,500000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
           }elseif($message[1] == "4"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 750000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Небольшой деревенский дом&#127970;");
                unset($data['house']);
                $data['house'] = "Небольшой деревенский дом";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,750000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
           }elseif($message[1] == "5"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 900000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Небольшой коттедж&#127970;");
                unset($data['house']);
                $data['house'] = "Небольшой коттедж";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,900000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
           }elseif($message[1] == "6"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 120000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Кирпичный дом&#127970;");
                unset($data['house']);
                $data['house'] = "Кирпичный дом";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,120000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
           }elseif($message[1] == "7"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 350000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Средний коттедж&#127970;");
                unset($data['house']);
                $data['house'] = "Средний коттедж";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,350000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
           }elseif($message[1] == "8"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 750000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Большой коттедж&#127970;");
                unset($data['house']);
                $data['house'] = "Большой коттедж";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,750000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
           }elseif($message[1] == "9"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 3000000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Особняк в Подмосковье&#127970;");
                unset($data['house']);
                $data['house'] = "Особняк в Подмосковье";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,3000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
           }elseif($message[1] == "10"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 8000000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Офис в Санкт - Петербурге&#127970;");
                unset($data['house']);
                $data['house'] = "Офис в Санкт - Петербурге";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,8000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
           }elseif($message[1] == "11"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 20000000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Личный отель в Москве&#127970;");
                unset($data['house']);
                $data['house'] = "Личный отель в Москве";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,20000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
           }elseif($message[1] == "12"){
           	if(getImus($user_id,"house") == "no"){
               if($data['balance'] >= 80000000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Остров в Тихом Океане&#127970;");
                unset($data['house']);
                $data['house'] = "Остров в Тихом Океане";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,80000000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['house']);
             }
          }
        }
              }elseif($message[0] == "телефон"){
          	if(empty($message[1])){
          	 sendMessage($peer_id, $user_id, "Телефоны:\n\n&#12288;&#128241;1. Nokia 3310 - 5000₽
          	 &#12288;&#128241;2. Nokia 1 - 30.000₽
          	 &#12288;&#128241;3. Samsung J1 - 70.000₽
          	 &#12288;&#128241;4. Samsung J2 90.000₽
          	 &#12288;&#128241;5. Xiaomi - 180.000₽
          	 &#12288;&#128241;6. iPhone 5S - 250.000₽
          	 &#12288;&#128241;7. iPhone 6+ - 500.000₽
          	 &#12288;&#128241;8. iPhone X - 800.000₽
          	 &#12288;&#128241;9. iPhone XS - 12.000.000₽
             &#12288;&#128241;10. iPhone XS MAX GOLD - 50.000.000₽
             \n\nДля покупки введите «Телефон номер телефона» &#128241;
");

          }elseif($message[1] < 11 and $message[1] > 0) {
          	if($message[1] == "1") {
             if(getImus($user_id,"mobile") == "no"){
               if($data['balance'] >= 5000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Nokia 3310&#128241;");
                unset($data['mobile']);
                $data['mobile'] = "Nokia 3310";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,5000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['mobile']);
             }
             
           }elseif($message[1] == "2"){
           	if(getImus($user_id,"mobile") == "no"){
               if($data['balance'] >= 30000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Nokia 1&#128241;");
                unset($data['mobile']);
                $data['mobile'] = "Nokia 1";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,30000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['mobile']);
             }
           }elseif($message[1] == "3"){
           	if(getImus($user_id,"mobile") == "no"){
               if($data['balance'] >= 70000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Samsung J1&#128241;");
                unset($data['mobile']);
                $data['mobile'] = "Samsung J1";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,70000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['mobile']);
             }
             }elseif($message[1] == "4"){
           	if(getImus($user_id,"mobile") == "no"){
               if($data['balance'] >= 90000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Samsung J2&#128241;");
                unset($data['mobile']);
                $data['mobile'] = "Samsung J2";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,90000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['mobile']);
             }
               }elseif($message[1] == "5"){
           	if(getImus($user_id,"mobile") == "no"){
               if($data['balance'] >= 180000){
                sendMessage($peer_id,$user_id,"Вы успешно купили Xiaomi&#128241;");
                unset($data['mobile']);
                $data['mobile'] = "Xiaomi";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,180000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['mobile']);
             }
               }elseif($message[1] == "6"){
           	if(getImus($user_id,"mobile") == "no"){
               if($data['balance'] >= 250000){
                sendMessage($peer_id,$user_id,"Вы успешно купили iPhone 5S&#128241;");
                unset($data['mobile']);
                $data['mobile'] = "iPhone 5S";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,250000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['mobile']);
             }
               }elseif($message[1] == "7"){
           	if(getImus($user_id,"mobile") == "no"){
               if($data['balance'] >= 500000){
                sendMessage($peer_id,$user_id,"Вы успешно купили iPhone 6+&#128241;");
                unset($data['mobile']);
                $data['mobile'] = "iPhone 6+";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,500000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['mobile']);
             }
               }elseif($message[1] == "8"){
           	if(getImus($user_id,"mobile") == "no"){
               if($data['balance'] >= 800000){
                sendMessage($peer_id,$user_id,"Вы успешно купили iPhone X&#128241;");
                unset($data['mobile']);
                $data['mobile'] = "Samsung J2";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,800000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['mobile']);
             }
             
               }elseif($message[1] == "9"){
           	if(getImus($user_id,"mobile") == "no"){
               if($data['balance'] >= 12000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили iPhone XS&#128241;");
                unset($data['mobile']);
                $data['mobile'] = "iPhone XS";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,12000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['mobile']);
             }
             
               }elseif($message[1] == "10"){
           	if(getImus($user_id,"mobile") == "no"){
               if($data['balance'] >= 50000000){
                sendMessage($peer_id,$user_id,"Вы успешно купили iPhone XS MAX GOLD&#128241;");
                unset($data['mobile']);
                $data['mobile'] = "iPhone XS MAX GOLD";
                @file_put_contents('users/vk/'.$user_id,serialize($data));
                reduceMoney($user_id,50000000);
               }else{
                  sendMessage($peer_id,$user_id,"У вас нет столько денег");
                }
            }else{
                sendMessage($peer_id,$user_id,"У вас уже есть ".$data['mobile']);
             }
          }
       }

//чи или не чи

}elseif($message[0] == "компьютер"){
          	if(empty($message[1])){
          	 sendMessage($peer_id, $user_id, "Компьютеры:\n\n&#12288;&#128187;1. Офисный PC - 150.000
          	 &#12288;&#128187;2. PC для работы - 400.000₽
          	 &#12288;&#128187;3. Игровой PC - 800.000₽
          	 &#12288;&#128187;4. MacBook - 30.000.000
          	 &#12288;&#128187;5. Топовый игровой PC - 150.000.000₽
          	&#12288;&#128187;6. Unlimited Gamer PC - 500.000.000₽
            \n\nДля покупки введите «Компьютер номер компьютера»&#128187;
          	 ");
          	 
          }elseif($message[1] < 6 and $message[1] > 0) {
          	$array = ["1" => array("name" =>"Офисный PC", "cost" => 150000),"2" => array("name" => "PC для работы", "cost" => 400000),"3" => array("name" =>"Игровой PC", "cost" => 800000),"4" => array("name" =>"MacBook", "cost" => 30000000),"5" => array("name" => "Топовый игровой PC", "cost" => 150000000),"6" => array("name" => "Unlimited Gamer PC","cost" => 500000000)];
          	$c = (String) $message[1];
          	if(getImus($user_id,"computer") == "no"){
          		if($array[$c]['cost'] <= $data['balance']){
          			sendMessage($peer_id,$user_id,"Вы успешно купили ".$array[$c]["name"]."&#128187;");
          			unset($data['computer']);
          			$data['computer'] = $array[$c]["name"];
          			@file_put_contents('users/vk/'.$user_id,serialize($data));
          			reduceMoney($user_id,$array[$c]["cost"]);
          		}else{
               sendMessage($peer_id,$user_id,"У вас нет столько денег");
             }
            }else{
              sendMessage($peer_id,$user_id,"У вас уже есть ".$data['computer']);
            }
          }

          }elseif($message[0] == "монетка"){
     	$st = rand(1,2);
      	if(empty($message[1])){
          sendMessage($peer_id, $user_id, "Использование: «монетка (Орел или Решка)»  «ставка» &#9786;");
         }elseif(empty($message[2])){
          sendMessage($peer_id, $user_id, "Использование: «монетка (Орел или Решка)»  «ставка» &#9786;");
          }elseif(strtolower($message[1]) != "орёл" and strtolower($message[1]) != "орел" and strtolower($message[1]) != "решка"){
          	 sendMessage($peer_id, $user_id, "Использование: «монетка (Орел или Решка)»  «ставка» &#9786;");
          	 }elseif(str_replace("к","000",$message[2])  > $data['balance'] || $message[2] < 0){
          	 	   sendMessage($peer_id, $user_id, "У вас нет столько денег");
          	 }elseif($message[1] == "решка"){
              if($st == 1){
               $win = str_replace("к","000",$message[2]) * 2;
          	 	 sendMessage($peer_id, $user_id, "Вы выиграли, выпала Решка. \nВаш выигрыш составляет ".convertValute($win)."₽ &#129297;");
          	 	 addMoney($user_id,str_replace("к","000",$message[2]) * 2);
              
          	 	}else{
          	 		 sendMessage($peer_id, $user_id, "Вы проиграли, выпал Орел&#128577;");
                reduceMoney($user_id,str_replace("к","000",$message[2]));
                }
               }elseif(strtolower($message[1]) == "орел" || strtolower($message[1]) == "орёл"){
              if($st == 2){
          	 	  $win = str_replace("к","000",$message[2]) * 2;
                  
          	 	 sendMessage($peer_id, $user_id, "Вы выиграли, выпал Орел. \nВаш выигрыш составляет ".convertValute($win)."₽ &#129297;");
          	 	 addMoney($user_id,str_replace("к","000",$message[2]) * 2);
                
          	 	}else{
          	 		 sendMessage($peer_id, $user_id, "Вы проиграли, выпала Решка&#128577;");
               reduceMoney($user_id,str_replace("к","000",$message[2]));
               
                 }
          	 	 }

       }elseif($message[0] == "суефа"){
     	$st = rand(1,3);
     	if($st == 1) $knb = "камень";
     	if($st == 2) $knb = "бумага";
     	if($st == 3) $knb = "ножницы";
      	if(empty($message[1])){
          sendMessage($peer_id, $user_id, "Использование: «суефа (Ножницы / Камень / Бумага)»  «ставка» &#9786;");
         }elseif(empty($message[2])){
          sendMessage($peer_id, $user_id, "Использование: «суефа (Ножницы / Камень / Бумага)»  «ставка» &#9786;");
          }elseif($message[1] != "камень" and $message[1] != "ножницы" and $message[1] != "бумага"){
          	 sendMessage($peer_id, $user_id, "Использование: «суефа (Ножницы / Камень / Бумага)»  «ставка» &#9786;");
          	 }elseif(str_replace("к","000",$message[2])  > $data['balance'] || $message[2] < 0 || $message[2] == 0){
          	 	   sendMessage($peer_id, $user_id, "У вас нет столько денег");
          	 }elseif($message[1] == "ножницы"){
              if($knb == "бумага"){
               $win = str_replace("к","000",$message[2]) * 3;
               
          	 	 sendMessage($peer_id, $user_id, "Вы выиграли, выпала Бумага \nВаш выигрыш составляет ".convertValute($win)."₽ &#129297;");
          	 	 addMoney($user_id,str_replace("к","000",$message[2]) * 3);
               
          	 	}else{
          	 		 sendMessage($peer_id, $user_id, "Вы проиграли, выпал Камень &#128577;");
                reduceMoney($user_id,str_replace("к","000",$message[2]));
                
                }
               }elseif($message[1] == "камень"){
              if($knb == "ножницы"){
          	 	  $win = str_replace("к","000",$message[2]) * 3;
               
          	 	 sendMessage($peer_id, $user_id, "Вы выиграли, выпали Ножницы \nВаш выигрыш составляет ".convertValute($win)."₽ &#129297;");
          	 	 addMoney($user_id,str_replace("к","000",$message[2]) * 3);
              
          	 	}else{
          	 		 sendMessage($peer_id, $user_id, "Вы проиграли, выпала Бумага&#128577;");
               reduceMoney($user_id,str_replace("к","000",$message[2]));
           
                 }
               }elseif($message[1] == "бумага"){
              if($knb == "камень"){
          	 	  $win = str_replace("к","000",$message[2]) * 3;
          	 	  sendMessage($peer_id, $user_id, "Вы выиграли, выпал Камень \nВаш выигрыш составляет ".convertValute($win)."₽ &#129297;");
          	 	  addMoney($user_id,str_replace("к","000",$message[2]) * 3);
          	 	}else{
          	 		 sendMessage($peer_id, $user_id, "Вы проиграли, выпали Ножницы&#128577;");
               reduceMoney($user_id,str_replace("к","000",$message[2]));
                 }
          	 	  }


//чи или не чи

         }elseif($message[0] == "реферал"){
   sendMessage($peer_id, $user_id, "Реферальная система\nХотите получить доход с каждого приглашенного друга?\nДля этого ваш друг должен ввести «реф ".$user_id."»\nВаш друг получит 300.000.000₽, вы же получите 150.000.000₽&#9786; \n\nПриглашено: ".$data['inv']);

   }elseif($message[0] == "реф"){
   if(!empty($message[1])){
     if($data['ref'] == 0){
       if(file_exists('users/vk/'.$message[1])){
         if($message[1] != $user_id){
     	     sendMessage($peer_id, $user_id, "Вы успешно ввели реферальный код! + 300.000.000₽");

     	     addInv($message[1]);
             
     	     unset($data['ref']);
     	     $data['ref'] = 1;
     	     @file_put_contents('users/vk/'.$user_id,serialize($data));
           $m = (int) $message[1];
           addMoney($m,150000000);
           addMoney($user_id,300000000);
       	 }else{
     	 	  sendMessage($peer_id, $user_id, "Ты не можешь ввести собственный ред оральный код");
     	 }
     	 }else{
     	 	  sendMessage($peer_id, $user_id, "Такого игрока не существует");
     	 }
     }else{
       sendMessage($peer_id, $user_id, "Вы уже вводили реферальный код");
       }
    }
  }elseif($message[0] == "курс"){
    sendMessage($peer_id, $user_id, "Курс биткоина: ".convertValute(getBtc())."₽ &#128267;");

     }elseif($message[0] == "биткоин"){
      	$count = str_replace("к","000",$message[1]);
      	$cost = getBtc();        
            if($count > 0){
             $ggg = $count * $cost; 
              if($ggg > $data['balance']){
                sendMessage($peer_id, $user_id, "У вас нет столько денег&#128542;\n&#128181; Баланс: ".getMoney($user_id)."₽");
              }else{
             reduceMoney($user_id, $count * $cost);
             sendMessage($peer_id,$user_id,"Вы успешно приобрели ".convertValute($count)."Ƀ &#128267;");
            addBtc($user_id, $count);
          }
            }else{
        sendMessage($peer_id, $user_id, "Укажите количество больше 1Ƀ &#128559;");
            }

       }elseif($message[0] == "продать"){
	switch($message[1]){
		case "биткоины":
		$btc = $data['btc'];
		$kurs = getBtc();
		if($btc > 0){
			if(empty($message[2])){
				$cost = $btc * $kurs;
				addMoney($user_id,$cost);
				sendMessage($peer_id, $user_id, "Вы успешно продали ".convertValute($btc)."Ƀ за ".convertValute($cost)."₽ &#128267;\n&#128176;Баланс: ".getMoney($user_id)."₽");
            reduceBtc($user_id,$btc);
			}elseif($btc >= str_replace("к","000",$message[2])){
           $count = str_replace("к","000",$message[2]);
				$count = (int)$count;
				$cost = $count * $kurs;
				addMoney($user_id,$cost);
				sendMessage($peer_id, $user_id, "Вы успешно продали ".convertValute($count)."Ƀ за ".convertValute($cost)."₽ &#128267;\nБаланс: ".getMoney($user_id)."₽");
				reduceBtc($user_id,$count);
			}else{
				sendMessage($peer_id, $user_id, "У вас нет столько биткоинов&#128267;");
			}
		 }else{
		 	 sendMessage($peer_id, $user_id, "У вас нет биткоинов для продажи&#128267;");
		 }
      break; 
       case "бриллианты":
      $btc = $data['rating'];
		if($btc > 0){
			if(empty($message[2])){
				$cost = $btc * 100000000 / 2;
            $data['rating'] = 0;
            $data['balance'] = $data['balance'] + $cost; 
				@file_put_contents('users/vk/'.$user_id, serialize($data)); 
				sendMessage($peer_id, $user_id, "Вы успешно продали ".convertValute($btc)."&#128142; за ".convertValute($cost)."₽\n&#128176;Баланс: ".getMoney($user_id)."₽");
			}elseif($btc >= str_replace("к","000",$message[2])){
           $count = str_replace("к","000",$message[2]);
				$count = (int)$count;
				$cost = $count * 100000000 / 2;
            $data['rating'] = $data['rating'] - $count;
            $data['balance'] = $data['balance'] + $cost; 
				@file_put_contents('users/vk/'.$user_id,serialize($data)); 
				sendMessage($peer_id, $user_id, "Вы успешно продали ".convertValute($count)."&#128142; за ".convertValute($cost)."₽\n&#128176;Баланс: ".getMoney($user_id)."₽");
				reduceBtc($user_id,$count);
			}else{
				sendMessage($peer_id, $user_id, "У вас нет столько бриллиантов&#128142;");
			}
		 }else{
		 	 sendMessage($peer_id, $user_id, "У вас нет бриллиантов для продажи&#128142;");
		 }
      break; 
		}

	}elseif($message[0] == "фермы"){
	if(!empty($message[1])){
		$numb = $message[1];
		if($numb > 0 and $numb < 4){
			switch($numb){
				case "1":
				if(empty($message[2])){
						if($data['ferm3'] < 1000){
          if($data['balance'] >= 30000000){
				  if($data['ferm'] == "ExtrimMining"){
				  	  sendMessage($peer_id,$user_id,"Вы успешно приобрели ExtrimMining за 30.000.000₽");
				  	 $data['ferm3'] = $data['ferm3'] + 1;
					 $data['ferm'] = "ExtrimMining";
                $data['ferm2'] = time();
                $data['balance'] = $data['balance'] - 30000000;
					@file_put_contents('users/vk/'.$user_id,serialize($data));
              }elseif($data['ferm'] == "0"){
               sendMessage($peer_id,$user_id,"Вы успешно приобрели ExtrimMining за 30.000.000₽");
				  	 $data['ferm3'] = $data['ferm3'] + 1;
					 $data['ferm'] = "ExtrimMining";
                  $data['ferm2'] = time();
                $data['balance'] = $data['balance'] - 30000000;
					@file_put_contents('users/vk/'.$user_id,serialize($data));
  	}else{
				  		sendMessage($peer_id,$user_id,"У вас уже имеется ".$data['ferm']);
				  	}
				  	  }else{
								sendMessage($peer_id,$user_id,"У вас нет столько денег");
				  	  }
				  	 }else{
				  	 	sendMessage($peer_id,$user_id,"Вы достигли лимита");
				  	 }
					}else{
						if($message[2] != 0){
							$count = (int)$message[2];
							if($count > 0){
								if($data['balance'] >= $count * 30000000){
                  if($data['ferm'] == "ExtrimMining"){
                  	if($data['ferm3'] + $count < 1000){
							  sendMessage($peer_id,$user_id,"Вы успешно приобрели ExtrimMining(х".$count.") за ".convertValute($count * 300000000)."₽");
							  
							  $data['ferm3'] = $data['ferm3'] + $count;
							  $data['ferm'] = "ExtrimMining";
							  $data['ferm2'] = time();
                      $data['balance']  = $data['balance'] - 300000000 * $count;
							  @file_put_contents('users/vk/'.$user_id,serialize($data));
							   }else{
				  	 	sendMessage($peer_id,$user_id,"Вы не можете купить столько ферм из-за лимита");
				  	 }
              }elseif($data['ferm'] == 0){
              	if($data['ferm3'] + $count < 1000){
               sendMessage($peer_id,$user_id,"Вы успешно приобрели ExtrimMining(х".$count.") за ".convertValute($count * 300000000)."₽");
							  $data['ferm3'] = $data['ferm3'] + $count;
							  $data['ferm'] = "ExtrimMining";
							  $data['ferm2'] = time();
                      $data['balance']  = $data['balance'] - 300000000 * $count;
							  @file_put_contents('users/vk/'.$user_id,serialize($data));
							   }else{
				  	 	sendMessage($peer_id,$user_id,"Вы не можете купить столько ферм из-за лимита");
				  	 }
 	}else{
				  		sendMessage($peer_id,$user_id,"У вас уже имеется ".$data['ferm']);
				  	}
							  }else{
								sendMessage($peer_id,$user_id,"У вас нет столько денег");
				  	  }
							}else{
								sendMessage($peer_id,$user_id,"Укажите количество больше нуля");
							}
						}else{
								sendMessage($peer_id,$user_id,"Укажите количество больше нуля");
						}
					}
					break;

					case "2":
				if(empty($message[2])){
						if($data['ferm3'] < 1000){
          if($data['balance'] >= 120000000){
				  if($data['ferm'] == "FurryBTC"){
				  	  sendMessage($peer_id,$user_id,"Вы успешно приобрели FurryBTC за 120.000.000₽");
				  	 $data['ferm3'] = $data['ferm3'] + 1;
					 $data['ferm'] = "FurryBTC";
               $data['ferm2'] = time();
                $data['balance'] = $data['balance'] - 120000000;
					@file_put_contents('users/vk/'.$user_id,serialize($data));
              }elseif($data['ferm'] == "0"){
               sendMessage($peer_id,$user_id,"Вы успешно приобрели FurryBTC за 120.000.000₽");
				  	 $data['ferm3'] = $data['ferm3'] + 1;
					 $data['ferm'] = "FurryBTC";
              $data['ferm2'] = time();
                $data['balance'] = $data['balance'] - 30000000;
					@file_put_contents('users/vk/'.$user_id,serialize($data));
  	}else{
				  		sendMessage($peer_id,$user_id,"У вас уже имеется ".$data['ferm']);
				  	}
				  	  }else{
								sendMessage($peer_id,$user_id,"У вас нет столько денег");
				  	  }
				  	  }else{
				  	 	sendMessage($peer_id,$user_id,"Вы достигли лимита");
				  	 }
					}else{
						if($message[2] != 0){
							$count = (int)$message[2];
							if($count > 0){
								if($data['balance'] >= $count * 120000000){
                  if($data['ferm'] == "ExtrimMining"){
                  	if($data['ferm3'] + $count < 1000){
							  sendMessage($peer_id,$user_id,"Вы успешно приобрели FurryBTC(х".$count.") за ".convertValute($count * 1200000000)."₽");
							  $data['ferm3'] = $data['ferm3'] + $count;
							  $data['ferm'] = "FurryBTC";
							  $data['ferm2'] = time();
                      $data['balance']  = $data['balance'] - 1200000000 * $count;
							  @file_put_contents('users/vk/'.$user_id,serialize($data));
							   }else{
				  	 	sendMessage($peer_id,$user_id,"Вы не можете купить столько ферм из-за лимита");
				  	 }
              }elseif($data['ferm'] == 0){
              	if($data['ferm3'] + $count < 1000){
               sendMessage($peer_id,$user_id,"Вы успешно приобрели FurryBTC(х".$count.") за ".convertValute($count * 1200000000)."₽");
							  $data['ferm3'] = $data['ferm3'] + $count;
							  $data['ferm'] = "FurryBTC";
							  $data['ferm2'] = time();
                      $data['balance']  = $data['balance'] - 1200000000 * $count;
							  @file_put_contents('users/vk/'.$user_id,serialize($data));
							   }else{
				  	 	sendMessage($peer_id,$user_id,"Вы не можете купить столько ферм из-за лимита");
				  	 }
 	}else{
				  		sendMessage($peer_id,$user_id,"У вас уже имеется ".$data['ferm']);
				  	}
							  }else{
								sendMessage($peer_id,$user_id,"У вас нет столько денег");
				  	  }
							}else{
								sendMessage($peer_id,$user_id,"Укажите количество больше нуля");
							}
						}else{
								sendMessage($peer_id,$user_id,"Укажите количество больше нуля");
						}
					}
					break;

					case "3":
				if(empty($message[2])){
						if($data['ferm3'] < 1000){
          if($data['balance'] >= 500000000){
				  if($data['ferm'] == "GenisisMining"){
				  	  sendMessage($peer_id,$user_id,"Вы успешно приобрели ExtrimMining за 500.000.000₽");
				  	 $data['ferm3'] = $data['ferm3'] + 1;
					 $data['ferm'] = "GenisisMining";
                 $data['ferm2'] = time();
                $data['balance'] = $data['balance'] - 500000000;
					@file_put_contents('users/vk/'.$user_id,serialize($data));
              }elseif($data['ferm'] == "0"){
               sendMessage($peer_id,$user_id,"Вы успешно приобрели GenisisMining за 500.000.000₽");
				  	 $data['ferm3'] = $data['ferm3'] + 1;
					 $data['ferm'] = "GenisisMining";
                 $data['ferm2'] = time();
                $data['balance'] = $data['balance'] - 500000000;
					@file_put_contents('users/vk/'.$user_id,serialize($data));
  	}else{
				  		sendMessage($peer_id,$user_id,"У вас уже имеется ".$data['ferm']);
				  	}
				  	  }else{
								sendMessage($peer_id,$user_id,"У вас нет столько денег");
				  	  }
				  	  }else{
				  	 	sendMessage($peer_id,$user_id,"Вы достигли лимита");
				  	 }
					}else{
						if($message[2] != 0){
							$count = (int)$message[2];
							if($count > 0){
								if($data['balance'] >= $count * 30000000){
                  if($data['ferm'] == "ExtrimMining"){
                  		if($data['ferm3'] + $count < 1000){
							  sendMessage($peer_id,$user_id,"Вы успешно приобрели GenisisMining(х".$count.") за ".convertValute($count * 500000000)."₽");
							  $data['ferm3'] = $data['ferm3'] + $count;
							  $data['ferm'] = "ExtrimMining";
							  $data['ferm2'] = time(); 
                      $data['balance']  = $data['balance'] - 5000000000 * $count;
							  @file_put_contents('users/vk/'.$user_id,serialize($data));
							  }else{
				  	 	sendMessage($peer_id,$user_id,"Вы не можете купить столько ферм из-за лимита");
				  	 }
              }elseif($data['ferm'] == 0){
              	if($data['ferm3'] + $count < 1000){
               sendMessage($peer_id,$user_id,"Вы успешно приобрели GenisisMining(х".$count.") за ".convertValute($count * 500000000)."₽");
							  $data['ferm3'] = $data['ferm3'] + $count;
							  $data['ferm'] = "ExtrimMining";
							  $data['ferm2'] = time(); 
                      $data['balance']  = $data['balance'] - 5000000000 * $count;
							  @file_put_contents('users/vk/'.$user_id,serialize($data));
							   }else{
				  	 	sendMessage($peer_id,$user_id,"Вы не можете купить столько ферм из-за лимита");
				  	 }
 	}else{
				  		sendMessage($peer_id,$user_id,"У вас уже имеется ".$data['ferm']);
				  	}
							  }else{
								sendMessage($peer_id,$user_id,"У вас нет столько денег");
				  	  }
							}else{
								sendMessage($peer_id,$user_id,"Укажите количество больше нуля");
							}
						}else{
								sendMessage($peer_id,$user_id,"Укажите количество больше нуля");
					}
					break;				
      }
}
}
}else{
			sendMessage($peer_id,$user_id,"Фермы: \n\n&#12288;&#128434;1. ExtrimMining(30.000.000₽) - 10Ƀ в час \n&#12288;&#128434;2. FurryBTC(120.000.000₽) - 50Ƀ в час \n&#12288;&#128434;3. GenisisMining(500.000.000₽) - 100Ƀ в час\n\nДля покупки введите «Фермы номер фермы»&#128434;");
}
	
	}elseif($message[0] == "ферма"){
	if(!$data['ferm'] == 0){
       switch($data['ferm']){
		 case "ExtrimMining":
       $f = time() - $data['ferm2'];
       if($f > 3599){
         $count = $data['ferm3'];
         $ost = $f / 3600;
         $ost = (int) $ost; 
		   $accept = 10 * $ost;
		   $accept = $accept * $count;
           sendMessage($peer_id,$user_id,"Вы успешно собрали ".convertValute($accept)."Ƀ со своих ферм &#128267;");
        $data['ferm2'] = time() + 3600*$ost;
		 	$data['btc'] = $data['btc'] + $accept;
		 	@file_put_contents('users/vk/'.$user_id,serialize($data));
	 }else{
	 	sendMessage($peer_id,$user_id,"Биткоины появятся через ".date("i:s",$data['ferm2'] - time())."&#128267;");
	 }
       break; 
        case "FurryBTC":
       $f = time() - $data['ferm2'];
       if($f > 3599){
         $count = $data['ferm3'];
         $ost = $f / 3600;
         $ost = (int) $ost; 
		   $accept = 50 * $ost;
		   $accept = $accept * $count;
           sendMessage($peer_id,$user_id,"Вы успешно собрали ".convertValute($accept)."Ƀ со своих ферм &#128267;");
        $data['ferm2'] = time() + 3600*$ost;
		 	$data['btc'] = $data['btc'] + $accept;
		 	@file_put_contents('users/vk/'.$user_id,serialize($data));
	 }else{
	 	sendMessage($peer_id,$user_id,"Биткоины появятся через ".date("i:s",$data['ferm2'] - time())." &#128267;");
	 }
      break; 
       case "GenisisMining":
       $f = time() - $data['ferm2'];
       if($f > 3599){
         $count = $data['ferm3'];
         $ost = $f / 3600;
         $ost = (int) $ost; 
		   $accept = 100 * $ost;
		   $accept = $accept * $count;
           sendMessage($peer_id,$user_id,"Вы успешно собрали ".convertValute($accept)."Ƀ со своих ферм&#128267;");
        $data['ferm2'] = time() + 3600 * $ost; 
		 	$data['btc'] = $data['btc'] + $accept;
		 	@file_put_contents('users/vk/'.$user_id,serialize($data));
	 }else{
	 	sendMessage($peer_id,$user_id,"Биткоины появятся через ".date("i:s",$data['ferm2'] - time())." &#128267;");
	 }
break; 
}
 }else{
 	sendMessage($peer_id,$user_id,"У вас нет ферм&#128528;");
 }

}elseif($message[0] == "бриллианты"){
	$count = $message[1];
	$count = str_replace("к","000",$count);
	if(empty($count)){
		sendMessage($peer_id,$user_id,"Стоимость одного бриллианта - 100.000.000₽ &#128142;");
	}elseif($count > 0){
		if($data['balance'] >= $count * 100000000){
		  sendMessage($peer_id,$user_id,"Вы успешно приобрели рейтинг(&#128142;".$count.") за ".convertValute($count * 100000000)."₽");
		  $data['rating'] = $data['rating'] + $count;
     $data['balance']  = $data['balance'] - 100000000 * $count;
			 @file_put_contents('users/vk/'.$user_id,serialize($data));
		}else{
			sendMessage($peer_id,$user_id,"У вас нет столько денег&#128528;");
		}
	}

}elseif($message[0] == "трейд"){
	$success = rand(1,2);
	$stavka = $message[2];
	$stavka = str_replace("к","000",$stavka);
	$stavka = str_replace("все",$data['balance'],$stavka);
   $stavka = str_replace("всё",$data['balance'],$stavka);
	if($stavka > 0){
		if($stavka <= $data['balance']){
	   if($message[1] == "вверх"){
	   switch($success){
	   	case "1":
	   	sendMessage($peer_id,$user_id,"Курс подорожал&#128200; на ".rand(20,45)."₽\n&#128202;Вы заработали ".convertValute($stavka*2)."₽");
	   	addMoney($user_id,$stavka * 2);
	   	break;
	   	case "2":
	   	sendMessage($peer_id,$user_id,"Курс подешевел&#128201; на ".rand(20,45)."₽\n&#128202;Вы потеряли ".convertValute($stavka)."₽");
	   	reduceMoney($user_id,$stavka);
	   	break;
	   }
	  }elseif($message[1] == "вниз"){
	  	switch($success){
	   	case "1":
	   	sendMessage($peer_id,$user_id,"Курс подешевел&#128201; на ".rand(20,45)."₽\n&#128202;Вы заработали ".convertValute($stavka*2)."₽");
	   	addMoney($user_id,$stavka * 2);
	   	break;
	   	case "2":
	   	sendMessage($peer_id,$user_id,"Курс подорожал &#128200; на ".rand(20,45)."₽\n&#128202;Вы потеряли ".convertValute($stavka)."₽");
	   	reduceMoney($user_id,$stavka);
	   	break;
	   }
	  }
  }else{
  	sendMessage($peer_id,$user_id,"У вас нет столько денег&#128528;\n&#128176;Ваш баланс: ".convertValute($data['balance'])."₽");
  }
 }else{
  	sendMessage($peer_id,$user_id,"Введите ставку больше нуля&#128521;");
 }



}elseif($message[0] == "бизнесы"){
          	if(empty($message[1])){
          	 sendMessage($peer_id, $user_id, "Бизнесы:\n\n&#12288;&#128187;1. СексРабство - 150.000₽
            \n\nДля покупки введите «Бизнесы номер бизнеса»
          	 ");
          	 
          }elseif($message[1] <  2 and $message[1] > 0) {
          	$array = ["1" => array("name" =>"СексРабство", "cost" => 150000,"dohod" => 1500)];
          	$c = (String) $message[1];
          	if($data['biznesName'] == "0"){
          		if($array[$c]['cost'] <= $data['balance']){
          			sendMessage($peer_id,$user_id,"Вы успешно приобрели ".$array[$c]["name"]."&#128187;");
          			unset($data['biznesName']);
          			unset($data['biznesMoney']);
          			unset($data['biznesTime']);
          			unset($data['biznesLevel']);
          			unset($data['biznesBalance']);
          			unset($data['biznesMax']);
          			unset($data['biznesCount']);
          			$data['biznesName'] = $array[$c]["name"];
          			$data['biznesLevel'] = 1;
          			$data['biznesTime'] = time();
          			$data['biznesBalance'] = 0;
          			$data['biznesMoney'] = $array[$c]["dohod"];
          			$data['biznesCount'] = 0;
          			$data['biznesMax'] = 20;
          			@file_put_contents('users/vk/'.$user_id,serialize($data));
          			reduceMoney($user_id,$array[$c]["cost"]);
          		}else{
               sendMessage($peer_id,$user_id,"У вас нет столько денег");
             }
            }else{
              sendMessage($peer_id,$user_id,"У вас уже есть ".$data['biznesName']);
            }
          }

        }elseif($message[0] == "бизнес"){
	if(!$data['biznesName'] == "0"){
      $f = time() - $data['biznesTime'];

       if($f > 3599){
         $dohod = $data['biznesMoney'];
         $ost = $f / 3600;
         $ost = (int) $ost;
		   $accept = $ost * $dohod;
        $data['biznesTime'] = time();
		  $data['biznesBalance'] = $data['biznesBalance'] + $accept;
         
		 	@file_put_contents('users/vk/'.$user_id,serialize($data));
         }


		sendMessage($peer_id,$user_id,"статистика «".$data['biznesName']."»\n\n&#127975; Прибыль: ".convertValute($data['biznesMoney'])."₽/час\n&#128176; На счёте: ".convertValute($data['biznesBalance'])."₽\n&#128372; Сотрудников: ".$data['biznesCount']."/".$data['biznesMax']."\n\n&#10071;Убедитесь, что у вас работает максимальное количество сотрудников. Чем больше сотрудников, тем больше ваша прибыль");
	}else{
		sendMessage($peer_id,$user_id,"У вас нет бизнеса");
	}

}elseif($message[0] == "топ"){
  $object = getTopRating();
  $message = "Топ игроков&#128142;";
  for($i=0;$i<11;$i++){
    $message = $message."\n".$object[$i];
  }
      sendMessage($peer_id,$user_id,$message);

}elseif($message[0] == "работать"){
	sendMessage($peer_id,$user_id,"добывать железо (0 опыта) \nдобывать золото (500 опыта) \nдобывать алмазы (1000 опыта)");
}

            }else{
              createAcc($peer_id, $user_id); 
}
}
              echo "ok";
        }
  }
?>