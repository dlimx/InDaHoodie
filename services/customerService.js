const yup = require('yup');
const customerModel = require('../models/customerModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await customerModel.getAll();
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getCustomerById = async (req, res, next) => {
  let data;
  try {
    data = await customerModel.getCustomerById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const customer = {
    ...req.body,
  };

  // check to remove empty string
  if (!customer.birthdate) {
    customer.birthdate = undefined;
  }

  // validation of schema for necessary fields
  const schema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    address: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zip: yup.string(),
    image: yup.string(),
    birthdate: yup.date().nullable().default(null),
  });

  schema
    .validate(customer)
    .then(async (validatedCustomer) => {
      const savedCustomer = await customerModel.createCustomer(
        validatedCustomer,
      );
      res.status(200).send(savedCustomer);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
};

module.exports = {
  getAll,
  getCustomerById,
  create,
};
