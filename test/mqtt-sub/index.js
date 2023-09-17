const mqtt = require('mqtt');

const SERVER = 'broker.hivemq.com';
const SERVER_URL = `mqtt://${SERVER}`;
const PORT = 1883;
const TOPIC = 'gconnect-sensor';

const client = mqtt.connect(SERVER_URL, { port: PORT });

client.on('connect', () => {
    console.log('Connected to MQTT server');

    client.subscribe(TOPIC, (err) => {
        if (err) {
            console.log('Error while subscribing to topic: ' + err.message);
        } else {
            console.log('Subscribed to topic: ' + TOPIC);
        }
    });

});

client.on('error', (err) => {
    console.log(
        'Error while connection to MQTT server: ' + err.message
    );
});

client.on('close', () => {
    console.log("Connection closed");
});

client.on('message', (topic, message) => {
    // check if message not empty
    if (message.length === 0) {
        console.log('Message is empty');
        return;
    }

    // convert message to string
    const raw = JSON.parse(message.toString());
    
    const data = {
        gatewayName: raw.N,
        nodeId: raw.ID,
        // windspeed: raw.w,
        temperature: raw.t,
        humidity: raw.h,
        soilMoisture: raw.s,
        // rainfall: raw.rr,
        imuRoll: raw.r,
        imuPitch: raw.p,
        waterLevel: raw.wl,
        // latitude: raw.lt,
        // longitude: raw.ln,
    }

    console.log(data);
});