const express = require('express');
const cors = require('cors');

 // Importing all routes from index.js in routes directory
const routes = require('./routes')
const app = express();

app.use(cors());
app.use(express.json());

// Use the consolidated routes
app.use('/api', routes);

module.exports = app;
