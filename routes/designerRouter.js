const express = require('express');
const designerService = require('../services/designerService');

const designerRouter = express.Router();

designerRouter.get('/', designerService.getAll);
designerRouter.get('/:id', designerService.getDesignerById);
designerRouter.post('/create', designerService.create);
designerRouter.put('/update', designerService.update);
designerRouter.delete('/delete', designerService.deleteDesigner);

module.exports = designerRouter;
