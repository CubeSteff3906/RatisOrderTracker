const express = require('express')
const router = express.Router() //built-in middleware function used for creating sets of routes


const Employees = require('../models/employees')

    // Route handlers
    //Home Page
    router.get('/', (req, res) => { //GETs req from root (localhost:3000) and sends res back
      res.render('index')
    })

    // Technical POST page for querying the Employees database on the server-side
    router.post('/check-name', async (req, res) => {
      const id = req.body.id; // Get the submitted id from the request body

      try {
        const angajat = await Employees.findOne({ id: id })

        if (angajat) {
          const position = angajat.position;
          const id = angajat.id;

          if (position === "employee" || position === "verification") {
            res.redirect('/order-scan?id=${id}')
          } else if (position === "admin") {
            res.redirect('/orders-log')
          } else {
            console.log('Error finding existing position: ', position)
          }
        } else {
          console.log('Name not found in database')
        }
      } catch (error) {
        console.error(error);
      }
      
    })

module.exports = router //Tells the app that router is the object it should parse into indexRouter from server.js
//It's a bit like a return statement, if you will