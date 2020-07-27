-- For testing and initialization purposes only
SET FOREIGN_KEY_CHECKS = 0;

-- Create table 'Customers'
DROP TABLE IF EXISTS `Customers`;

CREATE TABLE `Customers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255),
  `city` VARCHAR(255),
  `state` VARCHAR(255),
  `zip` VARCHAR(255),
  `created_at` DATE NOT NULL,
  `updated_at` DATE NOT NULL,
  `image` VARCHAR(255),
  `birthdate` DATE,
  PRIMARY KEY (`id`)
);

-- Create table 'Orders'
DROP TABLE IF EXISTS `Orders`;

CREATE TABLE `Orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `customer_id` INT(11) NOT NULL,
  `created_at` DATE NOT NULL,
  `updated_at` DATE NOT NULL,
  `shipment_method` VARCHAR(255),
  `total_before_tax` INT(11) NOT NULL,
  `tax_amount` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Create table 'Products'
DROP TABLE IF EXISTS `Products`;

CREATE TABLE `Products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255),
  `image` VARCHAR(255),
  `created_at` DATE NOT NULL,
  `updated_at` DATE NOT NULL,
  `price` INT(11) NOT NULL,
  `designer_id` INT(11),
  PRIMARY KEY (`id`)
);


-- Create table 'Categories'
DROP TABLE IF EXISTS `Categories`;

CREATE TABLE `Categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);


-- Create table 'Designers'
DROP TABLE IF EXISTS `Designers`;

CREATE TABLE `Designers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);


-- Create table 'Orders_Products'
DROP TABLE IF EXISTS `Orders_Products`;

CREATE TABLE `Orders_Products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_id` INT(11) NOT NULL,
  `product_id` INT(11),
  `quantity` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
);


-- Create table 'Products_Categories'
DROP TABLE IF EXISTS `Products_Categories`;

CREATE TABLE `Products_Categories` (
  `product_id` INT(11) NOT NULL,
  `category_id` INT(11) NOT NULL,
  PRIMARY KEY (`product_id`, `category_id`)
);


-- Add FK reference for 'Orders' table
ALTER TABLE `Orders`
ADD CONSTRAINT FOREIGN KEY (`customer_id`)
REFERENCES `Customers` (`id`)
ON DELETE NO ACTION
ON UPDATE CASCADE;


-- Add FK reference for 'Orders_Products' table
ALTER TABLE `Orders_Products`
ADD CONSTRAINT FOREIGN KEY (`order_id`)
REFERENCES `Orders` (`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
ALTER TABLE `Orders_Products`
ADD CONSTRAINT FOREIGN KEY (`product_id`)
REFERENCES `Products` (`id`)
ON DELETE SET NULL
ON UPDATE SET NULL;


-- Add FK reference for 'Products' table
ALTER TABLE `Products`
ADD CONSTRAINT FOREIGN KEY (`designer_id`)
REFERENCES `Designers` (`id`)
ON DELETE SET NULL
ON UPDATE SET NULL;


-- Add FK reference for 'Products_Categories' table
ALTER TABLE `Products_Categories`
ADD CONSTRAINT FOREIGN KEY (`product_id`)
REFERENCES `Products` (`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
ALTER TABLE `Products_Categories`
ADD CONSTRAINT FOREIGN KEY (`category_id`)
REFERENCES `Categories` (`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- Seed values
INSERT INTO Categories (name) VALUES ('T-Shirts'), ('Pants'), ('Sweaters'), ('Jackets');

INSERT INTO Designers (name) VALUES ('Heron Preston'), ('Jerry Lorenzo'), ('Tommy Hilfiger'), ('Heidi Slimane'), ('Vera Wang');

INSERT INTO Customers (first_name, last_name, address, city, state, zip, created_at, updated_at, image, birthdate)
VALUES ('David', 'Li', '55 Canada Way', 'Vancouver', 'BC', 'A1A1A1', CURDATE(), CURDATE(), NULL , CURDATE()),
       ('Blake', 'Lester', '77 American Drive', 'Cascadia', 'OR', '00000', CURDATE(), CURDATE(), NULL, CURDATE());

INSERT INTO Products (name, description, image, created_at, updated_at, price, designer_id)
VALUES ('White T-Shirt', NULL, NULL, CURDATE(), CURDATE(), 20000, (SELECT id FROM Designers WHERE name = 'Heron Preston')),
       ('Goretex Jacket', NULL, NULL, CURDATE(), CURDATE(), 70000, (SELECT id FROM Designers WHERE name = 'Heidi Slimane')),
       ('Grey Sweater', NULL, NULL, CURDATE(), CURDATE(), 35000, (SELECT id FROM Designers WHERE name = 'Jerry Lorenzo')),
       ('Navy Sweater', NULL, NULL, CURDATE(), CURDATE(), 65000, (SELECT id FROM Designers WHERE name = 'Vera Wang')),
       ('InDaHoodie Hoodie', NULL, NULL, CURDATE(), CURDATE(), 15000, NULL);

INSERT INTO Orders (customer_id, created_at, updated_at, shipment_method, total_before_tax, tax_amount) VALUES
((SELECT id FROM Customers WHERE first_name = 'David'), CURDATE(), CURDATE(), 'FedEx', 100000, 10000),
((SELECT id FROM Customers WHERE first_name = 'Blake'), CURDATE(), CURDATE(), 'Pickup', 50000, 5000);

-- Seed relationships
INSERT INTO Products_Categories (product_id, category_id) VALUES
((SELECT id FROM Products WHERE name = 'White T-Shirt'), (SELECT id FROM Categories WHERE name = 'T-Shirts')),
((SELECT id FROM Products WHERE name = 'Goretex Jacket'), (SELECT id FROM Categories WHERE name = 'Jackets')),
((SELECT id FROM Products WHERE name = 'Grey Sweater'), (SELECT id FROM Categories WHERE name = 'Sweaters')),
((SELECT id FROM Products WHERE name = 'Navy Sweater'), (SELECT id FROM Categories WHERE name = 'Sweaters'));

INSERT INTO Orders_Products (order_id, product_id, quantity) VALUES
((SELECT id FROM Orders WHERE shipment_method = 'FedEx'), (SELECT id FROM Products WHERE name='White T-Shirt'), 4),
((SELECT id FROM Orders WHERE shipment_method = 'FedEx'), (SELECT id FROM Products WHERE name='InDaHoodie Hoodie'), 2),
((SELECT id FROM Orders WHERE shipment_method = 'FedEx'), (SELECT id FROM Products WHERE name='Navy Sweater'), 1),
((SELECT id FROM Orders WHERE shipment_method = 'Pickup'), (SELECT id FROM Products WHERE name='Goretex Jacket'), 1),
((SELECT id FROM Orders WHERE shipment_method = 'Pickup'), (SELECT id FROM Products WHERE name='White T-Shirt'), 2);

-- For testing and initialization purposes only
SET FOREIGN_KEY_CHECKS = 1;