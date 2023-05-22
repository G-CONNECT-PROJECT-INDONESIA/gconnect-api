const mqtt = require('mqtt');

const SERVER = 'localhost';
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
    console.log('Topic: ' + topic);
    // console.log('Message received: ' + message.toString());

    // get node id from http://localhost:5001/v0/sensornode/name/node1 and print it
    const getNodeId = async (message) => {
        await fetch(`http://localhost:5001/v0/sensornode/name/${message.nodeName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        return await response.json();
    }

    
});