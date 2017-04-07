<?php
    header('Content-Type: application/json');
    //require "connect.inc.php";
    $user = "root";
	$host = "localhost";
	$passwd = "";
	$dbname = "audionet";

    ($link = mysql_connect($host,$user,$passwd) or die("DEAD".mysql_error().""));
	
    mysql_select_db($dbname, $link);
    
    extract($_GET);
    $user = "nikhil";//$_SESSION['username'];
    if($g=="aboutMe"){
        $aboutMe = mysql_query("SELECT `about_me` from `users`
           WHERE `username`= '$user'
            ;");
        if (mysql_num_rows($aboutMe) > 0) {
            // output data of each row
            while($row = mysql_fetch_assoc($aboutMe)) {
                echo $row["about_me"];
                
            }
        }
        else {
                echo "0 results";
        }
    }
    elseif($g=="profilePic"){
        $query =  mysql_query("SELECT `profile_pic` from `users`
           WHERE `username`=$user
            ;");
        if (mysql_num_rows($query) > 0) {
            // output data of each row
            while($row = mysql_fetch_assoc($query)) {
                echo $row["profile_pic"];
                
            }
        }
        else {
                echo "0 results";
        }
    }
    elseif($g=="songList"){
        $query =  mysql_query("SELECT `audio_url` from `songs`
           WHERE `user_id`= 1
            ;");
        $q2 = mysql_query("SELECT `user_id` from `users` WHERE `username`='$user'");
        //echo "q2 " . $q2 . "";
        // while ($row = mysql_fetch_assoc($q2)){
        //    $data[] = $row;   
        //}
        //echo "ROWS: " . mysql_num_rows($q2) ."\n";
        //echo  "DATA: ". print_r($data) . " \n";
        
        //echo "hell" . $q2['user_id'] . 'hell';
        if (mysql_num_rows($query) > 0) {
            // output data of each row
            $res = array();
            while($row = mysql_fetch_assoc($query)) {
                array_push($res,$row["audio_url"]);
            }
            echo json_encode($res);
        }
        else {
                echo "0 results";
        }        
    }
?>