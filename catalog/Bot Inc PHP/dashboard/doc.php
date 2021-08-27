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
                                <li><a href="#db">Работа с базой данных</a></li>
                                <ul>
                                    <li><a href="#db_selection">Как работает выборка сообщений</a></li>
                                    <li><a href="#db_attachments">Как прикрепить фото, видео и пр</a></li>
                                    <li><a href="#db_unknown_messages">Как сделать так, чтобы бот <b>НЕ</b> отвечал на
                                            неизвестные вопросы</a></li>
                                    <li><a href="#db_func">Как добавить функцию</a></li>
                                </ul>


                            </ul>


                            <br>
                            <br>
                            <h2 id="db"><b>Работа с базой данных</b></h2>

                            <p>
                                В базе сообщения имеется 2 основных столбца. Это "Сообщение" и "Ответы". <br>
                                В сообщениях указывается слово, слова или словосочетания, на которые реагирует бот. Если
                                бот нашел совпадение, то он выбирает случайное сообщение из "Ответов". <br>
                                Разделять сообещния и ответы следует через ";". <br>
                                Для перевода строки использовть "\n". Для экранирования ";" использовать "\;" <br>
                                Также в базе должна иметься строка "Неизвестные сообщения". Все сообщения, которые были
                                не найдены в базе, буду случайно выбираться из ответов "Неизвестных сообщений"<br>
                                <br>
                                <b id="db_selection">Пару слов о выборке сообщений.</b> <br>
                                Сообщения до 3 символов выбираются по точному совпадению, их нельзя писать в базу через
                                ";" <br>
                                Сообещения, более 3 символов выбирается по точному совпадению из "Сообщений". Выбираются
                                целиковые <b>слова</b>, не обрабатывая окончания. <br>
                                Регистр букв не учитывается.<br>
                                <br>

                                <b id="db_attachments">Как прирепить вложение</b> <br>
                                Вложением может быть фотография, видеозапись, запись на стене, документ(гифки, торрент
                                файлы и прочее), товары. <br>
                                Для того, чтобы прикрепить, к примеру, фотографию, нужно скопировать ссылку, например,
                                <code>https://vk.com/botof_net?z=photo-112128054_456239418%2Falbum-112128054_00%2Frev</code>
                                Копируем оттуда самое прикрепление <code>photo-112128054_456239418</code>. Чтобы
                                прикрепить эту фотографию к сообщению, в начале "Сообщения" пишем "@", а затем
                                прикрепление. После можно написать какой-то текст.
                                <code>@photo-112128054_456239418 Тут мы прикрепили фотографию</code>. Можно прикрепить
                                несколько вложений одновременно, а так же чередовать их. Для этого надо через запятую
                                написать еще несколько.
                                Пример: <code>@photo-112128054_456239418,wall344592979_27 Текст</code>. Все документы
                                должны быть публично доступны или должны быть загружены от имени группы.
                                <br>
                                <br>
                                <b id="db_unknown_messages">Как сделать так, чтобы бот НЕ отвечал на неизвестные
                                    вопросы</b> <br>
                                Для этого надо добавить в "Сообщения" <code>неизвестные сообщения</code> и сделать
                                "Ответы" <b>пустыми</b>.
                                <br>
                                <br>
                                <b id="db_func">Как добавить функцию</b> <br>
                                Подробное описание имеется в <a href="/control.php">Управлении ботом</a>. <br>
                                Некоторые функции надо настраивать, дополнив базу сообщений своими данными. Например,
                                фурнкция <code>Отвечать только подписчикам</code><br>
                                Некоторые функции необходимо добавлять в "Ответы". Добавляются они, округляясь "*".
                                Пример: <code>Ник</code>. Делается это для того, чтобы назначить уникальное имя функциям
                                <br>
                                <br>

                                <b>Пример работы</b>
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
                                    <td>1</td>
                                    <td>Неизвестные сообщения</td>
                                    <td>Я не знаю ответ; Прости, я не понял; Напиши по-другому</td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>Привет; Приветик; Хай</td>
                                    <td>Приветик; Хай; Привет, я чат-бот</td>
                                </tr>

                                <tr>
                                    <td>3</td>
                                    <td>Да</td>
                                    <td>Да; Нет; *Ник*</td>
                                </tr>

                                </tbody>
                            </table>
                            При запросе <code>Привет</code> выберется случаное сообщения из Ответов(id2).<br>
                            При запросе <code>Прив</code> в id2 ничего не найдется, так так выбираются полноценные
                            слова, а не их части. Поэтому будет выбрано случаное сообщение из id1<br>
                            <code>Да</code> мы вделили в отдельное сообщения, без добвалений, так как оно меншьше 3
                            символов. Также в ответах мы добавили функцию, шанс ответить которой 1/3 <br>
                            <br>
                            <br>

                            </p>


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
