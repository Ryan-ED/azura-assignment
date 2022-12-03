const mysql = require('mysql');
const express = require('express');
const app = express();

const HOST = 'localhost';
const PORT = 3000;

const connection = mysql.createConnection({
    host: HOST,
    user: 'ryan',
    password: 'youshouldhireme',
    database: 'Azura'
});

connection.connect(error => {
    if (error) {
        console.log('DB connection error', error.stack);
        return;
    }

    console.log(`Connected as id: ${connection.threadId}`);
})

app.use((req, res, next) => {
    const startTime = Date.now();
    next();
    const delta = Date.now() - startTime;
    console.log(`request logged for ${req.method}: ${req.url} on ${new Date()} in ${delta}ms`);
});

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.get('/health', (req, res) => {
    res.json({ message: 'Server is healthy!' });
});

app.get('/vehicles', (req, res) => {
    connection.query('SELECT * FROM Vehicle', function (error, results, fields) {
        if (error) {
            console.log('Error getting data', error);
        }
        res.json(results);
    })
});

app.get('/vehicles/:id', (req, res) => {
    const id = Number(req.params.id);
    connection.query('SELECT * FROM Vehicle WHERE Id = ?', [id], function (error, results, fields) {
        if (error) {
            console.log('Error getting data', error);
        }
        res.json(results);
    })
});

app.post('/vehicles', (req, res) => {
    const { make, model, mileage, colour, location, value } = req.body;
    connection.query('INSERT INTO Vehicle (Make, Model, Mileage, Colour, Location, `Value`) VALUES(?, ?, ?, ?, ?, ?)', [make, model, mileage, colour, location, value], function (error, results, fields) {
        if (error) {
            console.log('Error getting data', error);
        }

        res.status(201).json({ id: results.insertId, message: 'Vehicle captured successfully' });
    })
});

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
