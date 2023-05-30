const mqttClient = async () => {
  const mqtt = require('mqtt')
  const db = require('../config/db.config')
  const SensorNode = db.sensornode

  // GConnect server configuration
  const GCONNECT_SERVER = 'localhost'  // change for production
  const GCONNECT_PORT = 5001;           // change for production
  const GCONNECT_URL = `http://${GCONNECT_SERVER}:${GCONNECT_PORT}`
  

  // MQTT server configuration
  const MQTT_SERVER = 'localhost'           // change for production
  const MQTT_URL = `mqtt://${MQTT_SERVER}`
  const MQTT_PORT = 1883;                   // change for production
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
    console.log(
      'Error while connection to MQTT server: ' + err.message
    );
  });

  client.on('close', () => {
    console.log("Connection closed")
  });

  client.on('message', async (topic, message) => {
    console.log('Topic: ' + topic)
    console.log('Message received: ')
    const data = JSON.parse(message.toString())
    console.log(data)

    SensorNode.findOne({
      where: {
        nodeName: data.nodeName
      }
    }).then(sensorNode => {
      if (!sensorNode) {
        console.log('Sensor node not found')
        return
      }

      fetch(`${GCONNECT_URL}/v0/sensordata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nodeId: sensorNode.nodeId,
          temperature: data.temperature,
          humidity: data.humidity,
          windspeed: data.windspeed,
          rainfall: data.rainfall,
          latitude: data.latitude,
          longitude: data.longitude,
          imuRoll: data.imuRoll,
          imuPitch: data.imuPitch,
          batteryStatus: data.batteryStatus,
          dangerStatus: data.dangerStatus
        })
      }).then(res => {
        console.log('Response from GConnect server: ' + json.stringify(res))
        console.log('Sensor data created')
      }).catch(err => {
        console.log('Error while creating sensor data: ' + err.message)
      })

      return
    }).catch(err => {
      console.log('Error while finding sensor node: ' + err.message)
    })
    
  })
}

module.exports = mqttClient