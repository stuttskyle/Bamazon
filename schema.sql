DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price FLOAT (7,2) NULL,
    stock_quantity INT NULL
);

SELECT * FROM bamazondb.products;

-- ALTER TABLE products AUTO_INCREMENT = 1000;

-- CREATE TABLE departments(
--     department_id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     department_name VARCHAR(30) NOT NULL,
--     over_head_costs INT(11) NOT NULL
-- );

-- ALTER TABLE departments AUTO_INCREMENT = 2000;