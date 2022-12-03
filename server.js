const express = require('express');
const app = express();

const HOST = 'localhost';
const PORT = 3000;

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