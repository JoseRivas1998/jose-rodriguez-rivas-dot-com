<?php

session_start();

require_once 'Main.php';
require_once 'Users.php';

$userConn = Main::ConnectToUsersDb();
$conn = Main::ConnectToDb();

$sessionId = session_id();

$id = intval($_POST["id"]);
$name = $_POST["name"];
$year = intval($_POST["year"]);
$description = $_POST["description"];
$image_url = $_POST["image_url"];
$target_url = $_POST["target_url"];
$isOnGoing = $_POST["isOnGoing"] === 'true' ? 1 : 0;

$updateStmt = $conn->prepare("UPDATE portfolio_entries SET name = ?, year = ?, description = ?, image_url = ?, target_url = ?, isOnGoing = ? WHERE id = ?");
if($updateStmt) {
    $updateStmt->bind_param("sisssii", $name, $year, $description, $image_url, $target_url, $isOnGoing, $id);
    if($updateStmt->execute()) {
        http_response_code(ResponseCodes::NO_CONTENT);
    } else {
        header(Main::JSON_HEADER);
        http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
        echo Main::SimpleMessageJson($conn->error);
    }
    $updateStmt->close();
} else {
    header(Main::JSON_HEADER);
    http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
    echo Main::SimpleMessageJson($conn->error);
}

$userConn->close();
$conn->close();
