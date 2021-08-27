<?php
session_start();
include "scripts/check.php"; // Проверка авторизации

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

    <title>BotInc.ru | Документация</title>

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
                            <h2>Документация</h2>
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
                            <h2><b>Оглавление</b></h2>
                            <ul>
                                <li><a href="#bot_key">Бот для раздачи ключей</a></li>
                                <li><a href="#bot_gif">Гиф бот</a></li>
                            </ul>

                            <br>
                            <br>
                            <h2 id="bot_key"><b>Бот для раздачи ключей</b></h2>

                            <p>
                                В "Управлении ботом" необходимо включить функцию <code>Рандом с исключением</code>. <br>
                                <br>
                                <b>Настройки ограничений</b>
                            <table class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Сообщение</th>
                                    <th>Ограничение</th>
                                    <th>Время ограничения(мин)</th>
                                    <th>Текст при достижения ограничения</th>
                                </tr>
                                </thead>
                                <tbody id="TableData">
                                <tr>
                                    <td>n</td>
                                    <td>Дай ключ; скинь ключ</td>
                                    <td>1</td>
                                    <td>1440</td>
                                    <td>Сегодня вы уже использовали ключ!</td>
                                </tr>
                                </tbody>
                            </table>
                            Тут время ограничения 1 сутки (60*24)
                            <br>
                            <br>
                            <b>Пример базы</b>
                            <table class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Сообщение</th>
                                    <th>Ответы</th>
                                </tr>
                                </thead>
                                <tbody id="TableData">
                                <tr>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                </tr>
                                <tr>
                                    <td>n</td>
                                    <td>Рандом с исключением</td>
                                    <td>Ключ 1; Ключ 2; Ключ 3; Ключ 4; Ключ 5; Ключ 6; Ключ 7; Ключ 8; Ключ 9; Ключ
                                        10
                                    </td>
                                </tr>
                                <tr>
                                    <td>n+1</td>
                                    <td>Пустой рандом с исключением</td>
                                    <td>Ключи закончились, напиши мне позже</td>
                                </tr>
                                <tr>
                                    <td>n+2</td>
                                    <td>Дай ключ; скинь ключ</td>
                                    <td>*Рандом с исключением*</td>
                                </tr>
                                </tbody>
                            </table>
                            </p>

                            <br>
                            <h2 id="bot_key"><b>Гиф бот</b></h2>

                            <p>
                                <br>
                                <b>Пример базы</b>
                            <table class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Сообщение</th>
                                    <th>Ответы</th>
                                </tr>
                                </thead>
                                <tbody id="TableData">
                                <tr>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                </tr>
                                <tr>
                                    <td>n</td>
                                    <td>👍</td>
                                    <td>@doc-143923298_443990564</td>
                                </tr>
                                <tr>
                                    <td>n+1</td>
                                    <td>🤢</td>
                                    <td>@doc-143923298_443990759</td>
                                </tr>
                                <tr>
                                    <td>n+2</td>
                                    <td>💋</td>
                                    <td>@doc-143923298_443991033</td>
                                </tr>
                                </tbody>
                            </table>
                            </p>
                            Обратите внимание, что не все смайлы могут распозноваться на сайте. Но бот их поймет
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
