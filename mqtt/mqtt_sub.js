const mqtt = require('mqtt');
const db = require('../config/db.config');
const Node = db.node;

// GConnect server configuration
const GCONNECT_SERVER = 'localhost'; // Change for production
const GCONNECT_PORT = 5001; // Change for production
const GCONNECT_URL = `http://${GCONNECT_SERVER}:${GCONNECT_PORT}`;

// MQTT server configuration
const MQTT_SERVER = 'broker.hivemq.com'; // Change for production
const MQTT_URL = `mqtt://${MQTT_SERVER}`;
const MQTT_PORT = 1883; // Change for production
const TOPIC = 'gconnect-sensor';

const client = mqtt.connect(MQTT_URL, { port: MQTT_PORT });

client.on('connect', () => {
  console.log('Connected to MQTT server: ' + MQTT_URL + ':' + MQTT_PORT + '');

  client.subscribe(TOPIC, (err) => {
    if (err) {
      console.log('Error while subscribing to topic: ' + err.message);
    } else {
      console.log('Subscribed to topic: ' + TOPIC);
    }
  });
});

client.on('error', (err) => {
  console.log('Error while connection to MQTT server: ' + err.message);
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('message', async (topic, message) => {
  console.log('Topic: ' + topic);
  console.log('Message received: ');

  try {
    const data = JSON.parse(message.toString());
    console.log(data);

    // Store the MQTT data in the database as a new Node entry
    const newNode = await Node.create({
      nodeId: data.ID,
      temperature: parseFloat(data.t),
      humidity: parseFloat(data.h),
      windspeed: parseFloat(data.w),
      rainfall: parseFloat(data.r),
      latitude: parseFloat(data.lt),
      longitude: parseFloat(data.ln),
      imuRoll: parseFloat(data.rr),
      imuPitch: parseFloat(data.p),
      batteryStatus: parseInt(data.s),
      dangerStatus: parseInt(data.d),
    });

    console.log('Stored MQTT data in the database:', newNode.toJSON());
  } catch (error) {
    console.error('Error while storing MQTT data in the database:', error);
  }
});

// Export the MQTT client object
module.exports = client;
