const mqtt = require("mqtt");
const db = require("../config/db.config");
const Node = db.node;

// GConnect server configuration
const GCONNECT_SERVER = "localhost"; // Change for production
const GCONNECT_PORT = 5001; // Change for production
const GCONNECT_URL = `http://${GCONNECT_SERVER}:${GCONNECT_PORT}`;

// MQTT server configuration
const MQTT_SERVER = "broker.hivemq.com"; // Change for production
const MQTT_URL = `mqtt://${MQTT_SERVER}`;
const MQTT_PORT = 1883; // Change for production
const TOPIC = "gconnect-sensor";

const mqttSubscribe = () => {
  const client = mqtt.connect(MQTT_URL, { port: MQTT_PORT });

  client.on("connect", () => {
    console.log("Connected to MQTT server: " + MQTT_URL + ":" + MQTT_PORT + "");

    client.subscribe(TOPIC, (err) => {
      if (err) {
        console.log("Error while subscribing to topic: " + err.message);
      } else {
        console.log("Subscribed to topic: " + TOPIC);
      }
    });
  });

  client.on("error", (err) => {
    console.log("Error while connection to MQTT server: " + err.message);
  });

  client.on("close", () => {
    console.log("Connection closed");
  });

  client.on("message", async (topic, message) => {
    console.log("Topic: " + topic);
    console.log("Message received: ");

    try {
      // Check if message is empty
      if (message.length === 0) {
        console.log("Message is empty");
        return;
      }

      try {
        const data = JSON.parse(message.toString());
        console.log(data);

        // Store the MQTT data in the database as a new Node entry
        const nodedata = {
          gatewayName: data.N,
          nodeId: data.ID,
          temperature: (data.t !== null && data.t !== undefined) ? parseFloat(data.t) : null,
          humidity: (data.h !== null && data.h !== undefined) ? parseFloat(data.h) : null,
          windspeed: (data.w !== null && data.w !== undefined) ? parseFloat(data.w) : null,
          soilMoisture: (data.s !== null && data.s !== undefined) ? parseFloat(data.s) : null,
          rainfall: (data.rr !== null && data.rr !== undefined) ? parseFloat(data.rr) : null,
          waterLevel: (data.wl !== null && data.wl !== undefined) ? parseFloat(data.wl) : null,
          latitude: (data.lt !== null && data.lt !== undefined) ? parseFloat(data.lt) : null,
          longitude: (data.ln !== null && data.ln !== undefined) ? parseFloat(data.ln) : null,
          imuPitch: (data.p !== null && data.p !== undefined) ? parseFloat(data.p) : null,
          imuRoll: (data.r !== null && data.r !== undefined) ? parseFloat(data.r) : null,
          // batteryStatus: parseInt(data.s) || null,
          // dangerStatus: parseInt(data.d) || null,
        };

        console.log({ data: nodedata });

        const newNode = await Node.create(nodedata);

        const response = {
          message: "Node created successfully",
          node: newNode,
        };
      } catch (error) {
        console.log("Error while parsing message: " + error.message);
        console.log("Message: " + message.toString());
        return;
      }
    } catch (error) {
      console.error("Error while storing MQTT data in the database:", error);
    }
  });
};

// Export the MQTT client object
module.exports = mqttSubscribe;
