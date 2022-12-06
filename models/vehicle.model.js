const db = require('../config/db');

module.exports.getVehicles = async () => new Promise((resolve, reject) => {
  const query = 'SELECT * FROM Vehicle';
  db.query(query, (error, results) => {
    if (error) {
      reject(new Error(error));
    }

    resolve(results);
  });
});

module.exports.getVehicleById = async (id) => new Promise((resolve, reject) => {
  const query = 'SELECT * FROM Vehicle WHERE Id = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      reject(new Error(error));
    }

    resolve(results.length > 0 ? results[0] : null);
  });
});

module.exports.getVehicleMileageById = async (id) => new Promise((resolve, reject) => {
  const query = 'SELECT Mileage FROM Vehicle WHERE Id = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      reject(new Error(error));
    }

    return resolve(results.length > 0 ? results[0].Mileage : null);
  });
});

module.exports.addVehicle = async (vehicle) => new Promise((resolve, reject) => {
  const query = 'INSERT INTO Vehicle (Make, Model, Mileage, Colour, Location, `Value`) VALUES(?, ?, ?, ?, ?, ?);';

  const {
    make, model, mileage, colour, location, value,
  } = vehicle;

  db.query(
    query,
    [make, model, mileage, colour, location, value],
    (error, results) => {
      if (error || !results) {
        reject(new Error(error));
      }

      resolve(results.insertId);
    },
  );
});
