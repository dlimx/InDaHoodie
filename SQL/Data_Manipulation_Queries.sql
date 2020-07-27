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