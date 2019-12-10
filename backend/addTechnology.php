<?php
session_start();

require_once 'Main.php';
require_once 'Users.php';

$conn = Main::ConnectToDb();
$userConn = Main::ConnectToUsersDb();

$sessionId = session_id();

if($_POST) {
    if (Users::IsSessionAdmin($userConn, $sessionId)) {
        $techName = $_POST["name"];
        $insertStmt = $conn->prepare("INSERT INTO technologies(name) VALUES (?)");
        if($insertStmt) {
            if($insertStmt->bind_param("s", $techName)) {
                if($insertStmt->execute()) {
                    http_response_code(ResponseCodes::NO_CONTENT);
                } else {
                    http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                    header(Main::JSON_HEADER);
                    echo Main::SimpleMessageJson($insertStmt->error);
                }
            } else {
                http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                header(Main::JSON_HEADER);
                echo Main::SimpleMessageJson($insertStmt->error);
            }
            $insertStmt->close();
        } else {
            http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
            header(Main::JSON_HEADER);
            echo Main::SimpleMessageJson($conn->error);
        }
    } else {
        http_response_code(ResponseCodes::FORBIDDEN);
        header(Main::JSON_HEADER);
        echo Main::SimpleMessageJson("You are not authorized");
    }
} else {
    http_response_code(ResponseCodes::FORBIDDEN);
    header(Main::JSON_HEADER);
    echo Main::SimpleMessageJson("Only POST is allowed");
}

$conn->close();
$userConn->close();
