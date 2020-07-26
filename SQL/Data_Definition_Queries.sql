
-- Create table 'Customers'
DROP TABLE IF EXISTS `Customers`;

CREATE TABLE `Customers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `birthdate` DATE,
  `location` VARCHAR(255),
  `created_at` DATE NOT NULL,
  `updated_at` DATE NOT NULL,
  `image` VARCHAR(255),
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
  `order_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  PRIMARY KEY (`order_id`, `product_id`)
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
ON UPDATE CASCADE,
ADD CONSTRAINT FOREIGN KEY (`product_id`) 
REFERENCES `Products` (`id`)
ON DELETE RESTRICT
ON UPDATE CASCADE;


-- Add FK reference for 'Products' table
ALTER TABLE `Products`
ADD CONSTRAINT FOREIGN KEY (`designer_id`) 
REFERENCES `Designers` (`id`)
ON DELETE SET NULL
ON UPDATE CASCADE;


-- Add FK reference for 'Products_Categories' table
ALTER TABLE `Products_Categories`
ADD CONSTRAINT FOREIGN KEY (`product_id`) 
REFERENCES `Products` (`id`)
ON DELETE CASCADE
ON UPDATE CASCADE,
ADD CONSTRAINT FOREIGN KEY (`category_id`) 
REFERENCES `Categories` (`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;