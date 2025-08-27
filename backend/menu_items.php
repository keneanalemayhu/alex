<?php
// backend/menu_items.php
require 'config.php';
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM menu_items");
        echo json_encode(["success" => true, "data" => $stmt->fetchAll()]);
    }
    elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['name'], $data['price'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Missing name or price"]);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO menu_items (name, price) VALUES (?, ?)");
        $stmt->execute([$data['name'], $data['price']]);

        echo json_encode(["success" => true, "message" => "Menu item added"]);
    }
    elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'], $data['name'], $data['price'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Missing id, name, or price"]);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE menu_items SET name=?, price=? WHERE id=?");
        $stmt->execute([$data['name'], $data['price'], $data['id']]);

        echo json_encode(["success" => true, "message" => "Menu item updated"]);
    }
    elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Missing menu item id"]);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM menu_items WHERE id=?");
        $stmt->execute([$id]);

        echo json_encode(["success" => true, "message" => "Menu item deleted"]);
    }
    else {
        http_response_code(405);
        echo json_encode(["success" => false, "error" => "Method not allowed"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
