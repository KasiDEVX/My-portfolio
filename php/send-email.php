<?php

// Ensure the script is only executed via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate inputs
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : 'Anonymous';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : null;
    $subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : 'Contact Form Submission';
    $contact_message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

    // Check if required fields are provided
    if (!$email || empty($contact_message)) {
        echo "Invalid input. Please provide a valid email and message.";
        exit;
    }

    // Set the recipient email address (replace with your email)
    $to = "your-email@example.com";

    // Construct the email message
    $message = "Email from: " . $name . "<br />";
    $message .= "Email address: " . $email . "<br />";
    $message .= "Message: <br />";
    $message .= nl2br($contact_message);
    $message .= "<br /> ----- <br /> This email was sent from your site's contact form.";

    // Set the From header
    $from = $name . " <" . $email . ">";

    // Email Headers
    $headers = "From: " . $from . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "OK";
    } else {
        echo "Something went wrong. Please try again.";
    }
} else {
    echo "Invalid request method.";
}

?>