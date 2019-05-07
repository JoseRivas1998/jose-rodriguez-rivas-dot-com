<?php

require_once 'Main.php';

$conn = Main::ConnectToDb();

$sql = "SELECT * FROM technologies";

$selectStmt = $conn->prepare($sql);
$output = array();

if ($selectStmt) {
    if ($selectStmt->execute()) {
        $selectRes = $selectStmt->get_result();
        if ($selectRes) {
            if ($selectRes->num_rows > 0) {
                while ($row = $selectRes->fetch_assoc()) {
                    array_push($output, $row);
                }
            }
            $selectRes->close();
        }
        $selectStmt->close();
    } else {
        http_response_code(ResponseCodes::INTERNAL_SERVER_ERROR);
    }
}


mysqli_close($conn);
header(Main::JSON_HEADER);

echo json_encode($output);
