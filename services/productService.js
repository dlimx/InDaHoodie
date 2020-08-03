const yup = require('yup');
const productModel = require('../models/productModel');
const customerModel = require('../models/customerModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await productModel.getAll();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getProductById = async (req, res, next) => {
  let data;
  try {
    data = await productModel.getProductById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const product = {
    ...req.body,
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    image: yup.string(),
    price: yup.number().positive().integer().required(),
    designer_id: yup.number(),
    category_id: yup.number().required(),
  });

  schema
    .validate(product)
    .then(async (validatedProduct) => {
      const savedProduct = await productModel.createProduct(validatedProduct);
      res.status(200).send(savedProduct);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
};

module.exports = {
  getAll,
  getProductById,
  create,
};
