const mysql = require('mysql');
const express = require('express');
const app = express();

const HOST = 'localhost';
const PORT = 3000;

const connection = mysql.createConnection({
    host: HOST,
    user: 'azura',
    password: 'YouShouldHireRyan',
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

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.get('/health', (req, res) => {
    res.json({ message: 'Server is healthy!' });
});

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});