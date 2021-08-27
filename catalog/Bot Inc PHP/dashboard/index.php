<?php
session_start();
include "scripts/check.php"; // Проверка авторизации
include "scripts/index/title_count.php"; // Данные для бара с цифрами

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

    <title>BotInc.ru | Статистика</title>

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

                <!-- menu profile quick info -->
				<?php include "profile_info.php"; ?>
                <!-- /menu profile quick info -->

                <br/>

                <!-- sidebar menu -->
				<?php include "sidebar.php"; ?>
                <!-- /sidebar menu -->

            </div>
        </div>

        <!-- top navigation -->
		<?php include "top_nav.php"; ?>
        <!-- /top navigation -->


        <!-- page content -->
        <div class="right_col" role="main">

            <!-- top tiles -->
            <div class="row tile_count">
                <div class="animated flipInY col-md-2 col-sm-4 col-xs-4 tile_stats_count">
                    <div class="left"></div>
                    <div class="right">
                        <span class="count_top"><i class="fa fa-comment"></i> Сообщения</span>
                        <div class="count"><?php echo $count_messages_now; ?></div>
						<?php
						if ($count_messages_now >= $count_messages_yesterday) {
							if ($count_messages_yesterday == 0)
								$count_messages_yesterday = 1;

							@$persent = 100 * $count_messages_now / $count_messages_yesterday - 100;
							if ($persent == -100)
								$persent = 0;
							echo '<span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>' .
								 round($persent, 1) . '% </i> За сегодня</span>';
						}
						else {
							if ($count_messages_yesterday == 0)
								$count_messages_yesterday = 1;

							@$persent = 100 - 100 * $count_messages_now / $count_messages_yesterday;
							echo '<span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>' .
								 round($persent, 1) . '% </i> За сегодня</span>';
						}
						?>

                    </div>
                </div>
                <div class="animated flipInY col-md-2 col-sm-4 col-xs-4 tile_stats_count">
                    <div class="left"></div>
                    <div class="right">
                        <span class="count_top"><i class="fa fa-comment"></i> Сообщения</span>
                        <div class="count"><?php echo $count_messages_current_week; ?></div>
						<?php
						if ($count_messages_current_week >= $count_messages_last_week) {
							if ($count_messages_last_week == 0)
								$count_messages_last_week = 1;

							@$persent = 100 * $count_messages_current_week / $count_messages_last_week - 100;
							if ($persent == -100)
								$persent = 0;
							echo '<span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>' .
								 round($persent, 1) . '% </i> За неделю</span>';
						}
						else {
							if ($count_messages_last_week == 0)
								$count_messages_last_week = 1;

							@$persent = 100 - 100 * $count_messages_current_week / $count_messages_last_week;
							echo '<span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>' .
								 round($persent, 1) . '% </i> За неделю</span>';
						}
						?>
                    </div>
                </div>
                <div class="animated flipInY col-md-2 col-sm-4 col-xs-4 tile_stats_count">
                    <div class="left"></div>
                    <div class="right">
                        <span class="count_top"><i class="fa fa-comment"></i> Сообщения</span>
                        <div class="count"><?php echo $count_messages_all_time; ?></div>
                        <span class="count_bottom"><i class="green"><i
                                        class="fa fa-sort-asc"></i></i> За все время</span>
                    </div>
                </div>
                <div class="animated flipInY col-md-2 col-sm-4 col-xs-4 tile_stats_count">
                    <div class="left"></div>
                    <div class="right">
                        <span class="count_top"><i class="fa fa-user"></i> Подписчики</span>
                        <div class="count"><?php echo $count_group_join_now - $count_group_leave_now ?></div>
						<?php
						if ($clean_group_join_now >= $clean_group_join_yesterday) {
							if ($clean_group_join_yesterday == 0)
								$clean_group_join_yesterday = 1;

							@$persent = 100 * $clean_group_join_now / $clean_group_join_yesterday - 100;
							if ($persent == -100)
								$persent = 0;
							echo '<span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>' .
								 round($persent, 1) . '% </i> За сегодня</span>';
						}
						else {
							if ($clean_group_join_yesterday == 0)
								$clean_group_join_yesterday = 1;

							@$persent = 100 - 100 * $clean_group_join_now / $clean_group_join_yesterday;
							echo '<span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>' .
								 round($persent, 1) . '% </i> За сегодня</span>';
						}
						?>
                    </div>
                </div>
                <div class="animated flipInY col-md-2 col-sm-4 col-xs-4 tile_stats_count">
                    <div class="left"></div>
                    <div class="right">
                        <span class="count_top"><i class="fa fa-user"></i> Подписчики</span>
                        <div class="count"><?php echo $count_group_join_current_week -
													  $count_group_leave_current_week ?></div>
						<?php
						if ($clean_group_leave_current_week >= $clean_group_join_last_week) {
							if ($clean_group_join_last_week == 0)
								$clean_group_join_last_week = 1;

							@$persent = 100 * $clean_group_leave_current_week / $clean_group_join_last_week - 100;
							if ($persent == -100)
								$persent = 0;
							echo '<span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>' .
								 round($persent, 1) . '% </i> За неделю.</span>';
						}
						else {
							if ($clean_group_join_last_week == 0)
								$clean_group_join_last_week = 1;

							@$persent = 100 - 100 * $clean_group_leave_current_week / $clean_group_join_last_week;
							echo '<span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>' .
								 round($persent, 1) . '% </i> За неделю</span>';
						}
						?>
                    </div>
                </div>
                <div class="animated flipInY col-md-2 col-sm-4 col-xs-4 tile_stats_count">
                    <div class="left"></div>
                    <div class="right">
                        <span class="count_top"><i class="fa fa-user"></i> Подписчики </span>
                        <div class="count"><?php echo $count_group_join_all_time - $count_group_leave_all_time; ?></div>
						<?php
						if ($count_group_join_all_time - $count_group_leave_all_time >= 0)
							echo '<span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i></i> За все время</span>';
						else
							echo '<span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i></i> За все время</span>';
						?>

                    </div>
                </div>

            </div>
            <!-- /top tiles -->


            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="dashboard_graph">
                        <div class="row x_title">
                            <div class="col-md-6">
                                <h3>Статистика</h3>
                            </div>
                        </div>

                        <div class="row">
                            <!-- line graph -->
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="x_panel">
                                    <div class="x_title">
                                        <h2>Количество запросов</h2>
                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                            </li>
                                            <li class="dropdown">
                                                <a class="dropdown-toggle" data-toggle="dropdown" role="button"
                                                   aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a href="#" onClick="set_request_graph(0);">За вчера</a></li>
                                                    <li><a href="#" onClick="set_request_graph(2);">За сегодня</a></li>
                                                    <li><a href="#" onClick="set_request_graph(1);">За неделю</a></li>
                                                    <li><a href="#" onClick="set_request_graph(3);">За месяц</a></li>
                                                </ul>
                                            </li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                                            </li>
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content">
                                        <div id="graph_line" style="width:100%; height:300px;"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- /line graph -->

                            <!-- line graph -->
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="x_panel">
                                    <div class="x_title">
                                        <h2>Количество подписчиков</h2>
                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                            <li class="dropdown">
                                                <a class="dropdown-toggle" data-toggle="dropdown" role="button"
                                                   aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a onClick="set_subscribers_graph(0);">За вчера</a></li>
                                                    <li><a onClick="set_subscribers_graph(2);">За сегодня</a></li>
                                                    <li><a onClick="set_subscribers_graph(1);">За неделю</a></li>
                                                    <li><a onClick="set_subscribers_graph(3);">За месяц</a></li>
                                                </ul>
                                            </li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                                            </li>
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content">
                                        <div id="graph_line2" style="width:100%; height:300px;"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- /line graph -->
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                <div class="x_panel">
                                    <div class="x_title">
                                        <h2>Активные пользователи</h2>
                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                            <li class="dropdown">
                                                <a class="dropdown-toggle" data-toggle="dropdown" role="button"
                                                   aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a onClick="set_active_users(2);">За вчера</a></li>
                                                    <li><a onClick="set_active_users(1);">За сегодня</a></li>
                                                    <li><a onClick="set_active_users(3);">За неделю</a></li>
                                                    <li><a onClick="set_active_users(4);">За месяц</a></li>
                                                </ul>
                                            </li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                                            </li>
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content scroll-view" id="active_users">

                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                <div class="x_panel">
                                    <div class="x_title">
                                        <h2>Популярные сообщения</h2>

                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                            </li>
                                            <li class="dropdown">
                                                <a class="dropdown-toggle" data-toggle="dropdown" role="button"
                                                   aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a onClick="set_top_messages(2);">За вчера</a></li>
                                                    <li><a onClick="set_top_messages(1);">За сегодня</a></li>
                                                    <li><a onClick="set_top_messages(3);">За неделю</a></li>
                                                    <li><a onClick="set_top_messages(4);">За месяц</a></li>
                                                </ul>
                                            </li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                                            </li>
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content scroll-view" id="top_messages">

                                    </div>
                                </div>

                            </div>

                            <div class="row">
<!--                                <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                    <div class="x_panel">
                                        <div class="x_title">
                                            <h2>Запас работы</h2>
                                            <ul class="nav navbar-right panel_toolbox">
                                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                                </li>
                                                <li class="dropdown">
                                                    <a class="dropdown-toggle" data-toggle="dropdown" role="button"
                                                       aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                                </li>
                                                <li><a class="close-link"><i class="fa fa-close"></i></a>
                                                </li>
                                            </ul>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="x_content">
                                            <div class="sidebar-widget" align="center">
                                                <canvas width="150" height="80" id="time_work" class=""
                                                        style="width: 160px; height: 100px;"></canvas>
                                                <div class="goal-wrapper">
                                                    <span class="gauge-value pull-left"></span>
                                                    <span id="gauge-text" class="gauge-value pull-left">0</span>
                                                    <span id="goal-text" class="goal-value pull-right">30</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>-->

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div class="x_panel">
                                        <div class="x_title">
                                            <h2>Новости</h2>
                                            <ul class="nav navbar-right panel_toolbox">
                                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                                </li>

                                                <li><a class="close-link"><i class="fa fa-close"></i></a>
                                                </li>
                                            </ul>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="x_content">
                                            <div class="dashboard-widget-content">
                                                <ul class="list-unstyled timeline widget">
                                                    <li>
                                                        <div class="block">
                                                            <div class="block_content">
                                                                <h2 class="title">
                                                                    <a>Быстрый старт</a>
                                                                </h2>
                                                                <div class="byline">
                                                                    от <a href="https://vk.com/id344592979">Админ</a>
                                                                </div>
                                                                <p class="excerpt"> Для быстрого старта, рекомендуем
                                                                            <a href="/bot_connect.php">подключить
                                                                        бота</a>, <a href="/control.php">настроить
                                                                        нужные функции</a> и начать пользоваться!</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="block">
                                                            <div class="block_content">
                                                                <h2 class="title">
                                                                    <a>Запуск проекта!</a>
                                                                </h2>
                                                                <div class="byline">
                                                                    от <a href="https://vk.com/id344592979">Админ</a>
                                                                </div>
                                                                <p class="excerpt">Рады приветствовать Вас на
                                                                    BotInc.ru!</p>
                                                                <p> Мы только начали развивать проект и надеемся, что
                                                                    получим какой-то фидбэк</p>
                                                                <p> Просим Вас вступить в нашу группу Вконтакте, там мы
                                                                    будем сообщать о новостях, планах и пр.</p>

                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="clearfix"></div>
                <div class="copyright-info">
                    <p class="pull-right"><a href="https://github.com/bad-day/BotInc">GitHub</a>
                    </p>
                </div>
                <div class="clearfix"></div>
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

    <!-- gauge js -->
    <script type="text/javascript" src="js/gauge/gauge.min.js"></script>


    <!-- bootstrap progress js -->
    <script src="js/progressbar/bootstrap-progressbar.min.js"></script>
    <script src="js/nicescroll/jquery.nicescroll.min.js"></script>
    <!-- icheck -->
    <script src="js/icheck/icheck.min.js"></script>
    <!-- daterangepicker -->
    <script type="text/javascript" src="js/moment/moment.min.js"></script>
    <script type="text/javascript" src="js/datepicker/daterangepicker.js"></script>
    <!-- chart js -->
    <script src="js/chartjs/chart.min.js"></script>
    <script src="js/custom.js"></script>

    <!-- moris js -->
    <script src="js/moris/raphael-min.js"></script>
    <script src="js/moris/morris.min.js"></script>

    <script>
        function set_request_graph(date) {
            $.ajax({
                type: 'post',
                url: '/scripts/index/get_request_graph.php',
                data: {'date': date},
                response: 'text',
                success: function (data) {
                    request_graph.setData(JSON.parse(data));
                }
            });
        };

        function set_subscribers_graph(date) {
            $.ajax({
                type: 'post',
                url: '/scripts/index/get_subscribers_graph.php',
                data: {'date': date},
                response: 'text',
                success: function (data) {
                    subscribers_graph.setData(JSON.parse(data));
                }
            });
        };

        function set_active_users(date) {
            $.ajax({
                type: 'post',
                url: '/scripts/index/active_users.php',
                data: {'date': date},
                response: 'text',
                success: function (data) {
                    $('#active_users').html(data);
                }
            });
        };

        function set_top_messages(date) {
            $.ajax({
                type: 'post',
                url: '/scripts/index/top_messages.php',
                data: {'date': date},
                response: 'text',
                success: function (data) {
                    $('#top_messages').html(data);
                }
            });
        };

        var request_graph = Morris.Line({
            element: 'graph_line',
            xkey: 'year',
            ykeys: ['value'],
            labels: ['Сообщений'],
            hideHover: 'auto',
            lineColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
            data: []
        });


        var subscribers_graph = new Morris.Line({
            element: 'graph_line2',
            xkey: 'year',
            ykeys: ['value1', 'value2'],
            labels: ['Пришло', 'Ушло'],
            hideHover: 'auto',
            lineColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
            data: []
        });

        function time_work_div() {
            $.ajax({
                type: 'post',
                url: '/scripts/index/time_work.php',
                response: 'text',
                success: function (data) {
                    data = JSON.parse(data);

                    $('#goal-text').html(data.max);
                    var opts = {
                        lines: 12, // The number of lines to draw
                        angle: 0, // The length of each line
                        lineWidth: 0.4, // The line thickness
                        pointer: {
                            length: 0.75, // The radius of the inner circle
                            strokeWidth: 0.042, // The rotation offset
                            color: '#1D212A' // Fill color
                        },
                        limitMax: 'false', // If true, the pointer will not go past the end of the gauge
                        colorStart: data.color, // Colors
                        colorStop: data.color, // just experiment with them
                        strokeColor: '#F0F3F3', // to see which ones work best for you
                        generateGradient: true
                    };

                    var target = document.getElementById('time_work'); // your canvas element
                    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                    gauge.maxValue = data.max; // set max gauge value
                    gauge.animationSpeed = 32; // set animation speed (32 is default value)
                    gauge.set(data.day); // set actual value
                    gauge.setTextField(document.getElementById("gauge-text"));
                }
            });
        }

        set_request_graph(2);
        set_subscribers_graph(2);
        set_active_users(1);
        set_top_messages(1);
        time_work_div();


    </script>
</body>
</html>

