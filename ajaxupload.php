<?php
// Count total files
$countfiles_1 = count($_FILES['files-1']['name']);
$countfiles_2 = count($_FILES['files-2']['name']);
$countfiles_3 = count($_FILES['files-3']['name']);
$countfiles_4 = count($_FILES['files-4']['name']);
$countfiles_5 = count($_FILES['files-5']['name']);
$countfiles_6 = count($_FILES['files-6']['name']);
$comment__files = count($_FILES['comment__files']['name']);

// Upload Location
$upload_location = "uploads/";

// To store uploaded files path
$files_arr = array();
for($index = 0;$index < $comment__files;$index++){

   if(isset($_FILES['comment__files']['name'][$index]) && $_FILES['comment__files']['name'][$index] != ''){
      // File name
      $filename = $_FILES['comment__files']['name'][$index];

      // Get extension
      $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

      // Valid image extension
      $valid_ext = array("pdf","jpg","png","sql","dwg","docx");

      // Check extension
      if(in_array($ext, $valid_ext)){

         // File path
         $path = $upload_location.$filename;

         // Upload file
         if(move_uploaded_file($_FILES['comment__files']['tmp_name'][$index],$path)){
            $files_arr[] = $path;
         }
      }
   }
}
// Loop all files
for($index = 0;$index < $countfiles_1;$index++){

   if(isset($_FILES['files-1']['name'][$index]) && $_FILES['files-1']['name'][$index] != ''){
      // File name
      $filename = $_FILES['files-1']['name'][$index];

      // Get extension
      $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

      // Valid image extension
      $valid_ext = array("pdf");

      // Check extension
      if(in_array($ext, $valid_ext)){

         // File path
         $path = $upload_location.$filename;

         // Upload file
         if(move_uploaded_file($_FILES['files-1']['tmp_name'][$index],$path)){
            $files_arr[] = $path;
         }
      }
   }
}
for($index = 0;$index < $countfiles_2;$index++){

   if(isset($_FILES['files-2']['name'][$index]) && $_FILES['files-2']['name'][$index] != ''){
      // File name
      $filename = $_FILES['files-2']['name'][$index];

      // Get extension
      $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

      // Valid image extension
      $valid_ext = array("pdf");

      // Check extension
      if(in_array($ext, $valid_ext)){

         // File path
         $path = $upload_location.$filename;

         // Upload file
         if(move_uploaded_file($_FILES['files-2']['tmp_name'][$index],$path)){
            $files_arr[] = $path;
         }
      }
   }
}

for($index = 0;$index < $countfiles_3;$index++){

   if(isset($_FILES['files-3']['name'][$index]) && $_FILES['files-3']['name'][$index] != ''){
      // File name
      $filename = $_FILES['files-3']['name'][$index];

      // Get extension
      $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

      // Valid image extension
      $valid_ext = array("pdf");

      // Check extension
      if(in_array($ext, $valid_ext)){

         // File path
         $path = $upload_location.$filename;

         // Upload file
         if(move_uploaded_file($_FILES['files-3']['tmp_name'][$index],$path)){
            $files_arr[] = $path;
         }
      }
   }
}

for($index = 0;$index < $countfiles_4;$index++){

   if(isset($_FILES['files-4']['name'][$index]) && $_FILES['files-4']['name'][$index] != ''){
      // File name
      $filename = $_FILES['files-4']['name'][$index];

      // Get extension
      $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

      // Valid image extension
      $valid_ext = array("pdf");

      // Check extension
      if(in_array($ext, $valid_ext)){

         // File path
         $path = $upload_location.$filename;

         // Upload file
         if(move_uploaded_file($_FILES['files-4']['tmp_name'][$index],$path)){
            $files_arr[] = $path;
         }
      }
   }
}

for($index = 0;$index < $countfiles_5;$index++){

   if(isset($_FILES['files-5']['name'][$index]) && $_FILES['files-5']['name'][$index] != ''){
      // File name
      $filename = $_FILES['files-5']['name'][$index];

      // Get extension
      $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

      // Valid image extension
      $valid_ext = array("pdf");

      // Check extension
      if(in_array($ext, $valid_ext)){

         // File path
         $path = $upload_location.$filename;

         // Upload file
         if(move_uploaded_file($_FILES['files-5']['tmp_name'][$index],$path)){
            $files_arr[] = $path;
         }
      }
   }
}

for($index = 0;$index < $countfiles_6;$index++){

   if(isset($_FILES['files-6']['name'][$index]) && $_FILES['files-6']['name'][$index] != ''){
      // File name
      $filename = $_FILES['files-6']['name'][$index];

      // Get extension
      $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

      // Valid image extension
      $valid_ext = array("pdf");

      // Check extension
      if(in_array($ext, $valid_ext)){

         // File path
         $path = $upload_location.$filename;

         // Upload file
         if(move_uploaded_file($_FILES['files-6']['tmp_name'][$index],$path)){
            $files_arr[] = $path;
         }
      }
   }
}


echo json_encode($files_arr);
die;