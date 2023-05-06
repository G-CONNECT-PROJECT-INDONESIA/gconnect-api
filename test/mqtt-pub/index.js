const mqtt = require('mqtt');

const SERVER = 'localhost';
const SERVER_URL = `mqtt://${SERVER}`;
const PORT = 1883;

const client = mqtt.connect(SERVER_URL, { port: PORT });

client.on('connect', () => {
    console.log('Connected to MQTT server');

    let gps = {
        lattitude: -7.431391,
        longitude: 109.247833
    };

    setInterval(() => {
        const data = {
            node_id: 'node-1',
            temperature: Math.floor(Math.random() * 21) + 20,
            humidity: Math.floor(Math.random() * 41) + 40,
            wind_speed: Math.floor(Math.random() * 16) + 5,
            soil_moisture: Math.floor(Math.random() * 11),
            rainfall: Math.floor(Math.random() * 11),
            gps: gps,
            accelerometer: {
                x: Math.floor(Math.random() * 11),
                y: Math.floor(Math.random() * 11),
                z: Math.floor(Math.random() * 11)
            },
            flood_status: Math.floor(Math.random() * 3),
            landslide_category: Math.floor(Math.random() * 3)
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