/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
const vehicleModel = require('../models/vehicle.model');

async function addVehicle(req, res) {
  try {
    const createdId = await vehicleModel.addVehicle(req.body);
    res.status(201).json({ message: 'Vehicle captured successfully', createdId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error adding vehicle', error });
  }
}

async function getVehicleMileageById(req, res) {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const id = Number(req.params.id);
    const mileage = await vehicleModel.getVehicleMileageById(id);

    if (mileage != null) {
      res.json({ isSuccess: true, mileage });
    } else {
      res.status(404).json({ isSuccess: true, mileage: 0, message: 'No mileage data present for the given ID' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ isSuccess: false, mileage: 0, message: 'Error getting vehicle data' });
  }
}

module.exports = {
  addVehicle,
  getVehicleMileageById,
};
