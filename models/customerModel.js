const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM Customers');
};

const getCustomerById = async (id) => {
  const data = await db.pool.asyncQuery(
    'SELECT * FROM Customers WHERE id = ?',
    [id],
  );
  const customer = data[0];
  return customer;
};

const createCustomer = async (data) => {
  const {
    insertId,
  } = await db.pool.asyncQuery(
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
  return getCustomerById(insertId);
};

module.exports = {
  getAll,
  getCustomerById,
  createCustomer,
};
