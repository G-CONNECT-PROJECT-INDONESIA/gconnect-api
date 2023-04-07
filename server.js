const express = require('express')
// const mongoose = require('./middleware/mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();

// Mongoose middleware
// app.use(mongoose.checkState)

// Bodyparser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Port
const port = process.env.PORT || 5000
app.set('port', port)

// API version
const apiVersion = process.env.API_VERSION

// Import routes
const index = require('./routes/index')
// const sensordata = require('./routes/sensordata')
// const nodes = require('./routes/nodes')

// Routes
app.use('/' + apiVersion, index)  // this is the default route for greeting
// app.use('/' + apiVersion + sensordata, require('./routes/sensordata'))
// app.use('/' + apiVersion + '/nodes', require('./routes/nodes'))

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
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