<?php
ini_set('display_errors',1);
error_reporting(E_ALL);
$target_dir = "uploadsounds/";
$target_file = $target_dir . basename($_FILES["soundToUpload"]["name"]);
$fileName = htmlspecialchars($_POST['soundName']);
$filePath = htmlspecialchars($_POST['filePath']);
$uploadOk = 1;
$addtoDB = 0;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
echo 'Uploading Sound.';
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["soundToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "mp3" && $imageFileType != "wav") {
    echo "Sorry, only MP3, & WAV files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
    exit();
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["soundToUpload"]["tmp_name"], $target_file)) {
        echo "The sound ". basename( $_FILES["soundToUpload"]["name"]). " has been uploaded.";
        $addtoDB = 1;
    } else {
        echo "Sorry, there was an error uploading your file. Your file was not uploaded.";
        exit();
    }
}

if ($addtoDB == 1) {
  $con = mysqli_connect('dsrfid.czpcf9b9qafd.us-east-1.rds.amazonaws.com', 'dsrfid', 'dspace14', 'DSrfid');
  if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
  }

  mysqli_select_db($con,"ajax_demo");
  $sql="INSERT INTO Exhibit_Sound (name, sound) VALUES ('".mysqli_real_escape_string($con, $fileName)."', '".mysqli_real_escape_string($con, $filePath).mysqli_real_escape_string($con, $target_file)."');";

  $result = mysqli_query($con,$sql);

  echo mysqli_error($con);

  mysqli_close($con);
}
?>
