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

const getProductsByIds = async (ids) => {
  return db.pool.asyncQuery('SELECT * FROM Products WHERE id IN ?', [[ids]]);
};

const createProduct = async (data) => {
  const { insertId } = await db.pool.asyncQuery(
    'INSERT INTO Products (name, description, created_at, updated_at, image, price, designer_id) VALUES (?, ?, NOW(), NOW(), ?, ?, ?)',
    [
      data.name,
      data.description,
      data.image,
      data.price,
      data.designer_id, // not entirely sure if we'll be passing this value from our front-end
    ],
  );

  // Create the Products_Categories relationship
  const productCategory = {
    product_id: insertId,
    category_id: data.category_id,
  };
  await productCategoryModel.createProductCategory(productCategory);

  return getProductById(insertId);
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
  return getProductById(data.id);
};

const deleteProduct = async (id) => {
  await db.pool.asyncQuery('DELETE FROM Products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getProductById,
  getProductsByIds,
  createProduct,
  updateProduct,
  deleteProduct,
};
