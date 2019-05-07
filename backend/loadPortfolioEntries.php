<?php
require_once 'Main.php';

$conn = Main::ConnectToDb();

$sql = "SELECT * FROM portfolio_entries ORDER BY isOnGoing DESC, year DESC, id DESC";

$selectPortStmt = $conn->prepare($sql);

$output = array();

if($selectPortStmt) {
    if($selectPortStmt->execute()) {
        $selectPortRes = $selectPortStmt->get_result();
        if($selectPortRes) {
            if($selectPortRes->num_rows > 0) {
                while($row = $selectPortRes->fetch_assoc()) {
                    $toAdd = $row;
                    $selectTechsSql = "SELECT t.id, t.name FROM portfolio_technologies JOIN technologies t on portfolio_technologies.technology = t.id WHERE entry = ?";
                    $selectTechsStmt = $conn->prepare($selectTechsSql);
                    if($selectTechsStmt) {
                        if($selectTechsStmt->bind_param("i", $toAdd["id"])) {
                            if($selectTechsStmt->execute()) {
                                $selectTechsRes = $selectTechsStmt->get_result();
                                if($selectTechsRes) {
                                    if($selectTechsRes->num_rows > 0) {
                                        $toAdd["technologies"] = array();
                                        while($tech = $selectTechsRes->fetch_assoc()) {
                                            array_push($toAdd["technologies"], $tech);
                                        }
                                    }
                                    $selectTechsRes->close();
                                }
                            }
                        }
                        $selectTechsStmt->close();
                    }
                    array_push($output, $toAdd);
                }
            }
            $selectPortRes->close();
        }
    }
    $selectPortStmt->close();
}

mysqli_close($conn);

header(Main::JSON_HEADER);
echo json_encode($output);
