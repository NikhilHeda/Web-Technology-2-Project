<?php
	extract($_POST);
	
	require "connect.inc.php";

	$q = "
		SELECT `user_id`, `password`
		FROM `users`
		WHERE `username` = '$log_username';
	";

	($reg = mysql_query($q)) or die(mysql_error());

	if (mysql_num_rows($reg) == 1){
		
		$row = mysql_fetch_assoc($reg);
		if ($row['password'] == md5($log_passwd))
			echo 'Success';
		else
			echo 'Wrong Password, try again.';
		
	} else {
		echo 'No username found, Please Register';
	}
?>