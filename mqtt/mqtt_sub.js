const mqttClient = () => {
  const mqtt = require('mqtt')

  const SERVER = 'localhost'
  const SERVER_URL = `mqtt://${SERVER}`
  const PORT = 1883;
  const TOPIC = 'gconnect-sensor';

  const client = mqtt.connect(SERVER_URL, { port: PORT });

  client.on('connect', () => {
    console.log('Connected to MQTT server: ' + SERVER_URL + ':' + PORT + '');

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
    console.log("Connection closed")
  });

  client.on('message', (topic, message) => {
    console.log('Topic: ' + topic)
    console.log('Message received: ' + message.toString())
    
    fetch('http://localhost:5001/v0/sensordata', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      if (response.ok) {
        console.log(`[${Date.now()}] MQTT client message sent to API`)
      } else {
        console.log(`[${Date.now()}] MQTT client message not sent to API`)
      }
    }).catch((err) => {
      console.log('MQTT client message not sent to API: ' + err.message)
    })
  })
}

module.exports = mqttClient

// fetch('http://localhost:3000/v0/sensordata', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: message.toString()
    // }).then((response) => {
    //   if (response.ok) {
    //     console.log('MQTT client message sent to API')
    //   } else {
    //     console.log('MQTT client message not sent to API')
    //   }
    // }).catch((err) => {
    //   console.log('MQTT client message not sent to API: ' + err.message)
    // })