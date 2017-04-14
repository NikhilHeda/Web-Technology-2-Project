<?php

	require 'core.inc.php';
	require 'connect.inc.php';

	if (isset($_SESSION['user_id'])) {		
		$target_cover_dir = "../uploads/images/";
		
		$target_cover_dir .= basename($_FILES["upload_profile_pic"]["name"]);
		
		$ret = move_uploaded_file($_FILES["upload_profile_pic"]["tmp_name"], $target_cover_dir);

		// Check if image file is a actual image or fake image
		if ($ret) {
			echo "The file ". basename( $_FILES["upload_profile_pic"]["name"]). " has been uploaded.";
			
			print_r($_POST);
			
			$userid = $_SESSION['user_id'];
			
			$query = "
				UPDATE `users`
				SET `profile_pic` = '" . substr($target_cover_dir, 3) . "'
				WHERE `user_id` = $userid;
			";
			
			(mysql_query($query)) or die(mysql_error());
			
		} else {
			echo "Sorry, there was an error uploading your file.";
		}	
	}
?>