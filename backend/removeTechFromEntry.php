<?php

session_start();
require_once 'Main.php';
require_once 'Users.php';

$userConn = Main::ConnectToUsersDb();
$conn = Main::ConnectToDb();

$sessionId = session_id();

if($_POST) {
    if($_POST["techId"]) {
        $techId = intval($_POST["techId"]);
        if($_POST["entryId"]) {
            $entryId = intval($_POST["entryId"]);
            $removeStmt = $conn->prepare("DELETE FROM portfolio_technologies WHERE technology = ? AND entry = ?");
            if($removeStmt) {
                $removeStmt->bind_param("ii", $techId, $entryId);
                if($removeStmt->execute()) {
                    http_response_code(ResponseCodes::NO_CONTENT);
                } else {
                    header(Main::JSON_HEADER);
                    http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                    echo Main::SimpleMessageJson($removeStmt->error);
                }
                $removeStmt->close();
            } else {
                header(Main::JSON_HEADER);
                http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                echo Main::SimpleMessageJson($conn->error);
            }
        } else {
            header(Main::JSON_HEADER);
            http_response_code(ResponseCodes::BAD_REQUEST);
            echo Main::SimpleMessageJson("Missing entryId");
        }
    } else {
        header(Main::JSON_HEADER);
        http_response_code(ResponseCodes::BAD_REQUEST);
        echo Main::SimpleMessageJson("Missing techId");
    }
} else {
    header(Main::JSON_HEADER);
    http_response_code(ResponseCodes::BAD_REQUEST);
    echo Main::SimpleMessageJson("Only POST is supported.");
}

$userConn->close();
$conn->close();
