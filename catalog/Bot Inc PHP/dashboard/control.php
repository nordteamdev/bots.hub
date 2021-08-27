<?php
session_start();
include "scripts/check.php"; // Проверка авторизации
include "scripts/MySQL.php";
$SQL = new MySQL;

$data_db = $SQL->get_methods_db();
$data = array();
for ($i = 0; $i < count($data_db); $i++) {

	if ($data_db[$i]["service"] == "vk" || $data_db[$i]["service"] == "vk_" . $_SESSION['group_id']) {

	    $multifunction = explode(";", $data_db[$i]["path_name"]);
	    if(count($multifunction) > 1) {
			$data_db[$i]["path_name"] = $multifunction[0];
        }

		array_push($data, $data_db[$i]);
	}
}

$user_info = $SQL->get_user_info($_SESSION['vk_uid'], $_SESSION['group_id']);

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

    <title>BotInc.ru | Управление</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="fonts/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">

    <!-- Custom styling plus plugins -->
    <link href="css/custom.css" rel="stylesheet">
    <link href="css/icheck/flat/green.css" rel="stylesheet">

    <link href="js/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css"/>
    <link href="js/datatables/buttons.bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="js/datatables/fixedHeader.bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="js/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="js/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css"/>

    <script src="js/jquery.min.js"></script>

    <link href="js/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css"/>

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
                            <h2>Управление ботом</h2>
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
                                Имена фукнций добавлять в <a href="user_db.php">базу</a> в таком виде: <code>*Название
                                    функции*</code>
                            </p>
                            <br>
                            <table id="datatable-responsive"
                                   class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0"
                                   width="100%">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Функция</th>
                                    <th>Описание</th>
                                </tr>
                                </thead>

                                <tbody id="TableData">
								<?php
								$user_functions = $user_info["functions"];
								$user_functions = explode(";", $user_functions);

								for ($i = 0; $i < count($data); $i++) {
									$check_func = "";
									if (in_array($data[$i]["path_name"], $user_functions))
										$check_func = "checked";

									echo '<tr>';
									echo '<td ><input type="checkbox" onchange="edit_func(this, ' . $i . ')" ' .
										 $check_func . ' ></td>';
									echo '<td>' . $data[$i]["name"] . '</td>' . '<td>' . $data[$i]["description"] .
										 '</td>';
									echo '</tr>';
								}
								?>
                                </tbody>
                            </table>
                            <br>

							<?php
							if ($_SESSION['vk_uid'] == config\VK_ADMIN_ID) {
								?>
                                Эта возможность доступна только админу. <br>
                                Название .php файла указывать без ".php", регистр учитывается. Можно указать несколько фукнуий через ";" <br>
                                В последнее поле можно ввести id группы, тогда эта функция будет достуна только ей.

                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th style="vertical-align: top; border-bottom: 0px;">
                                            <select id="func_option_select" class="form-control" data-style="btn-info"
                                                    data-width="100%" onChange="func_select()">
                                                <option>Добавить функцию</option>
                                                <option>Удалить функцию</option>
                                            </select>
                                        </th>
                                        <th style="vertical-align: top; border-bottom: 0px;"><input type="text"
                                                                                                    id="func_name"
                                                                                                    required="required"
                                                                                                    class="form-control"
                                                                                                    placeholder="Название функции">
                                        </th>
                                        <th style="vertical-align: top; border-bottom: 0px;"><input type="text"
                                                                                                    id="func_filename"
                                                                                                    required="required"
                                                                                                    class="form-control"
                                                                                                    placeholder="Название .php файла">
                                        </th>

                                        <th style="vertical-align: top; border-bottom: 0px;"><input type="text"
                                                                                                    id="func_description"
                                                                                                    required="required"
                                                                                                    class="form-control"
                                                                                                    placeholder="Описание функции">
                                        </th>

                                        <th style="vertical-align: top; border-bottom: 0px;"><input type="text"
                                                                                                    id="func_group"
                                                                                                    required="required"
                                                                                                    class="form-control"
                                                                                                    placeholder="Уникальная группа?">
                                        </th>

                                        <th style="vertical-align: top; border-bottom: 0px;">
                                            <button id="add_function" type="button" class="btn">Ок</button>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
								<?php
							}
							?>
                            <div align="center">
								<?php
								if ($user_info["work"] == 0)
									echo '<button id="start_bot" type="button" class="btn btn-success btn-lg">Старт</button>';
								else
									echo '<button id="start_bot" type="button" class="btn btn-danger btn-lg">Стоп</button>';
								?>
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

<!-- Datatables-->
<script src="js/datatables/jquery.dataTables.min.js"></script>
<script src="js/datatables/dataTables.bootstrap.js"></script>
<script src="js/datatables/dataTables.buttons.min.js"></script>
<script src="js/datatables/buttons.bootstrap.min.js"></script>
<script src="js/datatables/jszip.min.js"></script>
<script src="js/datatables/pdfmake.min.js"></script>
<script src="js/datatables/vfs_fonts.js"></script>
<script src="js/datatables/buttons.html5.min.js"></script>
<script src="js/datatables/buttons.print.min.js"></script>
<script src="js/datatables/dataTables.fixedHeader.min.js"></script>
<script src="js/datatables/dataTables.keyTable.min.js"></script>
<script src="js/datatables/dataTables.responsive.min.js"></script>
<script src="js/datatables/responsive.bootstrap.min.js"></script>
<script src="js/datatables/dataTables.scroller.min.js"></script>

<!-- PNotify -->
<script type="text/javascript" src="js/notify/pnotify.core.js"></script>
<script type="text/javascript" src="js/notify/pnotify.buttons.js"></script>
<script type="text/javascript" src="js/notify/pnotify.nonblock.js"></script>

<!-- pace -->
<script src="js/pace/pace.min.js"></script>
<script>

    function func_select() {
        if ($("#func_option_select option:selected").text() == "Добавить функцию") {
            $("#func_filename").show();
            $("#func_description").show();
            $("#func_group").show();
        }
        if ($("#func_option_select option:selected").text() == "Удалить функцию") {
            $("#func_filename").hide();
            $("#func_description").hide();
            $("#func_group").hide();
        }
    }

    $.fn.dataTable.ext.order['dom-checkbox'] = function (settings, col) {
        return this.api().column(col, {order: 'index'}).nodes().map(function (td, i) {
            return $('input', td).prop('checked') ? '1' : '0';
        });
    };

    $('#datatable-responsive').dataTable({
        "order": [0, "desc"],
        "columns": [
            {"sSortDataType": "dom-checkbox"},
            null,
            null
        ],
        language: {
            "url": "/js/datatables/json/rus.json"
        }
    });

    function edit_func(who, func) {
        $.ajax({
            type: 'post',
            url: '/scripts/control/edit_func.php',
            data: {'func': func, 'status': who.checked},
            response: 'text',
            success: function (data) {
                //location.reload();
            },
            error: function (data) {
                var jsonResponse = JSON.parse(data.responseText);
                new PNotify({
                    title: 'Ошибка',
                    text: jsonResponse.error,
                    type: 'error',
                    hide: false
                });
            }
        });
    }

    start_bot.onclick = function () {
        $.ajax({
            type: 'post',
            url: '/scripts/control/start.php',
            response: 'text',
            success: function () {
                location.reload();
            },
            error: function (data) {
                var jsonResponse = JSON.parse(data.responseText);
                new PNotify({
                    title: 'Ошибка',
                    text: jsonResponse.error,
                    type: 'error',
                    hide: false
                });
            }
        });
    };

    add_function.onclick = function () {

        var name = $("#func_name").val();
        var description = $("#func_description").val();
        var filename = $("#func_filename").val();
        var group = $("#func_group").val();
        var selection = $("#func_option_select option:selected").text();
        $.ajax({
            type: 'post',
            url: '/scripts/control/add_function.php',
            data: {
                'name': name,
                'description': description,
                'filename': filename,
                'group': group,
                'selection': selection
            },
            response: 'text',
            success: function () {
                location.reload();
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


</script>


</body>

</html>
