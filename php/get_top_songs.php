<?php
    header('Content-Type: application/json');
    require "connect.inc.php";
    $arr = array();
    $query = "
		SELECT likes.song_id, count(likes.song_id)  as `number`, songs.title 
		FROM `likes` 
		LEFT JOIN `songs` 
		ON likes.song_id = songs.song_id 
		GROUP BY likes.song_id 
		ORDER BY 2 DESC
	";
	
    $res = mysql_query($query);
    while($row = mysql_fetch_assoc($res)){
        $arr[] = $row;
    }

    $j = json_encode($arr);
    echo $j;
    
?>