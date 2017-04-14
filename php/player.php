<?php
	extract($_GET);

	require "connect.inc.php";


	$q = mysql_query("
			SELECT `audio_url`, `user_id`, `album`, `duration`, `release_date`, `title` 
			FROM songs 
			WHERE song_id = '$songID'
		") or die(mysql_error());

	if (mysql_num_rows($q) == 0){
		echo "Nothing found for '$songID'";
	}
	else{
		
		
		while ($row = mysql_fetch_assoc($q)){
			$data[] = $row;
		}
		$uid = $data[0]['user_id'];

		$q2 = mysql_query("
				SELECT `username`
				FROM users
				WHERE user_id = '$uid'
			") or die(mysql_error());

		while ($row = mysql_fetch_assoc($q2)){
			$user = $row;
		}

		$data['username'] = $user['username'];
		echo json_encode($data);		
	}
?>