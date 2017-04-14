<?php
	extract($_POST);
	
	require 'core.inc.php';
	require "connect.inc.php";

    $q = mysql_query("
			SELECT `username`
			FROM `users`
			WHERE `username`='$reg_username'
			OR `email_id`='$reg_email';
		") or die(mysql_error());

	if(mysql_num_rows($q) == 0){
		// No username found, can safely insert
		$date = explode('/', $reg_dob);
		$formatted = implode('-', array($date[2], $date[1], $date[0]));
		
		$query = "
            INSERT INTO `users` (`username`, `password`, `profile_pic`, `email_id`,`DOB`)
            VALUES (
                '$reg_username',
                '". md5($reg_passwd) . "',
				'images/default_pro_pic.jpg',
				'$reg_email',
				'$formatted'
            );
		";
		
        (mysql_query($query)) or die(mysql_error());

		// Setting Session
		$q = "
			SELECT `user_id`, `password`
			FROM `users`
			WHERE `username` = '$reg_username';
		";

		($reg = mysql_query($q)) or die(mysql_error());
		$row = mysql_fetch_assoc($reg);

		$_SESSION['user_id'] = $row['user_id'];
		echo 'Success';
		
    } else {        
		echo "Username not available";
	}
?>