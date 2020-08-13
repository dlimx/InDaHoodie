const yup = require('yup');
const productModel = require('../models/productModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await productModel.getAll();
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getProductById = async (req, res, next) => {
  let data;
  try {
    data = await productModel.getProductById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const product = {
    ...req.body,
  };

  console.log(req.body); // for testing

  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    image: yup.string(),
    price: yup.number().positive().integer().required(),
    designer_id: yup.number(),
    category_ids: yup.array().of(yup.number()).required(),
  });

  schema
    .validate(product)
    .then(async (validatedProduct) => {
      const savedProduct = await productModel.createProduct(validatedProduct);
      res.status(200).send(savedProduct);
    })
    .catch((error) => {
      res.status(400);
      console.error(error); // for testing
      res.send(error);
    });
};

const update = async (req, res, next) => {
  const product = {
    ...req.body,
  };

  const schema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    description: yup.string(),
    image: yup.string(),
    price: yup.number().positive().integer().required(),
    designer_id: yup.number(),
  });

  schema
    .validate(product)
    .next(async (validatedProduct) => {
      const updatedProduct = await productModel.updateProduct(validatedProduct);
      res.status(200).send(updatedProduct);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
};

const deleteProduct = async (req, res, next) => {
  try {
    await productModel.deleteProduct(req.body.id); // req.params.id if passing query params
    res.status(200);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  getAll,
  getProductById,
  create,
  update,
  deleteProduct,
};
