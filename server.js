/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
const path = require('path');
const express = require('express');

const { HOST, PORT } = require('./config/config');
const db = require('./config/db');

const vehicleRouter = require('./routers/vehicle.router');
const vehicleApiRouter = require('./routers/vehicleApi.router');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/site', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const startTime = Date.now();
  next();
  const delta = Date.now() - startTime;
  console.log(`request logged from IP: ${req.ip} for ${req.method}: ${req.baseUrl}${req.url} on ${new Date()} in ${delta}ms`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/vehicles');
});

app.use('/vehicles', vehicleRouter);
app.use('/api/vehicles', vehicleApiRouter);

app.get('/health', (req, res) => {
  db.getConnection((error) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'The server or database is down...', error });
    } else {
      res.json({ message: 'Server is healthy! Database is up and running!' });
    }
  });
});

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
