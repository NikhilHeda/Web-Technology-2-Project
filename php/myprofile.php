<?php
    header('Content-Type: application/json');
    require "core.inc.php";
    require "connect.inc.php";
    
    extract($_GET);
	if (isset($_SESSION['user_id'])) {

		$user_id = $_SESSION['user_id'];

		if($g == "aboutMe"){
			$aboutMe = mysql_query("
				SELECT `about_me`
				FROM `users`
				WHERE `user_id`= '$user_id'
			;") or die(mysql_error());
			
			if (mysql_num_rows($aboutMe) > 0) {
				// output data of each row
				while($row = mysql_fetch_assoc($aboutMe)) {
					echo $row["about_me"];
				}
			} else {
				echo "0 results";
			}
			
		} elseif($g == "profilePic"){
			$query =  mysql_query("
				SELECT `profile_pic` from `users`
				WHERE `user_id`=$user_id;
			") or die(mysql_error());
			
			if (mysql_num_rows($query) > 0) {
				// output data of each row
				while($row = mysql_fetch_assoc($query)) {
					echo $row["profile_pic"];
				}
			} else {
				echo "0 results";
			}
		} elseif($g == "songList") {
			$query =  mysql_query("
				SELECT `song_id`, `coverpic`, `title`
				FROM `songs`
				WHERE `user_id`= $user_id;
			");
			
			if (mysql_num_rows($query) > 0) {
				// output data of each row
				$res = array();
				while($row = mysql_fetch_assoc($query)) {
					array_push($res,
						array(
							'songid' => $row["song_id"],
							'coverpic' => $row["coverpic"],
							'title' => $row["title"]
						)
					);
				}
				echo json_encode($res);
			} else {
				echo "0 results";
			}
		}		
	}

?>