require("dotenv").config();
const http = require("http");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mqttClient = require("./lib/mqtt");
const db = require("./config/db_config");
const api = require("./controllers/api");
const routes = require("./controllers/routes");
const { Server } = require("socket.io");
const app = express();
app.use(cors);
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
      origin: '*',
    }
});

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: false }).then(() => {
    console.log("Connected to mysql database");
});

const api_version = process.env.API_VERSION;
app.use("/api/" + api_version, routes);

io.on("connection", (socket) => {
    console.log("A user connected");

    setInterval(() => {
        const data = { temperature: Math.random(), property2: Math.random() };
        console.log('Data sent to clients:', data);
        io.emit('dataUpdate', data);
    }, 1000);

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(PORT, () => { 
    console.log(`Server is running http://192.168.1.11:${PORT}`);
});
