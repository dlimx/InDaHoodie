const db = require('./db');
const productCategoryModel = require('./productCategoryModel');

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
  const savedProduct = await db.pool.asyncQuery(
    'SELECT * FROM Products WHERE id = (SELECT MAX(id) FROM Products)', // or... WHERE id = (SELECT LAST_INSERT_ID())
  );
  const productCategory = {
    product_id: savedProduct[0].id,
    category_id: data.category_id,
  };
  await productCategoryModel.createProductCategory(productCategory);
  return savedProduct[0];
};

// ASSUMPTION: we're passing from front-end all product values (modified or not) with UPDATE request
const updateProduct = async (data) => {
  await db.pool.asyncQuery(
    'UPDATE Products SET name=?, description=?, updated_at=CURDATE(), image=?, price=?, designer_id=? WHERE id=?',
    [
      data.name,
      data.description,
      data.image,
      data.price,
      data.designer_id,
      data.id,
    ],
  );
  const result = await db.pool.asyncQuery(
    'SELECT * FROM Products WHERE id = ?',
    [data.id],
  );
  return result[0];
};

const deleteProduct = async (id) => {
  await db.pool.asyncQuery('DELETE FROM Products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
