const path = require('path');
const express = require('express');
const routes = require('./api/routes');
const errorHandler = require('./api/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use('/loja', routes);
app.use(errorHandler);

module.exports = app;
