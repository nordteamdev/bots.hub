
 <?php
include('api.php');
if(isset($_POST['nick']) && isset($_POST['pid'])){
  $id = preg_replace('~[^0-9]+~','',$_POST['nick']);
  if(strlen($id) >= 1){
    if(isUser($id)){
      if(!isset($payErr)){
        $p = createPayment($_POST['nick'],$_POST['pid']);
        if($p['status'] != 'success'){
          $payErr = '<br/><br/>Неизвестная ошибка. Повторите попытку';
        }
      }
    }else{
      $payErr = '<br/><br/>Пользователь с таким ID не найден.';
    }
  }else{
    $payErr = '<br/><br/>Введите ID';
  }
}
  if(!isset($payErr))
  header('Location: '.$p['response']);
 ?>

 <html lang=ru>

 <head>
     <meta charset=utf-8>
     <title>Купить донат TubeBot</title>
     <meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1">
     <meta name=viewport content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
     <link rel=stylesheet href="template/main.css">
     <meta name=description content="Лучший игровой бот во ВКонтакте!">
     <meta name=author content="Gorilla">
     <link rel=canonical href="index.html">
     <meta property=og:url content=https://gorillabot.ru>
     <meta property=og:type content=website>
     <meta property=og:locale content=ru_RU>
     <meta property=og:title content="Покупка доната TubeBot">
     <meta property=og:description content="Лучший игровой бот во ВКонтакте!">
     <meta property="og:image" content="https://gorillabot.ru/vk2.png" />
     <meta name=theme-color content=#3c3c4c>
     <meta name=msapplication-navbutton-color content=#3c3c4c>
     <meta name=apple-mobile-web-app-status-bar-style content=#3c3c4c>
 </head>

 <body>
     <div class=container style=margin-top:15px>

         <div class="col-lg-offset-3 col-lg-6">
             <div class="alert alert-danger text-center" style="margin:0;padding:10px;border-radius:3px 3px 0 0">Онлайн в боте: <?php echo getOnline(); ?></div>
             <div class=panel style=margin-bottom:15px>
                 <div class="panel-header text-center">Покупка доната</div>
                 <div class=clearfix></div>
                 <form method="post">
                     <div class="container-fluid">
                         <div class=clearfix style=padding-top:15px></div>
                         <input type="text" name="nick" id="nick" class="form-control gray" placeholder="Ваш игровой ID у бота" required="">
                         <div class=clearfix style=padding-top:15px></div>
                         <select class="form-control gray" id="pid" name="pid" required="" title="">
                           <?php foreach(getProducts() as $n => $d)
                           echo '<option value="'.$d['id'].'">'.$n.' - '.$d['price'].'Р</option>'; ?>
                         </select>
 					</div>
                     <div class=clearfix style=padding-top:15px></div>
                     <button type=submit class="btn btn-bot btn-block" id=pay><i class="fa fa-shopping-cart"></i> Перейти к оплате</button>
                     <?php echo isset($payErr) ? $payErr : ''; ?></div>
                 </form>
             </div>
         </div>
         <div class="col-lg-offset-3 col-lg-6">
             <script type=text/javascript src=https://vk.com/js/api/openapi.js?159></script>
             <div id=vk_groups></div>
             <script type=text/javascript>
                 VK.Widgets.Group("vk_groups", {
                     mode: 3,
                     no_cover: 1,
                     width: "auto"
                 }, 176187130);
             </script>
         </div>
     </div>
     <div class=clearfix></div>
     <div class=text-center style=margin-top:15px;margin-bottom:15px>
 <br>
 <div><a data-toggle=modal data-target=#admin href="index.html#admin">Описание доната</a></div>
     </div>
     <div class="modal fade bd-example-modal-lg" id=admin tabindex=-1 role=dialog aria-labelledby=admin aria-hidden=true>
         <div class="modal-dialog modal-lg">
             <div class=modal-content>
                 <div class=modal-header>Описание доната
                     <button type=button class=close data-dismiss=modal aria-hidden=true>×</button>
                 </div>
                 <div class=modal-body>
                     <h4 class=color-bot>Администратор НАВСЕГДА!</h4>
 <p>Выдача денег себе и другим игрокам.</p>
 <p>Возможность отвечать на репорты.</p>
 <p>Возможность бана/разбана игроков.</p>
 <p>Возможность сменить ник другому игроку.</p>
 <p>Возможность ставить длинный ник.</p>
 <p>Возможность менять названия имуществу из профиля.</p>
 <p>Возможность получить ссылку на случайную беседу.</p>
 <p>Возможность кикать людей из чужих бесед (если в беседе есть у бота администратор).</p>
 <p>Отключен лимит на количество ферм.</p>
 <p>Секретный пункт в имуществе.</p>
 <h4 class=color-bot>VIP статус НАВСЕГДА!</h4>
 <p>Увеличен шанс победы во всех играх.</p>
 <p>Увеличен лимит передачи другим игрокам.</p>
 <p>Увеличено максимальное количество денег в банке.</p>
 <p>Увеличено максимальное количество ферм.</p>
 <p>Увеличена максимальная энергия до 20.</p>
 <p>Нету уменьшения прибыли с бизнеса.</p>
 <p>Питомец больше не пропадёт в походе.</p>
 <p>Красивая отметка в профиле.</p>
 <p>Возможность установить длинный ник.</p>
                     <h4 class=color-bot>Межпланетный экспресс</h4>
 <p>Лучший игровой бизнес, прибыль: 150.000.000.000$/игровой валюты в час.</p>
                     <h4 class=color-bot>Игровая валюта</h4>
 <p>Игровые деньги - не имеют никакой привязки к реальным деньгам, не имеющие никакой реальной фактической стоимости и используются исключительно для использования в рамках игрового процесса.</p>
                 </div>
             </div>
         </div>
     </div>

     <script type=text/javascript src="template/main.js"></script>
 </body>
 </html>
