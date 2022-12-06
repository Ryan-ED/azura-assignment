/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
const path = require('path');
const express = require('express');

const { HOST, PORT, title } = require('./config/config');
const db = require('./config/db');

const vehicleModel = require('./models/vehicle.model');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/site', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const startTime = Date.now();
  next();
  const delta = Date.now() - startTime;
  console.log(`request logged from IP: ${req.ip} for ${req.method}: ${req.url} on ${new Date()} in ${delta}ms`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  db.connect((error) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'The server or database is down...', error });
    } else {
      res.json({ message: 'Server is healthy! Database is up and running!' });
    }
  });
});

app.get(['/', '/vehicles/new'], (req, res) => {
  res.render('add-vehicle', {
    title,
    pageHeader: 'Add new vehicle',
  });
});

app.get('vehicles', async (req, res) => {
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
});

app.get('/vehicles/:id', async (req, res) => {
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
});

app.post('/api/vehicles', async (req, res) => {
  try {
    const createdId = await vehicleModel.addVehicle(req.body);
    res.status(201).json({ message: 'Vehicle captured successfully', createdId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle', error });
  }
});

app.get('/api/vehicles/:id/mileage', async (req, res) => {
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
});

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
