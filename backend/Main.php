<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
require_once 'generateFunctions.php';
require_once 'ResponseCodes.php';

class Main
{

    const JSON_HEADER = 'Content-Type: application/json';
    const DATABASE_NAME = "joserodriguezrivas";

    /**
     * @return false|mysqli
     */
    public static function ConnectToDb()
    {
        return Main::connectToAnyDB(Main::DATABASE_NAME);
    }

    public static function ConnectToUsersDb() {
        return Main::connectToAnyDB("tinycountrygames_users");
    }

    public static function SimpleMessageJson($message) {
        return json_encode(array("message"=>$message));
    }

    /**
     * @param $dbName string
     * @return false|mysqli
     */
    private static function connectToAnyDB($dbName)
    {
        $serverName = getenv("HTTP_DB_HOST");
        $username = getEnv("HTTP_DB_USER");
        $password = getEnv("HTTP_DB_PASS");
        $port = getEnv("HTTP_DB_PORT");
        $conn = mysqli_connect($serverName, $username, $password, $dbName, $port);
        if (mysqli_connect_errno()) {
            die("Connect failed: %s\n" . mysqli_connect_error());
            exit();
        }
        return $conn;
    }

}
