const yup = require('yup');
const productModel = require('../models/productModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await productModel.search(req.query);
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

  // validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    image: yup.string(),
    price: yup
      .string()
      .matches(/^[0-9]*(?:\.[0-9]{0,4})?$/, 'Please enter a valid price')
      .required(),
    designer_id: yup.number(),
    category_ids: yup.array().of(yup.number()).required(),
  });

  schema
    .validate(product)
    .then(async (validatedProduct) => {
      // convert to cents storage
      const price = Number.parseFloat(validatedProduct.price) * 100;
      const savedProduct = await productModel.createProduct({
        ...validatedProduct,
        price,
      });
      res.status(200).send(savedProduct);
    })
    .catch((error) => {
      console.error(error); // for testing
      res.status(400);
      res.send(error);
    });
};

const update = async (req, res, next) => {
  const product = {
    ...req.body,
    id: req.params.id,
  };

  // validation schema
  const schema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    description: yup.string(),
    image: yup.string(),
    price: yup
      .string()
      .matches(/^[0-9]*(?:\.[0-9]{0,4})?$/, 'Please enter a valid price')
      .required(),
    designer_id: yup.number(),
    category_ids: yup.array().of(yup.number()).required(),
  });

  schema
    .validate(product)
    .then(async (validatedProduct) => {
      // convert to cents storage
      const price = Number.parseFloat(validatedProduct.price) * 100;
      const updatedProduct = await productModel.updateProduct({
        ...validatedProduct,
        price,
      });
      res.status(200).send(updatedProduct);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.error(error);
    });
};

const deleteProduct = async (req, res, next) => {
  try {
    await productModel.deleteProduct(req.params.id); // req.params.id if passing query params
    res.status(200);
    res.send('Success');
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
