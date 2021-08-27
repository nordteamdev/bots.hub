<?php
session_start();
include "scripts/check.php"; // Проверка авторизации и аналитика
include "scripts/MySQL.php";
include "scripts/VkApi.php";

$SQL = new MySQL;
$Vk = new VkApi;

$my_info = $SQL->get_user_info($_SESSION['vk_uid'], $_SESSION['group_id']);
$Vk->access_token = $my_info["access_token"];

if ($Vk->access_token != "") {
	$max_messages_count = $Vk->messages_getDialogs(1);
	$max_messages_count = $max_messages_count->response->count;
}
else
	$max_messages_count = 0;
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon">

    <title>BotInc.ru | Настройка Antigete</title>

    <!-- Bootstrap core CSS -->

    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="fonts/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">

    <!-- Custom styling plus plugins -->
    <link href="css/custom.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/maps/jquery-jvectormap-2.0.3.css"/>
    <link href="css/icheck/flat/green.css" rel="stylesheet"/>
    <link href="css/floatexamples.css" rel="stylesheet" type="text/css"/>

    <script src="js/jquery.min.js"></script>
    <script src="js/nprogress.js"></script>

	<?php include "scripts/analytics.php"; ?>
</head>


<body class="nav-md">

<div class="container body">


    <div class="main_container">
        <div class="col-md-3 left_col">
            <div class="left_col scroll-view">
                <div align="center" class="navbar nav_title" style="border: 0;">
                    <a href="index.php" class="site_title"> <span>BotInc.ru</span></a>
                </div>
                <div class="clearfix"></div>

				<?php include "profile_info.php"; ?>

                <br/>

				<?php include "sidebar.php"; ?>

            </div>
        </div>

		<?php include "top_nav.php"; ?>


        <!-- page content -->
        <div class="right_col" role="main">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>Рассылка сообщений</h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                       aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                    <ul class="dropdown-menu" role="menu"></ul>
                                </li>
                                <li><a class="close-link"><i class="fa fa-close"></i></a></li>
                            </ul>

                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content">
                            <p>
                                Время рассылки зависит от длины сообщения. Самое оптимальное - прикреплять
                                картинки/видео и пр, будет наибольшая скорость.
                                Также сообщения до 6 символов имеют наивысшую продуктивность. </p>

                            <br>
                            <div class="col-sm-6 col-sm-offset-3">
                                <div class="form-horizontal form-label-left input_mask">

                                    <div class="col-xs-6 form-group has-feedback">
                                        <input type="text" class="form-control has-feedback-left" id="From"
                                               placeholder="0">
                                        <span class="form-control-feedback left" aria-hidden="true"><b>От</b></span>
                                    </div>

                                    <div class="col-xs-6 form-group has-feedback">
                                        <input type="text" class="form-control has-feedback-left" id="To"
                                               placeholder="<?php echo $max_messages_count; ?>">
                                        <span class="form-control-feedback left" aria-hidden="true"><b>До</b></span>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-xs-12">
                                            <textarea id="Message_text" class="form-control " rows="3"
                                                      placeholder='Текст'></textarea>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="progress">
                                        <div id="progress-bar" class="progress-bar bg-green" role="progressbar"
                                             data-transitiongoal="0"></div>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-xs-9 col-md-offset-5">
                                            <button id="Btn_Send" class="btn btn-primary"> Начать</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

            </div>
            <br/>

            <!-- footer content -->
			<?php include "footer.php"; ?>
            <!-- /footer content -->
        </div>
        <!-- /page content -->
    </div>

</div>

<div id="custom_notifications" class="custom-notifications dsp_none">
    <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
    </ul>
    <div class="clearfix"></div>
    <div id="notif-group" class="tabbed_notifications"></div>
</div>

<script src="js/bootstrap.min.js"></script>

<!-- bootstrap progress js -->
<script src="js/progressbar/bootstrap-progressbar.min.js"></script>
<script src="js/nicescroll/jquery.nicescroll.min.js"></script>
<!-- icheck -->
<script src="js/icheck/icheck.min.js"></script>

<script src="js/custom.js"></script>

<!-- pace -->
<script src="js/pace/pace.min.js"></script>

<!-- PNotify -->
<script type="text/javascript" src="js/notify/pnotify.core.js"></script>
<script type="text/javascript" src="js/notify/pnotify.buttons.js"></script>
<script type="text/javascript" src="js/notify/pnotify.nonblock.js"></script>

<script>
    Btn_Send.onclick = function () {
        $.ajax({
            type: 'post',
            url: '/scripts/message_sending/start.php',
            data: {
                'message': $("#Message_text").val(),
                'from': $("#From").val(),
                'to': $("#To").val(),
            },
            response: 'text',
            success: function (data) {
                new PNotify({
                    title: 'Отлично',
                    text: 'Рассылка началась!',
                    type: 'success',
                    hide: true
                });
            },
            error: function (data) {
                var jsonResponse = JSON.parse(data.responseText);
                new PNotify({
                    title: 'Ошибка',
                    text: jsonResponse.error,
                    type: 'error',
                    hide: true
                });
            }
        });
    };

    var timer = setInterval(function () {

        $.ajax({
            type: 'post',
            url: '/scripts/message_sending/get_status.php',
            response: 'text',
            success: function (data) {

                $("#progress-bar").removeClass("bg-orange");
                if (data == "100") {
                    clearInterval(timer);
                    $("#progress-bar").css("width", "100%");
                    $("#progress-bar").html("Готово");

                    new PNotify({
                        title: 'Отлично',
                        text: 'Все сообщения успешно отправлены. Обновите страничку, чтобы воспользоваться рассылкой еще раз.',
                        type: 'success',
                        hide: false
                    });
                }
                else if (data == "null") {
                    $("#progress-bar").css("width", "0%");
                    $("#progress-bar").html("");
                }
                else if (data == 0) {
                    $("#progress-bar").css("width", "97%");
                    $("#progress-bar").addClass("bg-orange");
                    $("#progress-bar").html("Загрузка диалогов");
                }
                else {
                    $("#progress-bar").css("width", data + "%");
                    $("#progress-bar").html("Идет рассылка");
                }


            },
            error: function (data) {
                var jsonResponse = JSON.parse(data.responseText);
                new PNotify({
                    title: 'Ошибка',
                    text: jsonResponse.error,
                    type: 'error',
                    hide: true
                });
            }
        });
        
    }, 1000);

</script>
</body>

</html>
