const db = require('./db');

const createProductCategory = async (data) => {
  await db.pool.asyncQuery(
    'INSERT INTO Products_Categories (product_id, category_id) VALUES (?, ?)',
    [data.product_id, data.category_id],
  );
};

const deleteProductCategory = async (data) => {
  await db.pool.asyncQuery(
    'DELETE FROM Products_Categories WHERE product_id=? AND category_id=?',
    [data.product_id, data.category_id],
  );
};

const deleteAllProductCategories = async (productId) => {
  await db.pool.asyncQuery(
    'DELETE FROM Products_Categories WHERE product_id = ?',
    [productId],
  );
};

module.exports = {
  createProductCategory,
  deleteProductCategory,
  deleteAllProductCategories,
};
