const db = require('./db');
const productCategoryModel = require('./productCategoryModel');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM Products');
};

const search = async (params) => {
  let whereClause = '';
  const whereValues = [];
  // dynamically create where clauses - params may be empty
  if (params?.search) {
    whereClause += 'WHERE Products.name LIKE ?';
    whereValues.push(`%${params.search}%`);
  }
  if (params?.category) {
    whereClause += params?.search ? ' AND ' : ' WHERE ';
    whereClause += `Categories.id = ?`;
    whereValues.push(params.category);
  }
  if (params?.designer) {
    whereClause += params?.search ? ' AND ' : ' WHERE ';
    whereClause += `Designers.id = ?`;
    whereValues.push(params.designer);
  }
  const data = await db.pool.asyncQuery({
    sql: `SELECT Products.id,
                Products.name,
                Products.description,
                Products.image,
                Products.created_at,
                Products.updated_at,
                Products.price,
                Designers.name,
                Designers.id,
                 JSON_ARRAYAGG(
                         JSON_OBJECT(
                             "id", Categories.id,
                             "name", Categories.name
                         )
                     ) as categories
            FROM Products
                     LEFT JOIN Products_Categories on Products.id = Products_Categories.product_id
                     LEFT JOIN Categories on Products_Categories.category_id = Categories.id
                     LEFT JOIN Designers on Products.designer_id = Designers.id
                    ${whereClause}
                     GROUP BY Products.id`,
    values: whereValues,
    nestTables: true,
  });
  return data.map((product) => ({
    ...product.Products,
    designer: product.Designers,
    categories: JSON.parse(product[''].categories),
  }));
};

const getProductById = async (id) => {
  const data = await db.pool.asyncQuery({
    sql: `SELECT Products.id,
                Products.name,
                Products.description,
                Products.image,
                Products.created_at,
                Products.updated_at,
                Products.price,
                Designers.name,
                Designers.id,
                 JSON_ARRAYAGG(
                         JSON_OBJECT(
                             "id", Categories.id,
                             "name", Categories.name
                         )
                     ) as categories
            FROM Products
                     LEFT JOIN Products_Categories on Products.id = Products_Categories.product_id
                     LEFT JOIN Categories on Products_Categories.category_id = Categories.id
                     LEFT JOIN Designers on Products.designer_id = Designers.id
            WHERE Products.id = ?`,
    values: [id],
    nestTables: true,
  });
  return data.map((product) => ({
    ...product.Products,
    designer: product.Designers,
    categories: JSON.parse(product[''].categories),
  }))[0];
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
  const productCategoryQueries = data.category_ids.map((id) => {
    const productCategory = {
      product_id: insertId, // insertId is id from product INSERTed above
      category_id: id,
    };
    return productCategoryModel.createProductCategory(productCategory);
  });
  await Promise.all(productCategoryQueries);

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
  // Reset the Products_Categories relationship
  await productCategoryModel.deleteAllProductCategories(data.id);
  const productCategoryQueries = data.category_ids.map((id) => {
    const productCategory = {
      product_id: data.id, // insertId is id from product INSERTed above
      category_id: id,
    };
    return productCategoryModel.createProductCategory(productCategory);
  });
  await Promise.all(productCategoryQueries);

  return getProductById(data.id);
};

const deleteProduct = async (id) => {
  await db.pool.asyncQuery('DELETE FROM Products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  search,
  getProductById,
  getProductsByIds,
  createProduct,
  updateProduct,
  deleteProduct,
};
