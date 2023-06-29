const express = require('express')
const router = express.Router()
const Order = require('../models/order-page')


//This is going to be the main "Scan File" page
router.get('/', (req, res) => {
  res.render('order-scan/index')
})

//At the moment, we will GET all manufacturing process screens

//Renders of all three subpages on the three scans in the process
router.get('/new', (req, res) => {
  res.render('order-scan/new', { order: new Order() })
})

router.get('/finish', (req, res) => {
  res.render('order-scan/finish')
})

router.get('/verification', (req, res) => {
  res.render('order-scan/verification')
})

// This POSTs new orders into the orders-log (from the order-scan/new route)
router.post('../orders-log', (req, res) => {
  res.send('New order has been added to list')
})

module.exports = router