<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');     // Replace with your database username
define('DB_PASS', '');         // Replace with your database password
define('DB_NAME', 'portfolio');

// Create database connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>  
