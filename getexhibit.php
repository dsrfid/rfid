<?php
$q = intval($_GET['q']);

$con = mysqli_connect('dsrfid.czpcf9b9qafd.us-east-1.rds.amazonaws.com', 'dsrfid', 'dspace14', 'DSrfid');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ajax_demo");
$sql="SELECT * FROM Exhibit_Cards WHERE ExhibitID= '".$q."'";
$result = mysqli_query($con,$sql);

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);

mysqli_close($con);
?>
