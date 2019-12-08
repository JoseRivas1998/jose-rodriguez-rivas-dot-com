<?php

session_start();
require_once 'Main.php';
require_once 'Users.php';

$userConn = Main::ConnectToUsersDb();
$conn = Main::ConnectToDb();

$sessionId = session_id();

if ($_POST) {
    if (Users::IsSessionAdmin($userConn, $sessionId)) {
        $id = intval($_POST["id"]);
        $deleteTechsStmt = $conn->prepare("DELETE FROM portfolio_technologies WHERE entry = ?");
        if($deleteTechsStmt) {
            if($deleteTechsStmt->bind_param("i", $id)) {
                if($deleteTechsStmt->execute()) {
                    $deleteEntryStmt = $conn->prepare("DELETE FROM portfolio_entries WHERE id = ?");
                    if($deleteEntryStmt) {
                        if($deleteEntryStmt->bind_param("i", $id)) {
                            if($deleteEntryStmt->execute()) {
                                http_response_code(ResponseCodes::OK);
                            } else {
                                header(Main::JSON_HEADER);
                                http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                                echo Main::SimpleMessageJson($deleteEntryStmt->error);
                            }
                        } else {
                            header(Main::JSON_HEADER);
                            http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                            echo Main::SimpleMessageJson($deleteEntryStmt->error);
                        }
                        $deleteEntryStmt->close();
                    } else {
                        header(Main::JSON_HEADER);
                        http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                        echo Main::SimpleMessageJson($conn->error);
                    }
                } else {
                    header(Main::JSON_HEADER);
                    http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                    echo Main::SimpleMessageJson($deleteTechsStmt->error);
                }
            } else {
                header(Main::JSON_HEADER);
                http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                echo Main::SimpleMessageJson($conn->error);
            }
            $deleteTechsStmt->close();
        } else {
            header(Main::JSON_HEADER);
            http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
            echo Main::SimpleMessageJson($conn->error);
        }
    } else {
        header(Main::JSON_HEADER);
        http_response_code(ResponseCodes::FORBIDDEN);
        echo Main::SimpleMessageJson("You are not authorized");
    }
} else {
    header(Main::JSON_HEADER);
    http_response_code(ResponseCodes::BAD_REQUEST);
    echo Main::SimpleMessageJson("Only POST is supported.");
}

$userConn->close();
$conn->close();
