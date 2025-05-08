// server.js
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', require('./internal/stocks/StocksController'));

const filename = path.join(__dirname, 'db', 'stocks.json');
console.log(filename);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
