<?php
	error_reporting(E_ERROR);

	// Save form submission.
	if ($_POST["name"]) {
		$name = $_POST["name"];
		$data = $_POST["data"];
		$filename = "$name.txt";
		file_put_contents($filename, $data); 
		$saved = true;
	}
	$groom_saved = file_get_contents("groom.txt");
	$bride_saved = file_get_contents("bride.txt");
?>
