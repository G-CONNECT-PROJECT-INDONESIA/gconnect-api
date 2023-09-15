const axios = require('axios');
const mqtt = require('mqtt');

const BASE_URL = 'http://localhost:8000/api'; 
const NODES_URL = `${BASE_URL}/nodes`;
const GATEWAYS_URL = `${BASE_URL}/gateways`;
const NODE_DATA_URL = `${BASE_URL}/nodes/{nodeId}/data`; // replace {nodeId} with an actual node ID

const MQTT_SERVER = 'broker.hivemq.com'; 
const MQTT_URL = `mqtt://${MQTT_SERVER}`;
const MQTT_PORT = 1883; 
const TOPIC = 'gconnect-sensor';

const client = mqtt.connect(MQTT_URL, { port: MQTT_PORT });

client.on('connect', () => {
  console.log('Connected to MQTT server');

  client.subscribe(TOPIC, (err) => {
    if (err) {
      console.error('Error while subscribing to topic:', err);
    } else {
      console.log('Subscribed to topic:', TOPIC);
    }
  });
});

client.on('message', (topic, message) => {
  console.log('Received MQTT message on topic:', topic);
  console.log('Message:', message.toString());
});

async function testApiEndpoints() {
  try {
    const newNode = {
      nodeId: 1,
      temperature: 25.5,
      rainfall: 5.2,
    };

    const createdNode = await axios.post(NODES_URL, newNode);
    console.log('Created Node:', createdNode.data);

    const nodes = await axios.get(NODES_URL);
    console.log('All Nodes:', nodes.data);

    const nodeId = 1;
    const nodeData = await axios.get(NODE_DATA_URL.replace('{nodeId}', nodeId));
    console.log(`Node ${nodeId} Data:`, nodeData.data);

    //create a new gateway
    const newGateway = {
      gatewayName: 'Gateway1',
      nodeList: 5,
    };

    const createdGateway = await axios.post(GATEWAYS_URL, newGateway);
    console.log('Created Gateway:', createdGateway.data);

    const gateways = await axios.get(GATEWAYS_URL);
    console.log('All Gateways:', gateways.data);
  } catch (error) {
    console.error('Error while testing API endpoints:', error.message);
  }
}

testApiEndpoints();
