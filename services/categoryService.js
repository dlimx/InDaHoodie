const yup = require('yup');
const categoryModel = require('../models/categoryModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await categoryModel.getAll();
    res.status(200).send(data);
  } catch (e) {
    console.error(e); // for testing
    next(e);
  }
};

const getCategoryById = async (req, res, next) => {
  let data;
  try {
    data = await categoryModel.getCategoryById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e); // for testing
    next(e);
  }
};

const create = async (req, res, next) => {
  const category = {
    ...req.body,
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  schema
    .validate(category)
    .then(async (validatedCategory) => {
      const savedCategory = await categoryModel.createCategory(
        validatedCategory,
      );
      res.status(200).send(savedCategory);
    })
    .catch((error) => {
      res.status(400);
      console.error(error); // for testing
      res.send(error);
    });
};

module.exports = {
  getAll,
  getCategoryById,
  create,
};
