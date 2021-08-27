<?php
session_start();
include "scripts/check.php"; // Проверка авторизации
include "scripts/MySQL.php";
include "scripts/VkApi.php";
$SQL = new MySQL;
$VK = new VkAPI;

$user_groups = $SQL->get_user_groups($_SESSION['vk_uid']);
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="images/favicon.png" type="image/x-icon">

    <title>BotInc.ru | Выбор сообщества</title>

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
                            <h2>Выбор сообщества</h2>
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

                            <table  class="table">
                                <tbody id="TableData">
							<?php
							if ($user_groups) {

								// description
								for ($i = 0; $i < count($user_groups); $i++) {
									echo '<tr>';
									$VK->access_token = $user_groups[$i]["access_token"];
									$description = $VK->groups_getById("", "description");

									echo '<td style="width:100%;">';
									echo '<form action="scripts/group_change/group_change.php" method="POST">';

									echo "<a target=\"_blank\" href='https://vk.com/" . $description->response[0]->screen_name . "'>" .
										 $description->response[0]->name . "</a> &nbsp;";

									echo '</td>';

									$group_id = $description->response[0]->id;
									echo "<td><input type=\"hidden\" value=\"$group_id\" name=\"group_id\" /> </td>";
									echo "<td><button type=\"submit\" name=\"change\" class=\"btn-success\" > Выбрать</button></td>";
									echo "<td><button type=\"submit\" name=\"delete\" class=\"btn-danger\" > Удалить</button><br></td>";


									echo '</form>';
									echo '</tr>';
								}
							}
							else {
								echo "Вы еще не подключили сообщества";
							}
							?>
                                </tbody>
                            </table>
                            <br>
                            <small><a href="bot_connect.php">Добавить сообщество<a/></small>
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
