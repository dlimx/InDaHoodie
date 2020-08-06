const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM Designers');
};

const getDesignerById = async (id) => {
  const data = await db.pool.asyncQuery(
    'SELECT * FROM Designers WHERE id = ?',
    [id],
  );
  const designer = data[0];
  return designer;
};

const createDesigner = async (data) => {
  const {
    insertId,
  } = await db.pool.asyncQuery('INSERT INTO Designers (name) VALUES (?)', [
    data.name,
  ]);
  return getDesignerById(insertId);
};

// ASSUMPTION: we're passing from front-end all designer values (modified or not) with UPDATE request
const updateDesigner = async (data) => {
  await db.pool.asyncQuery('UPDATE Designers SET name=? WHERE id=?', [
    data.name,
    data.id,
  ]);
  return getDesignerById(data.id);
};

const deleteDesigner = async (id) => {
  await db.pool.asyncQuery('DELETE FROM Designers WHERE id=?', [id]);
};

module.exports = {
  getAll,
  getDesignerById,
  createDesigner,
  updateDesigner,
  deleteDesigner,
};
