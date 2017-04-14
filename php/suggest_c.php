<?php
    require "connect.inc.php";

	extract($_GET);
	$res=array();
	$arr_user = array();
    $q = "SELECT `username` FROM `users`;";
    
    ($users = mysql_query($q)) or die(mysql_error());
    
	while ($row = mysql_fetch_assoc($users))
		array_push($arr_user,$row["username"]);
    
    foreach($arr_user as $u){
        if(strpos(strtolower($u),strtolower($term))!==false){
            array_push($res,$u);
        }
    }
	
	echo (json_encode($res));

?>	
	