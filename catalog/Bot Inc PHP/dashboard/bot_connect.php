<?php
session_start();
include "scripts/check.php"; // Проверка авторизации

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon">

    <title>BotInc.ru | Подключение сообществ</title>

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
                            <h2>Подключение сообществ</h2>
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
                            <!-- Smart Wizard -->
                            <div id="wizard" class="form_wizard wizard_horizontal">
                                <ul class="wizard_steps">
                                    <li>
                                        <a href="#step-1">
                                            <span class="step_no">1</span>
                                            <span class="step_descr">
													Шаг 1<br/>
													<small>Включение сообщений</small>
												</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#step-2">
                                            <span class="step_no">2</span>
                                            <span class="step_descr">
												   Шаг 2<br/>
													<small> Получение Access Token</small>
												</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#step-3">
                                            <span class="step_no">3</span>
                                            <span class="step_descr">
													Шаг 3<br/>
													<small>Настройка Callback API</small>
												</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#step-4">
                                            <span class="step_no">4</span>
                                            <span class="step_descr">
													Шаг 4<br/>
													<small>Завершение</small>
												</span>
                                        </a>
                                    </li>

                                </ul>

                                <div id="step-1">
                                    <br>
                                    <p> Перейдите в "Управление сообществом", в сообществе, где необходимо установить
                                        бота. Перейдите во вкладку "Сообщения", включить их и сохраните настройки. </p>
                                    <p> Перейдите во вкладку "Сообщения", включить их и сохраните настройки. </p>
                                    <p> Чтобы подключить несколько сообществ, повторите эту же процедуру с другим
                                        сообществом. </p>
                                </div>

                                <div id="step-2">
                                    <br>
                                    <p> Перейдите в "Настройки" -> "Работа с API", нажмите "Создать ключ", отметьте все
                                        пункты, нажмите кнопку "Создать".</p>
                                    <p> Скопируйте ключ и вставьте, нажмите "Ок". </p>
                                    <br>

                                    <div class="form-group">

                                        <label class="control-label col-xs-12">Access Token: </label>
                                        <div class="input-group">

                                            <input type="text" id="access_token" class="form-control">
                                            <span class="input-group-btn">
										   <button type="button" OnClick="Validate_token();"
                                                   class="btn btn-primary">Ок</button>
									   </span>
                                        </div>
                                    </div>
                                    <p>&nbsp;</p>

                                </div>

                                <div id="step-3">
                                    <br>
                                    <p> Перейдите в "Работа с API" -> "Callback API"</p>
                                    <p> Скопируйте строку, которую должен ввести сервер и вставьте, нажмите "Ок"</p>
                                    <br>
                                    <div class="form-group">

                                        <label class="control-label col-xs-12">Строка: </label>
                                        <div class="input-group">

                                            <input type="text" id="server_str" class="form-control">
                                            <span class="input-group-btn">
										   <button type="button" OnClick="Validate_callback();" class="btn btn-primary">Ок</button>
									   </span>
                                        </div>
                                    </div>
                                    <p>&nbsp;</p>
                                </div>

                                <div id="step-4">
                                    <br>
                                    <p>Перейдите в "Callback API" -> "Типы событий" и поставьте галочки напротив
                                        "Входящее сообщение", "Вступление в сообщество", "Выход из сообщества".</p>
                                    <p>В настройках "Callback API" установите "Секретный ключ": <code id="uniqid"></code> и нажмите "Сохранить".</p>
                                    <p>Введите в настройках "Callback API" адрес сервера: <code>https://botinc.ru/callback/index.php</code>
                                        и нажмите "Подтвердить".</p>
                                </div>

                            </div>
                            <!-- End SmartWizard Content -->

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
<!-- form wizard -->
<script type="text/javascript" src="js/wizard/jquery.smartWizard.js"></script>
<!-- pace -->
<script src="js/pace/pace.min.js"></script>

<!-- PNotify -->
<script type="text/javascript" src="js/notify/pnotify.core.js"></script>
<script type="text/javascript" src="js/notify/pnotify.buttons.js"></script>
<script type="text/javascript" src="js/notify/pnotify.nonblock.js"></script>

<script type="text/javascript">

    $(document).ready(function () {

        window.check2 = false;
        window.error2 = "Введите токен";

        window.check3 = false;
        window.error3 = "Введите строку, которую должен ввести сервер";

        // Smart Wizard
        $('#wizard').smartWizard({
            onLeaveStep: leaveAStepCallback,
            onFinish: onFinishCallback
        });

        function onFinishCallback(objs, context) {
            if (validateAllSteps()) {
                new PNotify({
                    title: 'Отлично',
                    text: 'Можно перейти в управление ботом',
                    type: 'success',
                    hide: true
                });
            }
        }

        function leaveAStepCallback(obj, context) {
            return validateSteps(context.fromStep); // return false to stay on step and true to continue navigation
        }


        function validateSteps(stepnumber) {

            if (stepnumber == 1) {
                return true;
            }
            if (stepnumber == 2) {

                if (!window.check2) {
                    new PNotify({
                        title: 'Ошибка',
                        text: window.error2,
                        type: 'error',
                        hide: true
                    });
                }
                return window.check2;
            }
            if (stepnumber == 3) {

                if (!window.check3) {
                    new PNotify({
                        title: 'Ошибка',
                        text: window.error3,
                        type: 'error',
                        hide: true
                    });
                }
                return window.check3;
            }

            if (stepnumber == 4) {
                return true;
            }
        }

        function validateAllSteps() {
            return true;
        }

        function showWizardMessage() {
            $('#wizard').smartWizard('showMessage');
        }
    });

    function Validate_token() {
        $.ajax({
            type: 'post',
            url: '/scripts/bot_connect/bot_connect.php',
            data: {'step': 2, 'access_token': $("#access_token").val()},
            response: 'text',
            success: function () {
                new PNotify({
                    title: 'Отлично',
                    text: 'Нажмите "Дальше"',
                    type: 'success',
                    hide: true
                });
                window.check2 = true;
            },
            error: function (data) {

                window.error2 = JSON.parse(data.responseText).error;
                window.check2 = false;

                new PNotify({
                    title: 'Ошибка',
                    text: window.error2,
                    type: 'error',
                    hide: true
                });
            }
        });
    }

    function Validate_callback() {
        $.ajax({
            type: 'post',
            url: '/scripts/bot_connect/bot_connect.php',
            data: {'step': 3, 'server_str': $("#server_str").val()},
            response: 'text',
            success: function (data) {
                new PNotify({
                    title: 'Отлично',
                    text: 'Нажмите "Дальше"',
                    type: 'success',
                    hide: true
                });
                window.check3 = true;
                $('#uniqid').html(data);
            },
            error: function (data) {
                window.error3 = JSON.parse(data.responseText).error;
                window.check3 = false;

                new PNotify({
                    title: 'Ошибка',
                    text: window.error3,
                    type: 'error',
                    hide: true
                });
            }
        });
    }
</script>

</body>

</html>
