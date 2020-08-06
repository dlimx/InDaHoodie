const yup = require('yup');
const designerModel = require('../models/designerModel');

const getAll = async (req, res, next) => {
  let designers;
  try {
    designers = await designerModel.getAll();
    res.status(200).send(designers);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getDesignerById = async (req, res, next) => {
  let designer;
  try {
    designer = await designerModel.getDesignerById(req.params.id);
    res.status(200).send(designer);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const designer = {
    ...req.body,
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  schema
    .validate(designer)
    .then(async (validatedDesigner) => {
      const savedDesigner = await designerModel.createDesigner(
        validatedDesigner,
      );
      res.status(200).send(savedDesigner);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
};

const update = async (req, res, next) => {
  const designer = {
    ...req.body,
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  schema
    .validate(designer)
    .then(async (validatedDesigner) => {
      const updatedDesigner = await designerModel.updateDesigner(
        validatedDesigner,
      );
      res.status(200).send(updatedDesigner);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
};

const deleteDesigner = async (req, res, next) => {
  try {
    await designerModel.deleteDesigner(req.body.id);
    res.status(200);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getAll,
  getDesignerById,
  create,
  update,
  deleteDesigner,
};
