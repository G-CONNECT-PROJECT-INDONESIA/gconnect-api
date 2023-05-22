const mqtt = require('mqtt');

const SERVER = 'localhost';
const SERVER_URL = `mqtt://${SERVER}`;
const PORT = 1883;

const client = mqtt.connect(SERVER_URL, { port: PORT });

client.on('connect', () => {
    console.log('Connected to MQTT server');

    const lattitude = -7.431391123123
    const longitude = 109.24783312345

    setInterval(() => {
        const data = {
            nodeName: 'node1',
            temperature: Math.floor(Math.random() * 21) + 20,
            humidity: Math.floor(Math.random() * 41) + 40,
            windspeed: Math.floor(Math.random() * 16) + 5,
            rainfall: Math.floor(Math.random() * 11),
            lattitude: lattitude + (Math.random() * 0.0001),
            longitude: longitude + (Math.random() * 0.0001),
            imuRoll: Math.floor(Math.random() * 2) + 1.5,
            imuPitch: Math.floor(Math.random() * 2) + 1.5,
            batteryStatus: 90,
            dangerStatus: 0,
        };

        client.publish('gconnect-sensor', JSON.stringify(data));
        console.log('Data sent');
    }, 5000);

});

client.on('error', (err) => {
    console.log(
        'Error while connecting to MQTT server: ' + err
    );
});

client.on('close', () => {
    console.log('Connection closed');
});