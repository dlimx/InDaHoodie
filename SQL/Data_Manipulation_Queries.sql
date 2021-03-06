
/*** NOTE: ${:variableName} format being used to denote variables within app. ***/



/*****************************************************
** SELECT statements
******************************************************/

-- Query to get all customers
SELECT *
FROM Customers;

-- Query to search all products
-- The WHERE clause will be dynamically generated based on the user submitted filters
SELECT Products.id,
       Products.name,
       Products.description,
       Products.image,
       Products.created_at,
       Products.updated_at,
       Products.price,
       Designers.name,
       Designers.id,
       JSON_ARRAYAGG(
               JSON_OBJECT(
                       "id", Categories.id,
                       "name", Categories.name
                   )
           ) as categories
FROM Products
         LEFT JOIN Products_Categories on Products.id = Products_Categories.product_id
         LEFT JOIN Categories on Products_Categories.category_id = Categories.id
         LEFT JOIN Designers on Products.designer_id = Designers.id
WHERE Products.name LIKE ${:productNameInput}
AND Products_Categories.category_id = ${:categoryIdInput}
AND Products.designer_id = ${:designerIdInput}
GROUP BY Products.id;

-- Query to get specific product
SELECT Products.id,
       Products.name,
       Products.description,
       Products.image,
       Products.created_at,
       Products.updated_at,
       Products.price,
       Designers.name,
       Designers.id,
       JSON_ARRAYAGG(
               JSON_OBJECT(
                       "id", Categories.id,
                       "name", Categories.name
                   )
           ) as categories
FROM Products
         LEFT JOIN Products_Categories on Products.id = Products_Categories.product_id
         LEFT JOIN Categories on Products_Categories.category_id = Categories.id
         LEFT JOIN Designers on Products.designer_id = Designers.id
WHERE Products.id = ${:productIdInput};

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

-- Query to get all orders (SECOND VERSION)
SELECT  Orders.id, 
        Orders.customer_id, 
        Orders.created_at, 
        Orders.updated_at, 
        Orders.shipment_method, 
        Orders.total_before_tax, 
        Orders.tax_amount,
        Customers.address, 
        Customers.id, 
        Customers.address, 
        Customers.birthdate, 
        Customers.city, 
        Customers.created_at, 
        Customers.first_name, 
        Customers.last_name, 
        Customers.image, 
        Customers.state, 
        Customers.zip, 
        Customers.updated_at,
        SUM(Orders_Products.quantity) as product_count
FROM Orders
        LEFT JOIN Orders_Products ON Orders.id = Orders_Products.order_id
        LEFT JOIN Customers ON Orders.customer_id = Customers.id
        LEFT JOIN Products ON Orders_Products.product_id = Products.id
GROUP BY Orders.id;

-- Query to get specific order
SELECT Orders.id,Orders.customer_id, Orders.created_at, Orders.updated_at, Orders.shipment_method, Orders.total_before_tax, Orders.tax_amount,
       Customers.address, Customers.id, Customers.address, Customers.birthdate, Customers.city, Customers.created_at, Customers.first_name, Customers.last_name, Customers.image, Customers.state, Customers.zip, Customers.updated_at,
       JSON_ARRAYAGG(
               JSON_OBJECT(
                       "id", Products.id, "quantity",
                       Orders_Products.quantity,
                       "product", JSON_OBJECT(
                               "id", Products.id,
                               "name", Products.name,
                               "description", Products.description,
                               "image", Products.image,
                               "created_at", Products.created_at,
                               "updated_at", Products.updated_at
                           )
                   )
           ) as products
FROM Orders
         LEFT JOIN Orders_Products ON Orders.id = Orders_Products.order_id
         LEFT JOIN Customers ON Orders.customer_id = Customers.id
         LEFT JOIN Products ON Orders_Products.product_id = Products.id
WHERE Orders.id = ${:orderIdInput};

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
((SELECT LAST_INSERT_ID()), ${:categoryIdInput});


-- INSERT order and order_product relationship (done one right after the other)
INSERT INTO Orders (customer_id, created_at, updated_at, shipment_method, total_before_tax, tax_amount) VALUES 
({$:customerIdInput}, CURDATE(), CURDATE(), ${:shipmentMethodInput}, ${:totalBeforeTaxInput}, ${:taxAmountInput});
-- orderIdInput will be captured after creating the order above
INSERT INTO Orders_Products (order_id, product_id, quantity) VALUES
((SELECT LAST_INSERT_ID()), ${:productIdInput}, ${:productQuantityInput});


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


