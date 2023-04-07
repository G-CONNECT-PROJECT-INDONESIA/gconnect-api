const {Router}    = require('express')
const product     = require('../package.json').name
const version     = require('../package.json').version
const app         = Router()

/* get home url */
app.get('/', function(req, res, next) {
  res.status(200)
    .json({
        status: 'success',
        message: 'Welcome to ' + product + ' v' + version,
    })
})

module.exports = app