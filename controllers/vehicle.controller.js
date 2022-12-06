/* eslint-disable no-restricted-globals */
const { title } = require('../config/config');
const vehicleModel = require('../models/vehicle.model');

function addVehicle(req, res) {
  res.render('add-vehicle', {
    title,
    pageHeader: 'Welcome to Ryan\'s assignment for Azura Media Limited',
  });
}

async function getVehicles(req, res) {
  try {
    const vehicles = await vehicleModel.getVehicles();

    res.render('index', {
      title,
      pageHeader: 'Welcome to Ryan\'s assignment for Azura Media Limited',
      vehicles,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting vehicles', error });
  }
}

async function getVehicleById(req, res) {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const id = Number(req.params.id);
    const vehicle = await vehicleModel.getVehicleById(id);

    if (vehicle) {
      res.render('view-vehicle', {
        title,
        pageHeader: 'Viewing vehicle details',
        vehicle,
      });
    } else {
      res.status(400).json({ message: 'No vehicle found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting vehicle', error });
  }
}

module.exports = {
  getVehicles,
  getVehicleById,
  addVehicle,
};
