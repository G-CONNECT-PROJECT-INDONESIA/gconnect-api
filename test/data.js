const mqtt = require("mqtt");
const client = mqtt.connect("mqtt:broker.hivemq.com");
const topic = "gconnect-sensor";

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomData() {
  const randomData = {
    N:"IMO",
    ID:"1",
    w: (getRandomValue(45, 60)).toFixed(2),     // Random value between 0 and 100 for 'w' --> wind speed
    h: (getRandomValue(2, 30)).toFixed(4),     // Random value between 0 and 100 for 'h' --> humidity
    t: (getRandomValue(0, 10)).toFixed(2),     // Random value between 0 and 100 for 't' --> temperature
    s: (getRandomValue(0, 23)).toFixed(1),      // Random value between 0 and 10 for 's' --> soil moisture
    rr: (getRandomValue(0, 10)).toFixed(2),    // Random value between 0 and 100 for 'rr' --> rainfall
    p: (getRandomValue(0, 10)).toFixed(2),    // Random value between 10 and 100 for 'p' --> imu pitch
    r: (getRandomValue(0, 10)).toFixed(2),     // Random value between 20 and 30 for 'r' --> imu roll
    wl: (getRandomValue(0, 10)).toFixed(2),    // Random value between 0 and 100 for 'wl' --> water level
    lt: 7.803500,  // 'lt' --> latitude
    ln: 110.364600 // 'ln' --> longitude
  };

  const data = JSON.stringify(randomData);
  return data;
}

let i = 0;

client.on("connect", () => {
  setInterval(() => {
    i = String(i);
    const text = getRandomData();
    client.publish(topic, text);
    console.log(text);
    i++;
  }, 1000);
});

