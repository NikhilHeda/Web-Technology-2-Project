<?php
	extract($_POST);
	
	require "connect.inc.php";

    $q = mysql_query("
			SELECT `username`
			FROM `users`
			WHERE `username`='$reg_username'
			OR `email_id`='$reg_email';
		") or die(mysql_error());

	if(mysql_num_rows($q) == 0){
		// No username found, can safely insert
        echo "INSERTING user " . $reg_username;
        
		$query = "
            INSERT INTO `users` (`username`, `password`)
            VALUES (
                '$reg_username',
                '". md5($reg_passwd) . "'
            );
		";
		
        (mysql_query($query)) or die(mysql_error());
    } else {        
		echo "Username not available";
		/*
			while ($row = mysql_fetch_assoc($q1))
				$data[] = $row;
			
			echo "ROWS: " . mysql_num_rows($q1) ."\n";
			
			echo  "DATA: ". print_r($data) . " \n";
		*/
	}
?>