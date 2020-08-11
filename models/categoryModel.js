const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM Categories');
};

const getCategoryById = async (id) => {
  const data = await db.pool.asyncQuery(
    'SELECT * FROM Categories WHERE id = ?',
    [id],
  );
  const category = data[0];
  return category;
};

const createCategory = async (data) => {
  const {
    insertId,
  } = await db.pool.asyncQuery('INSERT INTO Categories (name) VALUES (?)', [
    data.name,
  ]);
  return getCategoryById(insertId);
};

module.exports = {
  getAll,
  getCategoryById,
  createCategory,
};
