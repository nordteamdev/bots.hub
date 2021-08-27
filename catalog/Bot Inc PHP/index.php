<?php
include_once "config.php";
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Мы создаем качественных ботов для сообществ ВК">
    <meta name="keywords" content="бот для группы, создать бота для группы, боты вк, боты, вк бот, купить бота,
    лучшие боты, бот для сообщества, сделать гиф бот, гиф бот, бот для раздачи, рассылка сообщений, стим ключи,
    раздача ключей, конструктор ботов, бот для группы бесплатно, создать бота">

    <link rel="shortcut icon" href="scripts/img/favicon.png" type="image/x-icon">

    <title>MagicBot Inc - Боты для сообществ ВК</title>

    <!-- Bootstrap core CSS -->
    <link href="scripts/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="scripts/css/main.css" rel="stylesheet">

    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic' rel='stylesheet'
          type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Raleway:400,300,700' rel='stylesheet' type='text/css'>

    <script src="scripts/js/jquery.min.js"></script>
    <script src="scripts/js/smoothscroll.js"></script>


    <!-- Put this script tag to the <head> of your page -->
    <script type="text/javascript" src="//vk.com/js/api/openapi.js?140"></script>

    <script type="text/javascript">
        VK.init({apiId: <?php echo config\VK_CLIENT_ID; ?>});
    </script>

	<?php include "scripts/analytics.php"; ?>

</head>

<body data-spy="scroll" data-offset="0" data-target="#navigation">

<!-- Fixed navbar -->
<div id="navigation" class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><b>MagicBot Inc</b></a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#home" class="smothscroll">Главная</a></li>
                <li><a href="#desc" class="smothscroll">Описание</a></li>
                <li><a href="#auth" class="smothScroll">Авторизация</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>


<section id="home" name="home"></section>
<div id="headerwrap">
    <div class="container">
        <div class="row centered">
            <div class="col-lg-12">
                <h1>Это <b>magicbotinc.ru</b></h1>
                <h3>Мы делаем ботов для сообществ ВК</h3>
                <br>
            </div>

            <div class="col-lg-2">
                <h5>Функционал</h5>
                <p>Мощный функционал поможет Вам привлечить и удержать как можно больше людей</p>
                <img class="hidden-xs hidden-sm hidden-md" src="scripts/img/arrow1.png">
            </div>
            <div class="col-lg-8">
                <img class="img-responsive" src="scripts/img/app-bg3.png" alt="">
            </div>
            <div class="col-lg-2">
                <br>
                <img class="hidden-xs hidden-sm hidden-md" src="scripts/img/arrow2.png">
                <h5> Статистика</h5>
                <p>Удобная статистика позволит корректировать поведение ботов до мелочей</p>
            </div>
        </div>
    </div> <!--/ .container -->
</div><!--/ #headerwrap -->


<section id="desc" name="desc"></section>
<!-- INTRO WRAP -->
<div id="intro">
    <div class="container">
        <div class="row centered">
            <h1>Удобен во всем</h1>
            <br>
            <br>
            <div class="col-lg-4">
                <img src="scripts/img/intro0001.png" alt="">
                <h3>Функционал</h3>
                <p>У нас самый большой функционал на рынке, от решения математическийх задач, до синтеза речи</p>
            </div>
            <div class="col-lg-4">
                <img src="scripts/img/intro0002.png" alt="">
                <h3>Качество</h3>
                <p>Высокое качество ботов и мощные сервера позволяют обрабатывать миллионы запросов в сутки</p>
            </div>
            <div class="col-lg-4">
                <img src="scripts/img/intro0003.png" alt="">
                <h3>Удобство</h3>
                <p>Адаптивный дизайн позволит с легкостью отслеживать и управлять ботами с любого устройства</p>
            </div>
        </div>
        <br>
        <hr>
    </div> <!--/ .container -->
</div><!--/ #introwrap -->

<!-- FEATURES WRAP -->
<div id="features">
    <div class="container">
        <div class="row">
            <h1 class="centered">Чем мы занимаемся?</h1>
            <br>
            <br>
            <div class="col-lg-6 centered">
                <img class="centered" src="scripts/img/iphone2.png" alt="">
            </div>

            <div class="col-lg-6">
                <h3>Мы делаем ботов для сообществ. Бесплатно.</h3>
                <br>
                <!-- ACCORDION -->
                <div class="accordion ac" id="accordion2">
                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                               href="#collapse1">
                                Не только чат-боты
                            </a>
                        </div>
                        <div id="collapse1" class="accordion-body collapse in">
                            <div class="accordion-inner">
                                <p> Подключив к нам Ваше сообщество, Вы сможете настраивать приветствия, планировать
                                    рекламу внутри диалогов, следить за статистикой, вплодь до каждой минуты.
                                    Вы также можете подключить виджет сообщений на Ваш сайт и использовать бота там!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                               href="#collapse5">
                                Разновидности ботов
                            </a>
                        </div>
                        <div id="collapse5" class="accordion-body collapse in">
                            <div class="accordion-inner">
                                <p> Создавайте гиф ботов, ботов для раздачи ключей, ботов сериальщиков и многих других.
                                    Имеется подробная документация по эксплуатации</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                               href="#collapse2">
                                Массовые рассылки
                            </a>
                        </div>
                        <div id="collapse2" class="accordion-body collapse">
                            <div class="accordion-inner">
                                <p>Делайте массовые рассылки, уведомляйте аудиторию о новых событиях и увеличивайте
                                    активность сообщества.</p>
                            </div>
                        </div>
                    </div>

                    <br>

                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                               href="#collapse3">
                                Гибкая база ответов
                            </a>
                        </div>
                        <div id="collapse3" class="accordion-body collapse">
                            <div class="accordion-inner">
                                <p> Свободно экспортируйте и импортируйте базу, группируйте ответы и используйте
                                    множество функций.</p>
                            </div>
                        </div>
                    </div>
                    <br>


                    <!--  <div class="accordion-group">
                       <div class="accordion-heading">
                           <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree">
                           Голосовые боты
                           </a>
                       </div>
                       <div id="collapseThree" class="accordion-body collapse">
                           <div class="accordion-inner">
                           <p>Наш функционал позволяет бесплатно синтезировать речь. Так же имеется более серьезный синтез речи, работающий по API Яндекса. </p>
                           </div>
                       </div>
                   </div> --> <!-- /accordion-group -->


                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                               href="#collapse4">
                                Поддержка
                            </a>
                        </div>
                        <div id="collapse4" class="accordion-body collapse">
                            <div class="accordion-inner">
                                <p>Постоянно пополняющийся функционал не заставит Вашу аудиторию унывать. Также мы
                                    создаем отдельные функции, позволяющие сделать Вашего бота по-настоящему
                                    уникальным.</p>
                            </div>
                        </div>
                    </div>
                    <br>
                </div><!-- Accordion -->
            </div>
        </div>
    </div><!--/ .container -->
</div><!--/ #features -->


<section id="auth" name="auth"></section>
<div id="showcase">
    <div class="container">
        <div class="row">
            <h1 class="centered">Войдите в личный кабинет и убедитесь сами</h1>
            <br>
            <center>
                <div class="centered" id="vk_auth"></div>
            </center>

        </div>
        <br>
        <br>
        <br>
    </div><!-- /container -->
</div>


<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="scripts/js/bootstrap.js"></script>
<script>
    $('.carousel').carousel({
        interval: 3500
    })
</script>
<script type="text/javascript">
    VK.Widgets.Auth("vk_auth", {authUrl: '<?php echo config\DASHBOARD_PAGE; ?>/auth.php'});
</script>

</body>
</html>
