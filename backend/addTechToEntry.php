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
            $selectStmt = $conn->prepare("SELECT * FROM portfolio_technologies WHERE entry = ? AND technology = ?");
            if($selectStmt) {
                $selectStmt->bind_param("ii", $entryId, $techId);
                if($selectStmt->execute()) {
                    $selectRes = $selectStmt->get_result();
                    if($selectRes) {
                        if($selectRes->num_rows == 0) {
                            $insertStmt = $conn->prepare("INSERT INTO portfolio_technologies(technology, entry) VALUES (?, ?)");
                            if($insertStmt) {
                                $insertStmt->bind_param("ii", $techId, $entryId);
                                if($insertStmt->execute()) {
                                    http_response_code(ResponseCodes::NO_CONTENT);
                                } else {
                                    header(Main::JSON_HEADER);
                                    http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                                    echo Main::SimpleMessageJson($insertStmt->error);
                                }
                                $insertStmt->close();
                            } else {
                                header(Main::JSON_HEADER);
                                http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                                echo Main::SimpleMessageJson($conn->error);
                            }
                        } else {
                            header(Main::JSON_HEADER);
                            http_response_code(ResponseCodes::BAD_REQUEST);
                            echo Main::SimpleMessageJson("That tech already is in the entry");
                        }
                        $selectRes->close();
                    } else {
                        header(Main::JSON_HEADER);
                        http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                        echo Main::SimpleMessageJson($selectStmt->error);
                    }
                } else {
                    header(Main::JSON_HEADER);
                    http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                    echo Main::SimpleMessageJson($selectStmt->error);
                }
                $selectStmt->close();
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
