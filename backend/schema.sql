-- backend/schema.sql

-- Waiters
CREATE TABLE waiters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    serves_coffee BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Menu Items
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    is_coffee BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders / Sales
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    waiter_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cash', 'telebirr', 'bank_transfer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (waiter_id) REFERENCES waiters(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Daily Cash Reconciliation
CREATE TABLE daily_reconciliation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    waiter_id INT NOT NULL,
    date DATE NOT NULL,
    total_cash_expected DECIMAL(10,2) NOT NULL,
    total_cash_collected DECIMAL(10,2) NOT NULL,
    absent DECIMAL(10,2) NOT NULL DEFAULT 0,
    rolled_over DECIMAL(10,2) NOT NULL DEFAULT 0,
    extra_paid DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (waiter_id) REFERENCES waiters(id)
);
