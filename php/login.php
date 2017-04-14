<?php
	extract($_POST);
	require 'core.inc.php';
	require "connect.inc.php";

	$q = "
		SELECT `user_id`, `password`
		FROM `users`
		WHERE `username` = '$log_username';
	";

	($reg = mysql_query($q)) or die(mysql_error());

	if (mysql_num_rows($reg) == 1){
		
		$row = mysql_fetch_assoc($reg);
		if ($row['password'] == md5($log_passwd)) {
			// Setting Session
			$_SESSION['user_id'] = $row['user_id'];
			echo 'Success';
		}
		else
			echo 'Wrong Password, try again.';
		
	} else {
		echo 'No username found, Please Register';
	}
?>