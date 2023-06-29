
//.get handles GET requests from a specific web app path

const express = require('express')
const router = express.Router()

// GETs requests from client on the order-scan page (req is read from the barcode)
router.get('/', (req, res) => { 
  res.render('order-scan/index')
})

// Send new order that has been accepted in production
router.post('/order-controller', (req, res) => {
  res.send('New order')
})

module.exports = router