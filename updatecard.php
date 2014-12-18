<?php
$dataID = intval($_GET['dataID']);
$imageID = intval($_GET['imageID']);
$soundID = intval($_GET['soundID']);
$exhibitID = intval($_GET['exhibitID']);
$title = htmlspecialchars($_GET['title']);
$text = htmlspecialchars($_GET['text']);

$con = mysqli_connect('dsrfid.czpcf9b9qafd.us-east-1.rds.amazonaws.com', 'dsrfid', 'dspace14', 'DSrfid');

if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ajax_demo");
$sql="UPDATE Exhibit_Data SET Title='".mysqli_real_escape_string($con, $title)."', Subtext='".mysqli_real_escape_string($con, $text)."', Exhibit_Image_Exhibit_ImageID=".$imageID.", Exhibit_Sound_Exhibit_SoundID=".$soundID." WHERE Exhibit_DataID= ".$dataID.";";

$sql2="UPDATE Exhibit_RFID INNER JOIN Exhibit_Data ON Exhibit_RFID.Exhibit_RFID_ID=Exhibit_Data.Exhibit_RFID_Exhibit_RFID_ID SET Exhibit_ExhibitID=".$exhibitID." WHERE Exhibit_Data.Exhibit_DataID=".$dataID.";";

$result = mysqli_query($con,$sql);
echo mysqli_error($con);

$result2 = mysqli_query($con,$sql2);
echo mysqli_error;

mysqli_close($con);
?>

