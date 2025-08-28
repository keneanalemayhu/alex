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

        $required = ['waiter_id', 'date', 'total_cash_expected', 'total_cash_collected', 'absent'];
        foreach ($required as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["success" => false, "error" => "Missing $field"]);
                exit;
            }
        }

        // Sanitize values
        $expected  = max(0, (float)$data['total_cash_expected']);
        $collected = max(0, (float)$data['total_cash_collected']);
        $absent    = (int)$data['absent'];

        // Get last record for this waiter (before this date)
        $stmt = $pdo->prepare("SELECT rolled_over, extra_paid 
                               FROM daily_reconciliation 
                               WHERE waiter_id=? AND date < ? 
                               ORDER BY date DESC LIMIT 1");
        $stmt->execute([$data['waiter_id'], $data['date']]);
        $last = $stmt->fetch();
        $lastRollover = $last['rolled_over'] ?? 0;
        $lastExtra    = $last['extra_paid'] ?? 0;

        // Net available = collected + any credit from before
        $netCollected = $collected + $lastExtra;

        // Today's owed before applying payment
        $owedToday = max(0, $expected);

        // Remaining after paying owed + previous rollover
        $totalOwed = $lastRollover + $owedToday;

        if ($netCollected >= $totalOwed) {
            // Fully paid, calculate extra
            $rolledOver = 0;
            $extraPaid  = $netCollected - $totalOwed;
        } else {
            // Still some debt
            $rolledOver = $totalOwed - $netCollected;
            $extraPaid  = 0;
        }

        // Insert record
        $stmt = $pdo->prepare("INSERT INTO daily_reconciliation 
            (waiter_id, date, total_cash_expected, total_cash_collected, absent, rolled_over, extra_paid) 
            VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['waiter_id'], $data['date'], $expected, $collected, $absent, $rolledOver, $extraPaid
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Reconciliation added",
            "rolled_over" => $rolledOver,
            "extra_paid"  => $extraPaid
        ]);
    }
    elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);
        $required = ['id', 'total_cash_expected', 'total_cash_collected', 'absent'];
        foreach ($required as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["success" => false, "error" => "Missing $field"]);
                exit;
            }
        }

        // Sanitize
        $expected  = max(0, (float)$data['total_cash_expected']);
        $collected = max(0, (float)$data['total_cash_collected']);
        $absent    = (int)$data['absent'];

        // Get waiter_id & date
        $stmt = $pdo->prepare("SELECT waiter_id, date FROM daily_reconciliation WHERE id=?");
        $stmt->execute([$data['id']]);
        $row = $stmt->fetch();
        if (!$row) {
            http_response_code(404);
            echo json_encode(["success" => false, "error" => "Reconciliation not found"]);
            exit;
        }
        $waiterId = $row['waiter_id'];
        $date     = $row['date'];

        // Get last record before this date
        $stmt = $pdo->prepare("SELECT rolled_over, extra_paid 
                               FROM daily_reconciliation 
                               WHERE waiter_id=? AND date < ? 
                               ORDER BY date DESC LIMIT 1");
        $stmt->execute([$waiterId, $date]);
        $last = $stmt->fetch();
        $lastRollover = $last['rolled_over'] ?? 0;
        $lastExtra    = $last['extra_paid'] ?? 0;

        $netCollected = $collected + $lastExtra;
        $owedToday    = max(0, $expected);
        $totalOwed    = $lastRollover + $owedToday;

        if ($netCollected >= $totalOwed) {
            $rolledOver = 0;
            $extraPaid  = $netCollected - $totalOwed;
        } else {
            $rolledOver = $totalOwed - $netCollected;
            $extraPaid  = 0;
        }

        // Update record
        $stmt = $pdo->prepare("UPDATE daily_reconciliation 
            SET total_cash_expected=?, total_cash_collected=?, absent=?, rolled_over=?, extra_paid=? 
            WHERE id=?");
        $stmt->execute([
            $expected, $collected, $absent, $rolledOver, $extraPaid, $data['id']
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Reconciliation updated",
            "rolled_over" => $rolledOver,
            "extra_paid"  => $extraPaid
        ]);
    }
    else {
        http_response_code(405);
        echo json_encode(["success" => false, "error" => "Method not allowed"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
