<?php
session_start();

require_once 'Main.php';
require_once 'Users.php';

$conn = Main::ConnectToDb();
$userConn = Main::ConnectToUsersDb();

$sessionId = session_id();

if ($_POST) {
    if (Users::IsSessionAdmin($userConn, $sessionId)) {
        $techId = intval($_POST["id"]);
        $deletePortfolioStmt = $conn->prepare("DELETE FROM portfolio_technologies WHERE technology = ?;");
        if ($deletePortfolioStmt) {
            if ($deletePortfolioStmt->bind_param("i", $techId)) {
                if ($deletePortfolioStmt->execute()) {
                    $deleteStmt = $conn->prepare("DELETE FROM technologies WHERE id = ?;");
                    if ($deleteStmt) {
                        if ($deleteStmt->bind_param("i", $techId)) {
                            if ($deleteStmt->execute()) {
                                http_response_code(ResponseCodes::NO_CONTENT);
                            } else {
                                http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                                header(Main::JSON_HEADER);
                                echo Main::SimpleMessageJson($deleteStmt->error);
                            }
                        } else {
                            http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                            header(Main::JSON_HEADER);
                            echo Main::SimpleMessageJson($deleteStmt->error);
                        }
                        $deleteStmt->close();
                    } else {
                        http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                        header(Main::JSON_HEADER);
                        echo Main::SimpleMessageJson($conn->error);
                    }
                } else {
                    http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                    header(Main::JSON_HEADER);
                    echo Main::SimpleMessageJson($deletePortfolioStmt->error);
                }
            } else {
                http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                header(Main::JSON_HEADER);
                echo Main::SimpleMessageJson($deletePortfolioStmt->error);
            }
            $deletePortfolioStmt->close();
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
