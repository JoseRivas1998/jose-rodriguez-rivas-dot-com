<?php

require_once 'Main.php';
header(Main::JSON_HEADER);
$conn = Main::ConnectToDb();

if ($_POST) {
    if ($_POST["id"]) {
        $entryId = intval($_POST["id"]);
        $selectEntryStmt = $conn->prepare("SELECT * FROM portfolio_entries WHERE id = ?");
        if ($selectEntryStmt) {
            $selectEntryStmt->bind_param("i", $entryId);
            if ($selectEntryStmt->execute()) {
                $selectEntryRes = $selectEntryStmt->get_result();
                if ($selectEntryRes) {
                    if ($selectEntryRes->num_rows > 0) {
                        $entry = $selectEntryRes->fetch_assoc();
                        $selectTechStmt = $conn->prepare("SELECT * FROM portfolio_technologies WHERE entry = ?");
                        if ($selectTechStmt) {
                            $selectTechStmt->bind_param("i", $entryId);
                            if ($selectTechStmt->execute()) {
                                $selectTechRes = $selectTechStmt->get_result();
                                if ($selectTechRes) {
                                    $entry["technologies"] = array();
                                    if ($selectTechRes->num_rows > 0) {
                                        while ($row = $selectTechRes->fetch_assoc()) {
                                            array_push($entry["technologies"], intval($row["technology"]));
                                        }
                                    }
                                    echo json_encode($entry);
                                    $selectTechRes->close();
                                } else {
                                    http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                                    echo Main::SimpleMessageJson($selectTechStmt->error);
                                }
                            } else {
                                http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                                echo Main::SimpleMessageJson($selectTechStmt->error);
                            }
                            $selectTechStmt->close();
                        } else {
                            http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                            echo Main::SimpleMessageJson($conn->error);
                        }
                    }
                    $selectEntryRes->close();
                } else {
                    http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                    echo Main::SimpleMessageJson($selectEntryStmt->error);
                }
            } else {
                http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
                echo Main::SimpleMessageJson($selectEntryStmt->error);
            }
            $selectEntryStmt->close();
        } else {
            http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
            echo Main::SimpleMessageJson($conn->error);
        }
    } else {
        http_response_code(ResponseCodes::BAD_REQUEST);
        echo Main::SimpleMessageJson("Missing id parameter.");
    }
} else {
    http_response_code(ResponseCodes::BAD_REQUEST);
    echo Main::SimpleMessageJson("Only POST is supported.");
}

$conn->close();

