const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM Products');
};

const getProductById = async (id) => {
  const data = await db.pool.asyncQuery('SELECT * FROM Products WHERE id = ?', [
    id,
  ]);
  const product = data[0];
  return product;
};

const createProduct = async (data) => {
  await db.pool.asyncQuery(
    'INSERT INTO Products (name, description, created_at, updated_at, image, price, designer_id) VALUES (?, ?, NOW(), NOW(), ?, ?, ?)',
    [
      data.name,
      data.description,
      data.image,
      data.price,
      data.designer_id, // not entirely sure if we'll be passing this value from our front-end
    ],
  );
  const result = await db.pool.asyncQuery(
    'SELECT * FROM Products WHERE id = (SELECT MAX(id) FROM Products)',
  );
  return result[0];
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
};
