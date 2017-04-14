<?php
	require 'core.inc.php';

    extract($_GET);
    
	if (isset($_SESSION['user_id'])) {
		echo '<script>alert("Hiiiii10")</script>';
		require "connect.inc.php";
		$userid = $_SESSION['user_id'];
		$query = "
			INSERT INTO `feedback`
			VALUES ('$userid', '$subject', '$message');
		";

		(mysql_query($query)) or die(mysql_error());
	}
	
	echo '<script>alert("Hiiiii")</script>'

?>