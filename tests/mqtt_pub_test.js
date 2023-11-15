const mqtt = require("mqtt");

const mqtt_host = "mqtt://broker.hivemq.com";
const topic = "gconnect-sensor";

function randomData() {
    const data = {
        gateway_name: "imogiri",
        gateway_id: 1,
        node_id: 2,
        temperature: Math.random() * 100,
        humidity: Math.random() * 100,
        windspeed: Math.random() * 100,
        soil_moisture: Math.random() * 100,
        rainfall: Math.random() * 100,
        water_level: Math.random() * 100,
        pitch: Math.random() * 360,
        roll: Math.random() * 360,
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
    };
    return JSON.stringify(data);
}

const client = mqtt.connect(mqtt_host);

setInterval(() => {
    const data = randomData();
    client.publish(topic, data);
    console.log("Data published:", data);
}, 3000);
