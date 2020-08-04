const yup = require('yup');
const find = require('lodash/find');
const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');
const constants = require('../constants/constants');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await orderModel.getAll();
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getOrderById = async (req, res, next) => {
  let data;
  try {
    data = await orderModel.getOrderById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const order = {
    ...req.body,
  };

  // validation of schema for necessary fields
  const schema = yup.object().shape({
    shipment_method: yup.string(),
    products: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number().required(),
          quantity: yup.number().required(),
        }),
      )
      .required(),
    customer_id: yup.number().required(),
  });

  schema
    .validate(order)
    .then(async (validatedOrder) => {
      // fetch product data from db - ensure user cant pass in their own prices
      const products = await productModel.getProductsByIds(
        validatedOrder.products.map((product) => product.id),
      );
      // iterate and calculate product prices
      let total_before_tax = 0;
      validatedOrder.products.forEach((product) => {
        const productData = find(
          products,
          (productDbData) => productDbData.id === product.id,
        );
        total_before_tax += productData.price * product.quantity;
      });

      const payload = {
        ...validatedOrder,
        total_before_tax,
        tax_amount: total_before_tax * constants.TAX_PERCENTAGE,
      };

      const savedOrder = await orderModel.createOrder(payload);
      res.status(200).send(savedOrder);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
};

module.exports = {
  getAll,
  getOrderById,
  create,
};
