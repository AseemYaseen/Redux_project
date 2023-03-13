<?php require('./connection.php'); ?>

<?php

error_reporting(E_ALL);
ini_set('display_error', 1);
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods:*');
header('Access-Control-Allow-Origin:*');


$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case "POST":
        $name = $_POST["name"];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $user_id = $path[5];
        if ($_FILES["file"] == null) {
            $file = "";
        } else {
            $file = $_FILES["file"];
        }
        if (($_POST["name"] == 'undefined')) {
            $name = "";
        }

        if ($_POST["email"] == 'undefined') {
            $email = "";
        }
        if ($_POST["password"] == 'undefined') {
            $password = "";
        }
        if ($file != "") {
            $targetDir = "../src/images/";
            $fileName = basename($file["name"]);
            $targetPath = $targetDir . $fileName;

            if (move_uploaded_file($file["tmp_name"], $targetPath)) {
                echo "File uploaded successfully";
                $sql = "UPDATE users SET ";
                if ($name != "") {
                    $sql .= "name = ? , ";
                }
                if ($email != "") {
                    $sql .= " email = ? , ";
                }
                if ($password != "") {
                    $sql .= " password = ? , ";
                }
                $sql .= " image = ? WHERE id = ? ";
                $query = $conn->prepare($sql);
                $userArray = [$name, $email, $password];
                $updateArray = [];
                for ($i = 0; $i <= 3; $i++) {
                    if ($userArray[$i] != "") {
                        array_push($updateArray, $userArray[$i]);
                    }
                }
                array_push($updateArray, $fileName);
                array_push($updateArray, $user_id);
                print_r($updateArray);
                $query->execute([...$updateArray]);

                break;
            } else {
                echo "Error uploading file";
            }
        } else {
            $sql = "UPDATE users SET";
            if ($name != "") {
                $sql .= " name = ? ,";
            }
            if ($email != "") {
                $sql .= " email = ? ,";
            }
            if ($password != "") {
                $sql .= " password = ?,";
            }
            $sql .= " WHERE id = ? ";
            $stmt = substr_replace($sql, "", -15, -14);
            $query = $conn->prepare($stmt);
            $userArray = [$name, $email, $password];
            $updateArray = [];
            for ($i = 0; $i <= 3; $i++) {
                if ($userArray[$i] != "") {
                    array_push($updateArray, $userArray[$i]);
                }
            }
            array_push($updateArray, $user_id);
            $query->execute([...$updateArray]);
            break;
        }
}
