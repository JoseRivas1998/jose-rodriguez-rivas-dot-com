<?php


class Users
{
    /**
     * @param $userConn mysqli
     * @param $username string
     * @return bool
     */
    public static function UserExists($userConn, $username)
    {
        $selectStmt = $userConn->prepare("SELECT * FROM users WHERE username = ?");
        if ($selectStmt) {
            $selectStmt->bind_param("s", $username);
            $selectStmt->execute();
            $selectRes = $selectStmt->get_result();
            if ($selectRes) {
                $result = $selectRes->num_rows > 0;
                $selectRes->close();
                return $result;
            }
            $selectStmt->close();
            return false;
        }
        return false;
    }

    /**
     * @return bool
     * @param $userConn mysqli
     * @param $sessionId string
     */
    public static function SessionExists($userConn, $sessionId)
    {
        $selectStmt = $userConn->prepare("SELECT * FROM usersessions WHERE sessionId = ? AND expirationDate >= CURRENT_DATE() LIMIT 1");
        if ($selectStmt) {
            $selectStmt->bind_param("s", $sessionId);
            $selectStmt->execute();
            $selectRes = $selectStmt->get_result();
            if ($selectRes) {
                $result = $selectRes->num_rows > 0;
                $selectRes->close();
                return $result;
            }
            $selectStmt->close();
            return false;
        }
        return false;
    }

    /**
     *
     * @param $userConn mysqli
     * @param $sessionId string
     * @return array|null
     */
    public static function GetUser($userConn, $sessionId)
    {
        $selectSessionStmt = $userConn->prepare("SELECT * FROM usersessions WHERE sessionId = ? AND expirationDate >= CURRENT_DATE() LIMIT 1");
        $output = null;
        if($selectSessionStmt) {
            $selectSessionStmt->bind_param("s", $sessionId);
            $selectSessionStmt->execute();
            $selectSessionRes = $selectSessionStmt->get_result();
            if($selectSessionRes) {
                if($selectSessionRes->num_rows > 0) {
                    $sessionRow = $selectSessionRes->fetch_assoc();
                    $username = $sessionRow["username"];
                    $selectUserStmt = $userConn->prepare("SELECT * FROM users WHERE username = ?");
                    if($selectUserStmt) {
                        $selectUserStmt->bind_param("s", $username);
                        $selectUserStmt->execute();
                        $selectUserRes = $selectUserStmt->get_result();
                        if($selectUserRes) {
                            if($selectUserRes->num_rows > 0) {
                                $output = $selectUserRes->fetch_assoc();
                            }
                            $selectUserRes->close();
                        }
                        $selectUserStmt->close();
                    }
                }
                $selectSessionRes->close();
            }
            $selectSessionStmt->close();
        }
        return $output;
    }

    /**
     * @param $userConn mysqli
     * @param $sessionId string
     */
    public static function ClearSessions($userConn, $sessionId) {
        if(Users::SessionExists($userConn, $sessionId)) {
            $deleteStmt = $userConn->prepare("DELETE FROM usersessions WHERE sessionId = ?");
            if($deleteStmt) {
                $deleteStmt->bind_param("s", $sessionId);
                $deleteStmt->execute();
                $deleteStmt->close();
            }
        }
    }

    /**
     * @param $userConn mysqli
     * @param $sessionId string
     * @return bool
     */
    public static function IsSessionAdmin($userConn, $sessionId) {
        $result = false;
        if(Users::SessionExists($userConn, $sessionId)) {
            $user = Users::GetUser($userConn, $sessionId);
            if($user) {
                $selectStmt = $userConn->prepare("SELECT * FROM adminusers WHERE userId = ?");
                if($selectStmt) {
                    $userId = intval($user["id"]);
                    $selectStmt->bind_param("i", $userId);
                    $selectStmt->execute();
                    $selectRes = $selectStmt->get_result();
                    if($selectRes) {
                        $result = $selectRes->num_rows > 0;
                        $selectRes->close();
                    }
                    $selectStmt->close();
                }
            }
        }
        return $result;
    }

}