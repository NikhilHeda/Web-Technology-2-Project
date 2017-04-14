<?php

	require 'core.inc.php';
	require 'connect.inc.php';
	
	extract($_GET);
	
	if (isset($_SESSION['user_id'])) {
		$userid = $_SESSION['user_id'];

		$query = "
			INSERT INTO `likes`
			VALUES (
				$userid,
				$songid
			);
		";
		
		$q1 = "
			SELECT `user_id`, `song_id`
			FROM `likes`
			WHERE user_id = $userid
			AND song_id = $songid
		";
		
		$q2 = "
			UPDATE `songs` 
			SET `like_count` = `like_count` + 1 
			WHERE `song_id` = $songid;
		";
		
		($query_res = mysql_query($q1)) or die(mysql_error());
		
		if (mysql_num_rows($query_res) == 0) {
			mysql_query($query) or die(mysql_error());
			mysql_query($q2) or die(mysql_error());
			
			echo 'Success';
		} else {
			echo 'You have already liked the song!</script>';
		}
		
	}
	
?>