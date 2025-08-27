<?php
// backend/orders.php
require 'config.php';
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT o.*, w.name as waiter_name, m.name as item_name 
                             FROM orders o
                             JOIN waiters w ON o.waiter_id = w.id
                             JOIN menu_items m ON o.menu_item_id = m.id
                             ORDER BY o.created_at DESC");
        echo json_encode(["success" => true, "data" => $stmt->fetchAll()]);
    }
    elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['waiter_id'], $data['menu_item_id'], $data['quantity'], $data['payment_method'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Missing required fields"]);
            exit;
        }

        // Calculate total price
        $stmt = $pdo->prepare("SELECT price FROM menu_items WHERE id=?");
        $stmt->execute([$data['menu_item_id']]);
        $price = $stmt->fetchColumn();
        if ($price === false) {
            http_response_code(404);
            echo json_encode(["success" => false, "error" => "Menu item not found"]);
            exit;
        }

        $total = $price * $data['quantity'];

        $stmt = $pdo->prepare("INSERT INTO orders (waiter_id, menu_item_id, quantity, total_price, payment_method) 
                               VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['waiter_id'], $data['menu_item_id'], $data['quantity'], $total, $data['payment_method']]);

        echo json_encode(["success" => true, "message" => "Order placed", "total" => $total]);
    }
    else {
        http_response_code(405);
        echo json_encode(["success" => false, "error" => "Method not allowed"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
