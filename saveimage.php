<?php
$name = htmlspecialchars($_GET['name']);
$path = htmlspecialchars($_GET['path']);

$con = mysqli_connect('dsrfid.czpcf9b9qafd.us-east-1.rds.amazonaws.com', 'dsrfid', 'dspace14', 'DSrfid');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ajax_demo");
$sql="INSERT INTO Exhibit_Image (name, image) VALUES ('".mysqli_real_escape_string($con, $name)."', '".mysqli_real_escape_string($con, $path)."');";

$result = mysqli_query($con,$sql);

echo mysqli_error($con);

mysqli_close($con);
?>


