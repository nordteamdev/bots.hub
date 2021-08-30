
 <?php
include('api.php');
if(isset($_POST['nick']) && isset($_POST['pid'])){
  $id = preg_replace('~[^0-9]+~','',$_POST['nick']);
  if(strlen($id) >= 1){
    if(isUser($id)){
      if(!isset($payErr)){
        $p = createPayment($_POST['nick'],$_POST['pid']);
        if($p['status'] != 'success'){
          $payErr = '<center><h4>Вы указали не верный ID</h4></center>';
        }
      }
    }else{
      $payErr = '<center><h4 class=color-bot>Вы указали не верный ID</h4></center>';
    }
  }else{
    $payErr = '<center><h4>Вы указали не верный ID</h4></center>';
  }
}
  if(!isset($payErr))
  header('Location: '.$p['response']);
 ?>

 <html lang=ru>

<head>
<meta charset="utf-8">
<title>Bot Meduza - покупка доната</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,shrink-to-fit=no,user-scalable=no,viewport-fit=cover">
<link rel="stylesheet" href="/template/main.css?v=1.58">
<link rel="shortcut icon" href="/template/images/banan.png" type="image/x-icon">
<link rel="apple-touch-icon" href="/meduza.ico?v=1.56" sizes="180x180">
<link rel="icon" href="/meduza.ico?v=1.56" sizes="32x32" type="image/jpeg">
<link rel="manifest" href="/manifest.json">
<link rel="mask-icon" href="/template/images/safari-pinned-tab.svg" color="#30324b">
<meta name="description" content="Лучший игровой бот во ВКонтакте!">
<meta name="keywords" content="бот вк, игровой бот, игровой бот вконтакте, вконтакте бот, бот вконтакте, игровые боты, бот банан, банан, bot banan, боты вконтакте, игровые боты, боты вк, banan bot">
<meta name=author content="© BOT MEDUZA Corporation (2019)"> 
<link rel=canonical href="index.php"> 
<meta property=og:url content=https://botmeduza.ru> 
<meta property=og:type content=website> 
<meta property=og:locale content=ru_RU> 
<meta property=og:title content="Bot Meduza - покупка доната"> 
<meta property=og:description content="Лучший игровой бот во ВКонтакте!"> 
<meta property="og:image" content="./meduza.ico" />

     <div class=container style=margin-top:18px>

         <div class="col-lg-offset-3 col-lg-6">
             <div class=panel style=margin-bottom:18px>
                 <div class="panel-header text-center">Покупка доната</div>
                 <div class=clearfix></div>
                 <form method="post">
                     <div class="container-fluid">
                         <div class=clearfix style=padding-top:18px></div>
                         <input type="text" name="nick" id="nick" class="form-control gray" placeholder="Ваш игровой ID" required="">
                         <div class=clearfix style=padding-top:18px></div>
                         <select class="form-control gray" id="pid" name="pid" required="" title="">
                         <option disabled="" selected="">
                                Выберите товар для покупки
                            </option>
                            <optgroup label="Весь ДОНАТ выдаётся НАВСЕГДА!">
                            </optgroup>
                           <?php foreach(getProducts() as $n => $d)
                           echo '<option value="'.$d['id'].'">'.$n.' — '.$d['price'].' рублей.</option>'; ?>
                         </select>
                    </div>
                     <div class=clearfix style=padding-top:18px></div>
                     <button type=submit class="btn btn-bot btn-block" id=pay><i class="fa fa-shopping-cart"></i> Перейти к оплате</button>
                 </form>
             </div>
         </div>
         </div>
             <div class=container style=margin-top:1px>

         <div class="col-lg-offset-3 col-lg-6">
             <div class=panel style=margin-bottom:1px>
             <script type=text/javascript src=https://vk.com/js/api/openapi.js?159></script>
             <div id=vk_groups></div></center>
             <script type=text/javascript>
                 VK.Widgets.Group("vk_groups", {
                     mode: 3,
                     no_cover: 1,
                     width: "auto"
                 }, 181406058);
             </script>
         </div>
                <div class=clearfix style=padding-top:18px></div>
         <center><div class="webmoney"><a href="//www.megastock.com" target="_blank">
            <img src="./template/images/88x31_wm_blue.png" alt="www.megastock.com" border="2"></a>
            <a href="//botmeduza.ru/?attestat" target="_blank">
                <img src="./template/images/v_blue_on_white_ru.png" alt="Здесь находится аттестат нашего WM идентификатора." border="0">
            </a>
        </div>
     <div class=clearfix></div>
     <div class=text-center style=margin-top:15px;margin-bottom:15px>
<div>Bot Meduza © 2019. Все права защищены.
    </div>
 <div><a data-toggle=modal data-target=#admin href="index.html#admin">Информация о любых покупках</a></div></center>
     </div>
     <div class="modal fade bd-example-modal-lg" id=admin tabindex=-1 role=dialog aria-labelledby=admin aria-hidden=true>
         <div class="modal-dialog modal-lg">
             <div class=modal-content>
                 <div class=modal-header>Информация о любых покупках
                     <button type=button class=close data-dismiss=modal aria-hidden=true>×</button>
                 </div>
     <div class=clearfix></div>
                     <h4 class=color-bot>⠀⠀ Донат</h4>
 <p>⠀⠀ 💲 Жертвуя любую сумму вы помогаете боту развиваться.</p>
 <p>⠀⠀ 🛒 Средства возврату НЕ ПОДЛЕЖАТ! </p>
 <p>⠀⠀ ✉ Любая покупка будет зачислена МГНОВЕННО!</p>
         </div>
         </div>
         </div>
         </div>
<script type="text/javascript" src="template/main.js"></script>
</body>
</html>


