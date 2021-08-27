<?php
session_start();
include "scripts/check.php"; // Проверка авторизации и аналитика
include "scripts/MySQL.php";

$SQL = new MySQL;

$advert_text = $SQL->get_from_user_db($_SESSION['vk_uid'], $_SESSION['group_id'], "%Рекламный текст%");
$advert_frequency = $SQL->get_from_user_db($_SESSION['vk_uid'], $_SESSION['group_id'], "%Частота повторов рекламы%");
$advert_first = $SQL->get_from_user_db($_SESSION['vk_uid'], $_SESSION['group_id'], "%Первая реклама%");
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

    <title>BotInc.ru | Настройка Рекламы</title>

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
                            <h2>Настройка Рекламы</h2>
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
                                Здесь можно разместить рекламный тест, который будет показываться пользователям.
                                Сообщения отправляются с настроенным текстом раз в N сообщений для уникального
                                пользователя. <br><b>Не забудьте поставить галочку в управлении ботом</b>.
                            </p>
                            <br>
                            <form class="form-horizontal form-label-left" action="scripts/advert/advert.php"
                                  method="POST" novalidate>

                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Рекламный текст
                                        <span class="required"></span></label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input value="<?php echo $advert_text["output"]; ?>"
                                               class="form-control col-md-7 col-xs-12" data-validate-length-range="6"
                                               data-validate-words="2" name="advert_text"
                                               placeholder="А Вы знали, что на BotInc.ru можно бесплатно сделать бота?"
                                               required="required" type="text">
                                    </div>
                                </div>
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Частота повторов
                                        <span class="required"></span></label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input value="<?php echo $advert_frequency["output"]; ?>"
                                               class="form-control col-md-7 col-xs-12" data-validate-length-range="6"
                                               data-validate-words="2" name="advert_frequency" placeholder="100"
                                               required="required" type="text">
                                    </div>
                                </div>
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Первая реклама
                                        <span class="required"></span></label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input value="<?php echo $advert_first["output"]; ?>"
                                               class="form-control col-md-7 col-xs-12" data-validate-length-range="6"
                                               data-validate-words="2" name="advert_first" placeholder="15"
                                               required="required" type="text">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-6 col-md-offset-3">
                                        <button type="submit" class="btn btn-success">Сохранить</button>
                                    </div>
                                </div>
                            </form>
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

</body>

</html>
