const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db.config');
const routes = require('./routes/route');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the database
db.sequelize.sync({ force: false }).then(() => {
  console.log('Connected to the database');
});

// Routes
app.use('/api', routes);

// MQTT data handling - Include mqtt_sub.js here as an object
const mqttClient = require('./mqtt/mqtt_sub');

mqttClient.onConnect = () => {
  console.log('Connected to MQTT server');
  mqttClient.subscribe('gconnect-sensor');
};

mqttClient.onMessage = (topic, message) => {
  console.log('Received message from MQTT:', topic, message.toString());
  // Process and store the MQTT data as needed
};

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
