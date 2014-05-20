
<?php
// Email Submit
// Note: filter_var() requires PHP >= 5.2.0
if ( isset($_POST['email']) && isset($_POST['full-name']) && isset($_POST['dispensary-name']) && isset($_POST['number']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ) {
 
  // detect & prevent header injections
  $test = "/(content-type|bcc:|cc:|to:)/i";
  foreach ( $_POST as $key => $val ) {
    if ( preg_match( $test, $val ) ) {
      exit;
    }
  }
  
  $subject = $_POST['dispensary-name'];
  $name = $_POST['full-name'];
  $email = $_POST['email'];
  $number = $_POST['number'];

  $message = "Full Name: $name\r\nDispensary Name: $subject\r\nEmail: $email\r\Number: $number";
  // //
  mail( "meghhv@gmail.com", $subject, $message, "From:" . $_POST['email'] );
 
  //      ^
  //  Replace with your email 
  echo $message;
}
?>