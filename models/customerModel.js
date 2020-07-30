const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM Customers');
};

const getCustomerById = async (id) => {
  const data = await db.pool.asyncQuery(
    'SELECT * FROM Customers WHERE id = ?',
    [id],
  );
  const user = data[0];
  return user;
};

const createCustomer = async (data) => {
  await db.pool.asyncQuery(
    'INSERT INTO Customers (first_name, last_name, address, city, state, zip, image, birthdate, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
    [
      data.first_name,
      data.last_name,
      data.address,
      data.city,
      data.state,
      data.zip,
      data.image,
      data.birthdate,
    ],
  );
  const result = await db.pool.asyncQuery(
    `SELECT * FROM Customers WHERE id = (SELECT MAX(id) FROM Customers)`,
  );
  return result[0];
};

module.exports = {
  getAll,
  getCustomerById,
  createCustomer,
};
