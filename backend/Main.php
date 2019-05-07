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
        $serverName = getenv("HTTP_DB_HOST");
        $username = getEnv("HTTP_DB_USER");
        $password = getEnv("HTTP_DB_PASS");
        $port = getEnv("HTTP_DB_PORT");
        $conn = mysqli_connect($serverName, $username, $password, Main::DATABASE_NAME, $port);
        if (mysqli_connect_errno()) {
            die("Connect failed: %s\n" . mysqli_connect_error());
            exit();
        }
        return $conn;
    }

}
