const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();

// Database
const db = require('./config/db.config')

db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and Resync with { force: true }')
})

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// Bodyparser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// MQTT client
const mqttClient = require('./mqtt/mqtt_sub')
// mqttClient()

// Port
const port = process.env.PORT || 5000
app.set('port', port)

// API version
const apiVersion = process.env.API_VERSION

// Import routes
const route = require('./routes/route')

// Routes
app.use('/' + apiVersion, route)

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  console.error(`[${Date.now()}] ${req.method} ${req.path} ${err.status} ${err.message}`)
  next(err)
})

// Error handlers

// development error handler
// will print stacktrace
if (process.env.ENVIROMENT === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  })
})

// Start our rest api server
var server = app.listen(app.get('port'), function() {
  console.log('RESTful API server listening on port ' + server.address().port)
  console.log("server: http://localhost:" + server.address().port + "/" + apiVersion)
})

// prevent too long threshold
server.timeout = 2048