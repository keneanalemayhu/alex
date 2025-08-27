<?php
// backend/config.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Simple API key security
$API_KEY = "super_secret_key_123";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$headers = getallheaders();
if (!isset($headers['Authorization']) || $headers['Authorization'] !== "Bearer $API_KEY") {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}
