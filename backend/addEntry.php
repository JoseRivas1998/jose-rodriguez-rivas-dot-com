<?php

require_once 'Main.php';
require_once 'Users.php';

session_start();

$userConn = Main::ConnectToUsersDb();
$conn = Main::ConnectToDb();

$sessionId = session_id();

if (Users::IsSessionAdmin($userConn, $sessionId)) {
    $name = $_POST["name"];
    $year = intval($_POST["year"]);
    $description = $_POST["description"];
    $image_url = $_POST["image_url"];
    $target_url = $_POST["target_url"];
    $isOnGoing = $_POST["isOnGoing"] === 'true' ? 1 : 0;
    $techs = array();
    foreach ($_POST["techs"] as $tech) {
        array_push($techs, intval($tech));
    }
    $insertEntryStmt = $conn->prepare("INSERT INTO portfolio_entries(name, year, description, image_url, target_url, isOnGoing) VALUES (?, ?, ?, ?, ?, ?)");
    if ($insertEntryStmt) {
        $insertEntryStmt->bind_param("sisssi", $name, $year, $description, $image_url, $target_url, $isOnGoing);
        if ($insertEntryStmt->execute()) {
            $entryId = $insertEntryStmt->insert_id;
            $insertProtTechStmt = $conn->prepare("INSERT INTO portfolio_technologies(technology, entry) VALUES (?, ?)");
            if ($insertProtTechStmt) {
                foreach ($techs as $tech) {
                    $insertProtTechStmt->bind_param("ii", $tech, $entryId);
                    $insertProtTechStmt->execute();
                }
            } else {
                header(Main::JSON_HEADER);
                http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                echo Main::SimpleMessageJson($conn->error);
            }
        } else {
            header(Main::JSON_HEADER);
            http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
            echo Main::SimpleMessageJson($insertEntryStmt->error);
        }
        $insertEntryStmt->close();
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

$conn->close();
$userConn->close();
