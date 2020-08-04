/* eslint-disable max-len */
const db = require('./db');

const getAll = async () => {
  /* query for order data
     need to join on:
      CUSTOMERS - for customer data
      ORDER_PRODUCTS - for many to many relationship
      PRODUCTS - for product data

      build query by aggregating on product quantity - this is the only thing needed at this level
  */
  const data = await db.pool.asyncQuery({
    sql: `SELECT Orders.id, Orders.customer_id, Orders.created_at, Orders.updated_at, Orders.shipment_method, Orders.total_before_tax, Orders.tax_amount,
            Customers.address, Customers.id, Customers.address, Customers.birthdate, Customers.city, Customers.created_at, Customers.first_name, Customers.last_name, Customers.image, Customers.state, Customers.zip, Customers.updated_at,
            SUM(Orders_Products.quantity) as product_count
            FROM Orders
                LEFT JOIN Orders_Products ON Orders.id = Orders_Products.order_id
                LEFT JOIN Customers ON Orders.customer_id = Customers.id
                LEFT JOIN Products ON Orders_Products.product_id = Products.id
            GROUP BY Orders.id`,
    nestTables: true,
  });

  // remap due to nestTables
  return data.map((order) => {
    return { ...order.Orders, ...order[''], customer: order.Customers };
  });
};

const getOrderById = async (id) => {
  /* query for order data
     need to join on:
      CUSTOMERS - for customer data
      ORDER_PRODUCTS - for many to many relationship
      PRODUCTS - for product data

      build query by filtering for order ID and joining, and assembling the nested JSON object
  */
  const data = await db.pool.asyncQuery({
    sql: `SELECT Orders.id, Orders.customer_id, Orders.created_at, Orders.updated_at, Orders.shipment_method, Orders.total_before_tax, Orders.tax_amount,
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
            WHERE Orders.id = ?`,
    values: [id],
    nestTables: true,
  });
  const order = data[0];

  // remap due to nestTables
  // JSON.parse is necessary due to JSON_ARRAYAGG above
  return {
    ...order.Orders,
    customer: order.Customers,
    etc: { ...order },
    products: JSON.parse(order[''].products),
  };
};

const createOrder = async (order) => {
  const {
    insertId,
  } = await db.pool.asyncQuery(
    'INSERT INTO Orders (customer_id, created_at, updated_at, shipment_method, total_before_tax, tax_amount) VALUES(?, NOW(), NOW(), ?, ?, ?)',
    [
      order.customer_id,
      order.shipment_method,
      order.total_before_tax,
      order.tax_amount,
    ],
  );

  // need to use insertID to get the last inserted ID
  await db.pool.asyncQuery(
    'INSERT INTO Orders_Products (order_id, product_id, quantity) VALUES ?',
    [order.products.map((product) => [insertId, product.id, product.quantity])],
  );

  return getOrderById(insertId);
};

module.exports = {
  getAll,
  getOrderById,
  createOrder,
};
