const yup = require('yup');
const productCategoryModel = require('../models/productCategoryModel');

const createProductCategory = async (req, res, next) => {
  const productCategory = {
    ...req.body, // product_id and category_id should be passed in body
  };

  const schema = yup.object().shape({
    product_id: yup.number().required(),
    category_id: yup.number().required(),
  });

  schema
    .validate(productCategory)
    .then(async (validatedProductCategory) => {
      const savedProductCategory = await productCategoryModel.createProductCategory(
        validatedProductCategory,
      );
      res.status(200).send(savedProductCategory);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
};

const deleteProductCategory = async (req, res, next) => {
  const productCategory = {
    ...req.body, // product_id and category_id should be passed in body
  };

  try {
    await productCategoryModel.deleteProductCategory(productCategory);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  createProductCategory,
  deleteProductCategory,
};
