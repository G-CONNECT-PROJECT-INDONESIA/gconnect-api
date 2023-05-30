const express   = require('express')
const router         = express.Router()
require("dotenv").config()

const product = process.env.PRODUCT_NAME
const version = process.env.API_VERSION

/* get home url */
router.get('/', function(req, res, next) {
  response = {
    status: 'success',
    message: `Welcome to ${product} ${version}`,
  } 
  console.log(`[${Date.now()}] ${req.method} ${req.path} ${JSON.stringify(response)}`)
  res.status(200)
    .json(response)
})

router.use('/sensornode', require('./sensornode.route'))
router.use('/sensordata', require('./sensordata.route'))

module.exports = router