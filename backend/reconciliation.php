<?php
// backend/reconciliation.php
require 'config.php';
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $date = $_GET['date'] ?? date('Y-m-d');
        $stmt = $pdo->prepare("SELECT r.*, w.name as waiter_name 
                               FROM daily_reconciliation r
                               JOIN waiters w ON r.waiter_id = w.id
                               WHERE r.date=?");
        $stmt->execute([$date]);
        echo json_encode(["success" => true, "data" => $stmt->fetchAll()]);
    }
    elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        $required = ['waiter_id', 'date', 'total_cash_expected', 'total_cash_collected', 'absent', 'rolled_over'];
        foreach ($required as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["success" => false, "error" => "Missing $field"]);
                exit;
            }
        }

        $stmt = $pdo->prepare("INSERT INTO daily_reconciliation 
            (waiter_id, date, total_cash_expected, total_cash_collected, absent, rolled_over) 
            VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['waiter_id'], $data['date'], $data['total_cash_expected'], 
            $data['total_cash_collected'], $data['absent'], $data['rolled_over']
        ]);

        echo json_encode(["success" => true, "message" => "Reconciliation added"]);
    }
    elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);
        $required = ['id', 'total_cash_expected', 'total_cash_collected', 'absent', 'rolled_over'];
        foreach ($required as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["success" => false, "error" => "Missing $field"]);
                exit;
            }
        }

        $stmt = $pdo->prepare("UPDATE daily_reconciliation 
            SET total_cash_expected=?, total_cash_collected=?, absent=?, rolled_over=? 
            WHERE id=?");
        $stmt->execute([
            $data['total_cash_expected'], $data['total_cash_collected'], 
            $data['absent'], $data['rolled_over'], $data['id']
        ]);

        echo json_encode(["success" => true, "message" => "Reconciliation updated"]);
    }
    else {
        http_response_code(405);
        echo json_encode(["success" => false, "error" => "Method not allowed"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
