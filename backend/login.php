<?php
require_once 'Main.php';
require_once 'Users.php';

session_start();

$userConn = Main::ConnectToUsersDb();

$sessionId = session_id();

Users::ClearSessions($userConn, $sessionId);

if($_POST) {
    if($_POST["username"]) {
        if($_POST["password"]) {
            $username = $_POST["username"];
            $password = $_POST["password"];
            if(Users::UserExists($userConn, $username)) {
                $selectStmt = $userConn->prepare("SELECT * FROM users WHERE username = ?");
                if($selectStmt) {
                    $selectStmt->bind_param("s", $username);
                    if($selectStmt->execute()) {
                        $selectRes = $selectStmt->get_result();
                        if($selectRes) {
                            $user = $selectRes->fetch_assoc();
                            $hash = $user["passHash"];
                            if(hash_equals($hash, crypt($password, $hash))) {
                                $insertStmt = $userConn->prepare("INSERT INTO userSessions(username, sessionId, expirationDate) VALUES (?, ?, CURRENT_DATE() + INTERVAL 1 DAY)");
                                if($insertStmt) {
                                    $insertStmt->bind_param("ss", $user["username"], $sessionId);
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
                                    echo Main::SimpleMessageJson($userConn->error);
                                }
                            } else {
                                header(Main::JSON_HEADER);
                                http_response_code(ResponseCodes::BAD_REQUEST);
                                echo Main::SimpleMessageJson("Incorrect password.");
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
                    echo Main::SimpleMessageJson($userConn->error);
                }
            } else {
                header(Main::JSON_HEADER);
                http_response_code(ResponseCodes::BAD_REQUEST);
                echo Main::SimpleMessageJson("User not found.");
            }
        } else {
            header(Main::JSON_HEADER);
            http_response_code(ResponseCodes::BAD_REQUEST);
            echo Main::SimpleMessageJson("Missing input: \"password\"");
        }
    } else {
        header(Main::JSON_HEADER);
        http_response_code(ResponseCodes::BAD_REQUEST);
        echo Main::SimpleMessageJson("Missing input: \"username\"");
    }
} else {
    header(Main::JSON_HEADER);
    http_response_code(ResponseCodes::BAD_REQUEST);
    echo Main::SimpleMessageJson("No input given.");
}

$userConn->close();
