<?php
$RFIDID = intval($_GET['RFIDID']);
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
$sql="INSERT INTO Exhibit_RFID (RFID_Customer_RFIDID, Exhibit_ExhibitID) VALUES (".$RFIDID.", ".$exhibitID.");";

$result = mysqli_query($con,$sql);
echo mysqli_error($con);

$sql2="INSERT INTO Exhibit_Data (Title, Subtext, Exhibit_Image_Exhibit_ImageID, Exhibit_Sound_Exhibit_SoundID, Exhibit_RFID_Exhibit_RFID_ID) VALUES ('".mysqli_real_escape_string($con, $title)."', '".mysqli_real_escape_string($con, $text)."', ".$imageID.", ".$soundID.", ".mysqli_insert_id($con).");";

$result2 = mysqli_query($con,$sql2);
echo mysqli_error($con);

echo "Added card: ".$title;

mysqli_close($con);
?>


