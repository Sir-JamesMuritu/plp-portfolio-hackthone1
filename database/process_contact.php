<?php
header('Content-Type: application/json');
require_once 'config.php';

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data
    $name = sanitize_input($_POST['name']);
    $email = sanitize_input($_POST['email']);
    $subject = sanitize_input($_POST['subject']);
    $message = sanitize_input($_POST['message']);

    // Validate form data
    $errors = array();

    if (empty($name)) {
        $errors[] = "Name is required";
    }

    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }

    if (empty($subject)) {
        $errors[] = "Subject is required";
    }

    if (empty($message)) {
        $errors[] = "Message is required";
    }

    // If there are no errors, proceed with saving to database
    if (empty($errors)) {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $subject, $message);

        // Execute the statement
        if ($stmt->execute()) {
            $response = array(
                "status" => "success",
                "message" => "Thank you for your message! We'll get back to you soon."
            );
            echo json_encode($response);
        } else {
            $response = array(
                "status" => "error",
                "message" => "Sorry, there was an error sending your message. Please try again later."
            );
            echo json_encode($response);
        }

        // Close statement
        $stmt->close();
    } else {
        // Return validation errors
        $response = array(
            "status" => "error",
            "message" => "Please fix the following errors:",
            "errors" => $errors
        );
        echo json_encode($response);
    }
} else {
    // If not a POST request
    $response = array(
        "status" => "error",
        "message" => "Invalid request method"
    );
    echo json_encode($response);
}

// Close database connection
$conn->close();
?> 