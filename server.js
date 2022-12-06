/* eslint-disable no-console */
const path = require('path');
const express = require('express');

const { HOST, PORT } = require('./config/config');
const db = require('./config/db');

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

app.get(['/', '/vehicles'], (req, res) => {
  const vehicles = [];
  db.query('SELECT * FROM Vehicle', (error, results) => {
    if (error) {
      console.log('Error getting data', error);
      return;
    }

    vehicles.push(...results);
  });

  res.render('index', {
    title: 'Azura Assignment',
    pageHeader: 'Welcome to Ryan\'s assignment for Azura Media Limited',
    vehicles,
  });
});

app.get('/vehicles/new', (req, res) => {
  res.render('add-vehicle', {
    title: 'Azura Assignment',
    pageHeader: 'Add new vehicle',
  });
});

app.get('/vehicles/:id', (req, res) => {
  const id = Number(req.params.id);
  let vehicle;
  db.query(
    'SELECT * FROM Vehicle WHERE Id = ?',
    [id],
    (error, results) => {
      if (error) {
        console.log('Error getting data', error);
        return;
      }

      if (results.length > 0) {
        [vehicle] = results;
      }

      res.render('view-vehicle', {
        title: 'Azura Assignment',
        pageHeader: 'Viewing vehicle details',
        vehicle,
      });
    },
  );
});

app.post('/vehicles', (req, res) => {
  const {
    make, model, mileage, colour, location, value,
  } = req.body;

  db.query(
    'INSERT INTO Vehicle (Make, Model, Mileage, Colour, Location, `Value`) VALUES(?, ?, ?, ?, ?, ?)',
    [make, model, mileage, colour, location, value],
    (error) => {
      if (error) {
        console.log('Error getting data', error);
        return;
      }

      res.redirect('vehicles');
    },
  );
});

app.get('/api/vehicles/:id/value', (req, res) => {
  const id = Number(req.params.id);
  let vehicle;
  db.query(
    'SELECT Value FROM Vehicle WHERE Id = ?',
    [id],
    (error, results) => {
      if (error) {
        console.log('Error getting data', error);
        return;
      }

      if (results.length > 0) {
        [vehicle] = results;
      }

      res.json({ vehicle });
    },
  );
});

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
