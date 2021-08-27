<?php
session_start();
include "scripts/check.php"; // Проверка авторизации
include "scripts/Emoji.php";
include "scripts/MySQL.php";
$SQL = new MySQL;

$my_info = $SQL->get_user_info($_SESSION['vk_uid'], $_SESSION['group_id']);

$limits_day = $SQL->get_from_user_db($_SESSION['vk_uid'], $_SESSION['group_id'], "%Ограничения ответов в сутки%");
$limits_text = $SQL->get_from_user_db($_SESSION['vk_uid'], $_SESSION['group_id'], "%Текст ограничения%");

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

    <title>BotInc.ru | Настройка Ограничений</title>

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
                            <h2>Настройка Ограничений</h2>
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
                            <p>Тут Вы можете настроить ограничения по количеству отетов бота для пользователей. Оставьте
                                поля пустыми, чтобы ограничения не устанавливались
                                <br><b>Не забудьте поставить галочку в управлении ботом</b>.
                                <br>

                                <br>
                            <form class="form-horizontal form-label-left" action="scripts/limits/global_limits.php"
                                  method="POST" novalidate>
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Ограничения
                                        ответов в сутки <span class="required"></span></label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input id="name" value="<?php echo $limits_day["output"]; ?>"
                                               class="form-control col-md-7 col-xs-12" data-validate-length-range="6"
                                               data-validate-words="2" name="limits_day" placeholder="1000"
                                               required="required" type="text">
                                    </div>
                                </div>
                                <div class="item form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Текст
                                        ограничения <span class="required"></span></label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input id="name" value="<?php echo $limits_text["output"]; ?>"
                                               class="form-control col-md-7 col-xs-12" data-validate-length-range="6"
                                               data-validate-words="2" name="limits_text"
                                               placeholder="Оставьте пустым, чтобы бот ничего не ответил"
                                               required="required" type="text">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-6 col-md-offset-3">
                                        <button type="submit" class="btn btn-success">Сохранить</button>
                                    </div>
                                </div>
                            </form>
                            <br>
                            <h2 align="center">Ограничения на индивидуальные сообщения</h2>
							<?php
							$data = $SQL->get_limits_user_db($_SESSION['vk_uid'], $_SESSION['group_id']);
							if (count($data) > 0) {
								?>
                                <br>
                                <table id="datatable-buttons" class="table table-striped table-bordered">
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
									<?php

									for ($i = 0; $i < count($data); $i++) {
										echo '<tr>';
										echo '<td>' . ($i + 1) . '</td>';
										echo '<td>' . Emoji::Decode($data[$i]["input"]) . '</td>';
										echo '<td>' . $data[$i]["limit_count"] . '</td>';
										echo '<td>' . $data[$i]["limit_time"] . '</td>';
										echo '<td>' . $data[$i]["limit_text"] . '</td>';
										echo '</tr>';
									}
									?>
                                    </tbody>
                                </table>

								<?php
							}
							?>
                            <br>
                            <table class="table">
                                <thead>
                                <tr>
                                    <th style="vertical-align: top; border-bottom: 0px;">
                                        <select id="limit_option_select" class="form-control" data-style="btn-info"
                                                data-width="100%" onChange="limit_select()">
                                            <option>Добавить ограничение</option>
                                            <option>Удалить ограничение</option>
                                        </select>
                                    </th>
                                    <th style="vertical-align: top; border-bottom: 0px;"><input type="text"
                                                                                                id="limit_message"
                                                                                                required="required"
                                                                                                class="form-control"
                                                                                                placeholder="Сообщение">
                                    </th>
                                    <th style="vertical-align: top; border-bottom: 0px;"><input type="text"
                                                                                                id="limit_count"
                                                                                                required="required"
                                                                                                class="form-control"
                                                                                                placeholder="Ограничение(число)">
                                    </th>
                                    <th style="vertical-align: top; border-bottom: 0px;"><input type="text"
                                                                                                id="limit_time"
                                                                                                required="required"
                                                                                                class="form-control"
                                                                                                placeholder="Время ограничения(мин)">
                                    </th>
                                    <th style="vertical-align: top; border-bottom: 0px;"><input type="text"
                                                                                                id="limit_text"
                                                                                                required="required"
                                                                                                class="form-control"
                                                                                                placeholder="Текст при достижения ограничения">
                                    </th>

                                    <th style="vertical-align: top; border-bottom: 0px;">
                                        <button id="edit_bd" type="button" class="btn">Ок</button>
                                    </th>
                                </tr>
                                </thead>
                            </table>
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

<script>

    edit_bd.onclick = function () {
        var message = $("#limit_message").val();
        var limit_count = $("#limit_count").val();
        var limit_time = $("#limit_time").val();
        var limit_text = $("#limit_text").val();
        var selection = $("#limit_option_select option:selected").text();
        $.ajax({
            type: 'post',
            url: '/scripts/limits/local_limits.php',
            data: {
                'selection': selection,
                'message': message,
                'limit_count': limit_count,
                'limit_text': limit_text,
                'limit_time': limit_time
            },
            response: 'text',
            success: function (data) {
                location.reload();
            },
            error: function (data) {
                location.reload();
                //alert(data);
            }
        });
    };

    function limit_select() {
        if ($("#limit_option_select option:selected").text() == "Добавить ограничение") {
            $("#limit_count").show();
            $("#limit_time").show();
            $("#limit_text").show();
        }
        if ($("#limit_option_select option:selected").text() == "Удалить ограничение") {
            $("#limit_count").hide();
            $("#limit_time").hide();
            $("#limit_text").hide();
        }
    }

</script>

</body>

</html>
