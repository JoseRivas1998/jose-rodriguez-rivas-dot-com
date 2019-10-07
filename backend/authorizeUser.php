<?php

require_once 'Main.php';
require_once 'Users.php';

session_start();

$userConn = Main::ConnectToUsersDb();
header(Main::JSON_HEADER);

$sessionId = session_id();

$output = array("isAuthorized"=>false);

$output["isAuthorized"] = Users::IsSessionAdmin($userConn, $sessionId);
$userConn->close();
echo(json_encode($output));


