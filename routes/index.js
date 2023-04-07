const {Router}    = require('express')
const product     = require('../package.json').name
const version     = require('../package.json').version
const app         = Router()

/* get home url */
app.get('/', function(req, res, next) {
  response = {
    status: 'success',
    message: 'Welcome to ' + product + ' v' + version,
  }
  console.log(response)
  res.status(200)
    .json(response)
})

module.exports = app