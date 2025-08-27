<?php
// backend/waiters.php

require 'config.php';
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM waiters");
        echo json_encode(["success" => true, "data" => $stmt->fetchAll()]);
    }
    elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['name'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Missing waiter name"]);
            exit;
        }

        $servesCoffee = isset($data['serves_coffee']) ? (bool)$data['serves_coffee'] : false;

        $stmt = $pdo->prepare("INSERT INTO waiters (name, serves_coffee) VALUES (?, ?)");
        $stmt->execute([$data['name'], $servesCoffee]);

        echo json_encode(["success" => true, "message" => "Waiter added"]);
    }
    elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id'], $data['name'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Missing id or name"]);
            exit;
        }

        $servesCoffee = isset($data['serves_coffee']) ? (bool)$data['serves_coffee'] : false;

        $stmt = $pdo->prepare("UPDATE waiters SET name=?, serves_coffee=? WHERE id=?");
        $stmt->execute([$data['name'], $servesCoffee, $data['id']]);

        echo json_encode(["success" => true, "message" => "Waiter updated"]);
    }
    elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Missing waiter id"]);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM waiters WHERE id=?");
        $stmt->execute([$id]);

        echo json_encode(["success" => true, "message" => "Waiter deleted"]);
    }
    else {
        http_response_code(405);
        echo json_encode(["success" => false, "error" => "Method not allowed"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
