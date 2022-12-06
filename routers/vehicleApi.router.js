const express = require('express');

const vehicleApiController = require('../controllers/vehicleApi.controller');

const apiRouter = express.Router();

apiRouter.post('/', vehicleApiController.addVehicle);
apiRouter.get('/:id/mileage', vehicleApiController.getVehicleMileageById);

module.exports = apiRouter;
