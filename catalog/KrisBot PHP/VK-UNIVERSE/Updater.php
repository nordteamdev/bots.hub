<?php
//By UnFox
	$get = json_decode(file_get_contents("https://vkue.foxy-link.ru/update/Update.php?version=".urlencode($version)),1);	
	if($get['version'] > $version){
		notif('VKUE', "Доступно обновление ".$get['version']);
		console(Colors::green_bold('###Журнал изменений###'));
		echo PHP_EOL;
		console(Colors::white_bold($get['changelog']));
		echo PHP_EOL;
		console(Colors::green_bold('######################'));
		sleep(1);
		notif('VKUE', "Загрузка обновления...");
		download($get['update'], 'VK-UNIVERSE/update.zip');
		notif('VKUE', "Распаковка обновления...");
		$zip = new ZipArchive();
  		if ($zip->open("VK-UNIVERSE/update.zip") === true) {
  			$zip->extractTo("VK-UNIVERSE/");
    		$zip->close();
 		}
 		notif('VKUE', "Распаковка завершена!");
	}
	$n=0;
	foreach ($get['hashes'] as $file => $hash) {
		if(md5_file('VK-UNIVERSE/'.$file) != $hash){
			$n=1;
			download($get['update'], 'VK-UNIVERSE/update.zip');
			$zip = new ZipArchive();
	  		if ($zip->open("VK-UNIVERSE/update.zip") === true) {
	  			$zip->extractTo("VK-UNIVERSE/");
	    		$zip->close();
	 		}
	 	}
 	}
 	//if($n==1)notif('VKUE',"Нарушена целостность скрипта");
 	if(file_exists('VK-UNIVERSE/update.zip')){unlink("VK-UNIVERSE/update.zip"); notif('VKUE',"Пожалуйста перезапустите скрипт"); exit;}
?>