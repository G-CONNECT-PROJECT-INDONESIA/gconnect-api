require("dotenv").config();
const mqtt = require("mqtt");
const db = require("../config/db_config");
const Node = db.node;
const Gateway = db.gateway;

const MQTT_SERVER = process.env.MQTT_HOST || "broker.hivemq.com";
const MQTT_URL = `mqtt://${MQTT_SERVER}`;
const MQTT_PORT = process.env.MQTT_PORT || 1883;
const TOPIC = "gconnect-sensor";

const client = mqtt.connect(MQTT_URL, {
    port: MQTT_PORT,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
});

client.on("connect", () => {
    console.log("Connected to MQTT server: " + MQTT_URL + ":" + MQTT_PORT + "");

    client.subscribe(TOPIC, (err) => {
        console.log("Subscribed to topic: " + TOPIC);
    });
});

async function updateGateway(gateway_id, gateway_name) {
    const [gateway, created] = await Gateway.findOrCreate({
        where: { gateway_name },
        defaults: { gateway_id },
    });
    console.log(gateway);
}

client.on("message", async (topic, message) => {
    console.log("Topic: " + topic);
    console.log("Message received: ");

    try {
        const data = JSON.parse(message.toString());
        // console.log(data);

        await updateGateway(data.gateway_id, data.gateway_name);

        const node = await Node.create({
            node_id: data.node_id,
            gateway_id: data.gateway_id,
            temperature: data.temperature,
            humidity: data.humidity,
            windspeed: data.windspeed,
            soil_moisture: data.soil_moisture,
            rainfall: data.rainfall,
            water_level: data.water_level,
            pitch: data.pitch,
            roll: data.roll,
            latitude: data.latitude,
            longitude: data.longitude,
        });

        console.log("Data stored successfully.", node);
        // } else {
        //   console.log("Gateway not found.");
        // }
    } catch (error) {
        console.error("Error parsing :", error);
    }
});

module.exports = client;
