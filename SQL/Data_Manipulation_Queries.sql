
/*** NOTE: ${:variableName} format being used to denote variables within app. ***/



/*****************************************************
** SELECT statements
******************************************************/

-- Query to get all customers
SELECT *
FROM Customers;

-- Query to get all products
SELECT Products.id          as id,
       Products.name        as name,
       Products.description as description,
       Products.image       as image,
       Products.created_at  as created_at,
       Products.updated_at  as updated_at,
       Products.price       as price,
       Products.designer_id as designer_id,
       PC.category_id       as category_id,
       C.name               as category_name,
       D.name               as designer_name
FROM Products
         LEFT JOIN Products_Categories PC on Products.id = PC.product_id
         LEFT JOIN Categories C on PC.category_id = C.id
         LEFT JOIN Designers D on Products.designer_id = D.id;

-- Query to get all orders
SELECT Orders.id               as id,
       Orders.customer_id      as customer_id,
       Orders.created_at       as created_at,
       Orders.updated_at       as updated_at,
       Orders.shipment_method  as shipment_method,
       Orders.total_before_tax as total_before_tax,
       Orders.tax_amount       as tax_amount,
       P.id                    as product_id,
       P.name                  as product_name,
       P.description           as product_description,
       P.image                 as product_image,
       P.created_at            as product_created_at,
       P.updated_at            as product_updated_at,
       P.price                 as product_price,
       C.first_name            as customer_first_name,
       C.last_name             as customer_last_name,
       C.image                 as customer_image,
       C.birthdate             as customer_birtdate,
       C.address               as customer_address,
       C.city                  as customer_city,
       C.state                 as customer_state,
       C.zip                   as customer_zip
FROM Orders
         LEFT JOIN Orders_Products OP on Orders.id = OP.order_id
         LEFT JOIN Products P on OP.product_id = P.id
         LEFT JOIN Customers C on Orders.customer_id = C.id;

-- Query to get all categories
SELECT *
FROM Categories;

-- Query to get all designers
SELECT *
FROM Designers;



/*****************************************************
** INSERT statements
******************************************************/

-- INSERT customer
INSERT INTO Customers (first_name, last_name, birthdate, address, city, state, zip, created_at, updated_at, image) VALUES 
(${:firstNameInput}, ${:lastNameInput}, ${:birthdateInput}, ${:addressInput}, ${:cityInput}, ${:stateInput}, ${:zipInput}, CURDATE(), CURDATE(), ${:imageInput});


-- INSERT product and product_category relationship (done one right after the other)
INSERT INTO Products (name, description, created_at, updated_at, image, price, designer_id) VALUES 
(${:nameInput}, ${:descriptionInput}, CURDATE(), CURDATE(), ${:imageInput}, ${:priceInput}, (SELECT id FROM Designers WHERE name = ${:designerNameInput}));
-- productIdInput will be captured after creating the product above
INSERT INTO Products_Categories (product_id, category_id) VALUES
(${:productIdInput}, (SELECT id FROM Categories WHERE name = ${:categoryNameInput}));


-- INSERT order and order_product relationship (done one right after the other)
INSERT INTO Orders (customer_id, created_at, updated_at, shipment_method, total_before_tax, tax_amount) VALUES 
((SELECT id FROM Customers WHERE first_name = ${:firstNameInput}), CURDATE(), CURDATE(), ${:shipmentMethodInput}, ${:totalBeforeTaxInput}, ${:taxAmountInput});
-- orderIdInput will be captured after creating the order above
INSERT INTO Orders_Products (order_id, product_id, quantity) VALUES
(${:orderIdInput}, (SELECT id FROM Products WHERE name=${:productNameInput}), ${:productQuantityInput});


-- INSERT category
INSERT INTO Categories (name) VALUES (${:nameInput});


-- INSERT designer
INSERT INTO Designers (name) VALUES (${:nameInput});



/*****************************************************
** UPDATE statements
******************************************************/

-- UPDATE product
UPDATE Products
SET name=${:nameUpdated}, description=${:descriptionUpdated}, updated_at=CURDATE(), image=${:imageUpdated}, price=${:priceUpdated}, designer_id=(SELECT id FROM Designers WHERE name=${:designerNameUpdated}) 
WHERE id=${:productIdInput};



/*****************************************************
** DELETE statements
******************************************************/

-- DELETE product
DELETE FROM Products WHERE id=${:productIdInput};

-- DELETE product_category relationship
DELETE FROM Products_Categories WHERE product_id=${:productIdInput} AND category_id=${:categoryIdInput};


