const express = require('express')
const router = express.Router() //built-in middleware function used for creating sets of routes

//Home Page
router.get('/', (req, res) => { //GETs req from root (localhost:3000) and sends res back
  res.render('index')
})

module.exports = router //Tells the app that router is the object it should parse into indexRouter from server.js
//It's a bit like a return statement, if you will