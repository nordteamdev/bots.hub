<?php
session_start();
include "scripts/check.php"; // Проверка авторизации
include "scripts/Emoji.php";
include "scripts/MySQL.php";
$SQL = new MySQL;

$data = $SQL->get_user_db($_SESSION['vk_uid'], $_SESSION['group_id']);
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

    <title>BotInc.ru | База ответов</title>

    <!-- Bootstrap core CSS -->

    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="fonts/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">

    <!-- Custom styling plus plugins -->
    <link href="css/custom.css" rel="stylesheet">
    <link href="css/icheck/flat/green.css" rel="stylesheet">

    <link href="css/datatables/css/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="css/datatables/css/buttons.bootstrap.min.css" rel="stylesheet">


    <!-- select2 -->
    <link href="css/select/select2.min.css" rel="stylesheet">

    <script src="js/jquery.min.js"></script>

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
                            <h2>База сообщений</h2>
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
                            <p class="text-muted font-13 m-b-30">
                                Рекомендутеся сохранить это базу в Excel, затем редактировать ее (например в Excel или
                                LibreOffice Calc) и загрузить на сервер. </p>
                            <p class="text-muted font-13 m-b-30">
                                Сообщения, огданиченные "%%" системные, их т рогать не следует.
                                Более детальную информацию можно <a href="/doc.php">узнать тут</a>.
                            </p>
                            <table id="datatable-buttons" class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Сообщение</th>
                                    <th>Ответы</th>
                                </tr>
                                </thead>


                                <tbody id="TableData">
								<?php
								for ($i = 0; $i < count($data); $i++)
								{
									echo '<tr>';
									echo '<td>' . ($i + 1) . '</td> <td>' . Emoji::Decode($data[$i]["input"]) .
										 '</td>' . '<td>' . $data[$i]["output"] . '</td>';
									echo '</tr>';
								}
								?>
                                </tbody>
                            </table>

                            <table class="table">
                                <thead>
                                <tr>
                                    <th style="vertical-align: top; border-bottom: 0px;">
                                        <select id="bd_option_select" class="form-control" data-style="btn-info"
                                                data-width="100%" onChange="bd_select()">
                                            <option>Добавить сообщение</option>
                                            <option>Удалить сообщение</option>
                                        </select>
                                    </th>
                                    <th style="vertical-align: top; border-bottom: 0px;"><input type="text"
                                                                                                id="bd_message"
                                                                                                required="required"
                                                                                                class="form-control"
                                                                                                placeholder="Сообщение">
                                    </th>
                                    <th style="vertical-align: top; border-bottom: 0px;"><input type="text"
                                                                                                id="bd_answer"
                                                                                                required="required"
                                                                                                class="form-control"
                                                                                                placeholder="Ответы">
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
<!-- select2 -->
<script src="js/select/select2.full.js"></script>


<!-- Datatables -->
<script src="js/datatables/jszip.min.js"></script>

<script src="js/datatables/jquery.dataTables.min.js"></script>

<script src="js/datatables/dataTables.buttons.min.js"></script>
<script src="js/datatables/buttons.html5.min.js"></script>
<script src="js/datatables/buttons.flash.min.js"></script>

<script src="js/datatables/buttons.bootstrap.min.js"></script>
<!-- /Datatables-->


<!-- pace -->
<script src="js/pace/pace.min.js"></script>

<!-- PNotify -->
<script type="text/javascript" src="js/notify/pnotify.core.js"></script>
<script type="text/javascript" src="js/notify/pnotify.buttons.js"></script>
<script type="text/javascript" src="js/notify/pnotify.nonblock.js"></script>

<script>

    $("#datatable-buttons").DataTable({
        dom: "Bfrtip",
        buttons: [
            {
                extend: "excel",
                className: "btn-sm"
            }
        ],
        responsive: true,
        language: {
            "url": "/js/datatables/json/rus.json"
        }
    });

    function set_db() {
        $.ajax({
            type: 'post',
            url: '/scripts/user_db/set_db.php',
            response: 'text',
            success: function (data) {
                $("#TableData").html(data);
            }
        });
    };
    //set_db();


</script>
<script type="text/javascript">


    edit_bd.onclick = function () {
        var message = $("#bd_message").val();
        var answer = $("#bd_answer").val();
        var selection = $("#bd_option_select option:selected").text();
        $.ajax({
            type: 'post',
            url: '/scripts/user_db/db_edit.php',
            data: {'selection': selection, 'message': message, 'answer': answer},
            response: 'text',
            success: function (data) {
                location.reload();
            },
            error: function (data) {
                alert(data);
            }
        });
    };

    function bd_select() {
        if ($("#bd_option_select option:selected").text() == "Добавить сообщение") {
            $("#bd_answer").show();
        }
        if ($("#bd_option_select option:selected").text() == "Удалить сообщение") {
            $("#bd_answer").hide();
        }
    }
</script>

</body>

</html>
