<?php

	require 'core.inc.php';
	require 'connect.inc.php';

	if (isset($_SESSION['user_id'])) {
		$target_song_dir = "../uploads/songs/";
		$target_cover_dir = "../uploads/images/";
		
		$target_song_dir .= basename($_FILES["song"]["name"]);
		$target_cover_dir .= basename($_FILES["cover"]["name"]);
		
		$ret1 = move_uploaded_file($_FILES["song"]["tmp_name"], $target_song_dir);
		$ret2 = move_uploaded_file($_FILES["cover"]["tmp_name"], $target_cover_dir);

		// Check if image file is a actual image or fake image
		if ($ret1 && $ret2) {
			echo "The file ". basename( $_FILES["song"]["name"]). " has been uploaded.";
			echo "The file ". basename( $_FILES["cover"]["name"]). " has been uploaded.";
			
			print_r($_POST);
			
			// Add the data to the database
			extract($_POST);
			
			$userid = $_SESSION['user_id'];
			
			$query = "
				INSERT INTO `songs`
				VALUES (
					'',
					$userid,
					'" . substr($target_cover_dir, 3) . "',
					'" . substr($target_song_dir, 3) . "',
					'$upload_song_genre',
					'$upload_song_duration',
					'$upload_song_release',
					'$upload_song_lang',
					'$upload_song_name',
					1,
					0,
					0,
					'$upload_song_album'
				);";
			
			(mysql_query($query)) or die(mysql_error());
			
		} else {
			echo "Sorry, there was an error uploading your file.";
		}	
	}
?>