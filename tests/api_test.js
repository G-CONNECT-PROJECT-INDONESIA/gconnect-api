const axios = require("axios");

const BASE_URL = "http://localhost:8000/api/v1";
const NODES_URL = `${BASE_URL}/nodes`;
const GATEWAYS_URL = `${BASE_URL}/gateways`;
const NODE_DATA_URL = `${BASE_URL}/nodes/nodeId/{node_id}/`;
const NODE_DATA_TIME_URL = `${BASE_URL}/nodes/nodeId/{node_id}/{from}/{hours}`;

const newNode = {
    node_id: 5,
    temperature: 25.5,
    rainfall: 5.2,
};

async function testApiEndpoints() {
    try {
        //test create new node, and add some data
        // const createdNode = await axios.post(NODES_URL, newNode);
        // console.log("Created Node:", createdNode.data);

        // test get all nodes data
        // const nodes = await axios.get(NODES_URL);
        // console.log("All Nodes:", nodes.data);

        //test get all nodes by id
        const nodeId = 1;
        const nodeData = await axios.get(
            NODE_DATA_URL.replace("{nodeId}", nodeId),
        );
        console.log(`Node ${nodeId} hours Data:`, nodeData.data);

        //test get all nodes by id and time
        const hours = 1;
        const time = 3;
        const nodeDataTime = await axios.get(
            NODE_DATA_URL.replace("{node_id}", nodeId),
            NODE_DATA_URL.replace("{hours}", hours),
            NODE_DATA_URL.replace("{from}", time),
        );
        console.log(`Last ${hours} Data:`, nodeDataTime.data);

        // const newGateway = {
        //     gateway_name: "gateway2",
        //     gateway_id: 2,
        // };

        //test create new gateway
        // const createdGateway = await axios.post(GATEWAYS_URL, newGateway);
        // console.log("Created Gateway:", createdGateway.data);

        // const gateways = await axios.get(GATEWAYS_URL);
        // console.log("All Gateways:", gateways.data);
    } catch (error) {
        console.error('fail',error.messages);
    }
}

testApiEndpoints();