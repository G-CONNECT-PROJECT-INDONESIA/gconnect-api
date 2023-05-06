const mqtt = require('mqtt');
require('dotenv');

// const SERVER = process.env.MQTT_SERVER || 'localhost';
const SERVER = 'broker.hivemq.com';
const PORT = 1883;
const TOPIC = 'gconnect-sensor';

const client = mqtt.connect(`mqtt://broker.hivemq.com:1883`);

const MqttClient = () => {
    console.log('MQTT client created');
    client.on('connect', () => {
        console.log('MQTT client connected');
        client.subscribe(TOPIC);
    });
    
    client.on('message', (topic, message) => {
        console.log('MQTT client received message');
        console.log(message.toString());
    });

    client.on('error', (err) => {
        console.log('MQTT client error');
        console.log(err);
    });
};

module.exports = MqttClient;
