<?php

require_once 'Main.php';

$conn = Main::ConnectToDb();
header(Main::JSON_HEADER);

$selectStmt = $conn->prepare("SELECT id, name FROM portfolio_entries ORDER BY isOnGoing DESC, year DESC, id DESC");

if ($selectStmt) {
    if ($selectStmt->execute()) {
        $selectRes = $selectStmt->get_result();
        if ($selectRes) {
            $output = array();
            if ($selectRes->num_rows > 0) {
                while ($row = $selectRes->fetch_assoc()) {
                    array_push($output, $row);
                }
            }
            echo json_encode($output);
            $selectRes->close();
        } else {
            http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
            echo Main::SimpleMessageJson($selectStmt->error);
        }
    } else {
        http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
        echo Main::SimpleMessageJson($selectStmt->error);
    }
    $selectStmt->close();
} else {
    http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
    echo Main::SimpleMessageJson($conn->error);
}

$conn->close();

