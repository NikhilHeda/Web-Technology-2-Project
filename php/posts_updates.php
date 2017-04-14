<?php
	require "core.inc.php";
	
	header('Content-type: text/event-stream');

	ob_flush();
	flush();
	
	require 'connect.inc.php';
	
	$query = "
		SELECT *
		FROM `songs`,`users`
        WHERE songs.user_id=users.user_id
		ORDER BY songs.song_id DESC;
	";
	
	$old = 0;
	if (isset($_SESSION['last_post']))
		$old = $_SESSION['last_post'];
	
	while (true) {
		
		($query_res = mysql_query($query)) or (die(mysql_error()));
		
		$new = mysql_num_rows($query_res);
		
		if ($new > $old) {
			$i = 0;
			while ( ($row = mysql_fetch_assoc($query_res)) && ($i < $new - $old) ) {
				echo "data: ". json_encode($row) . "\n";
				echo "event: newpost\n\n";
				
				ob_flush();
				flush();
				
				$i++;
			}
			
			$old = $new;
			$_SESSION['last_post'] = $old;
		}
		
		sleep(5);
	}

?>