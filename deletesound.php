<?php
$dataID = intval($_GET['ID']);
$filePath = htmlspecialchars($_GET['filepath']);

$fullPath = "uploadsounds/".basename($filePath);

$con = mysqli_connect('dsrfid.czpcf9b9qafd.us-east-1.rds.amazonaws.com', 'dsrfid', 'dspace14', 'DSrfid');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

if ($dataID == 1) {
  echo "Can't delete this image";
  die();
}

mysqli_select_db($con,"ajax_demo");
$sql="UPDATE Exhibit_Data SET Exhibit_Sound_Exhibit_SoundID = 1 WHERE Exhibit_Sound_Exhibit_SoundID=".$dataID.";";
$result = mysqli_query($con,$sql);

$error = mysqli_error($con);

if (!empty($error)) {
  echo $error;
  $hadError = true;
  die();
}

$sql2="DELETE FROM Exhibit_Sound where Exhibit_SoundID=".$dataID.";";
$result2 = mysqli_query($con, $sql2);

$error2 = mysqli_error($con);

$hadError = false;

if (!empty($error2)) {
  echo $error2;
  $hadError = true;
  die();
}

if(unlink($fullPath)) {
  echo "Sound deleted!";
}
else {
  print_r(error_get_last());
}

mysqli_close($con);
?>

