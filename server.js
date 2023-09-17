const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db.config');
const routes = require('./routes/route');

require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the database
db.sequelize.sync({ force: false }).then(() => {
  console.log('Connected to the database');
});

// Routes
const apiVersion = process.env.API_VERSION;
app.use('/api/' + apiVersion, routes);

// MQTT data handling - Include mqtt_sub.js here as an object
const mqttClient = require('./mqtt/mqtt_sub');
mqttClient();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:` + PORT);
});
