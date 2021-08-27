	  <!-- top navigation -->
      <div class="top_nav">

        <div class="nav_menu">
          <nav class="" role="navigation">
            <div class="nav toggle">
              <a id="menu_toggle"><i class="fa fa-bars"></i></a>
            </div>

            <ul class="nav navbar-nav navbar-right">
              <li class="">
                <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  <img src="<?php echo $_SESSION['vk_photo_rec']; ?>" alt=""><?php echo $_SESSION['vk_first_name'] . " " . $_SESSION['vk_last_name']; ?>
                  <span class=" fa fa-angle-down"></span>
                </a>
                <ul class="dropdown-menu dropdown-usermenu animated fadeInDown pull-right">
				  <li><a href="control.php"><i class="fa fa-gears pull-right"></i> Управление ботом</a></li>
				  <li><a href="group_change.php"><i class="fa fa-gears pull-right"></i> Выбор сообщества</a></li>
                  <li><a href="log_out.php"><i class="fa fa-sign-out pull-right"></i> Выход</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- /top navigation -->
