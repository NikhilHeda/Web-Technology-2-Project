<?php
	$user = "root";
	$host = "localhost";
	$passwd = "";
	$dbname = "audionet";

	( $link = mysql_connect($host,$user,$passwd) && mysql_select_db($dbname) ) or die(mysql_error());

?>