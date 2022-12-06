const express = require('express');

const vehicleController = require('../controllers/vehicle.controller');

const vehicleRouter = express.Router();

vehicleRouter.get('/', vehicleController.getVehicles);
vehicleRouter.get('/new', vehicleController.addVehicle);
vehicleRouter.get('/:id', vehicleController.getVehicleById);

module.exports = vehicleRouter;
