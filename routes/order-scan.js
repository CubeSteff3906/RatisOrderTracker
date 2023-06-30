const express = require('express')
const router = express.Router()
const Orders = require('../models/order-page')
const Employees = require('../models/employees')


//This is going to be the main "Scan File" page
router.get('/', (req, res) => {
  const id = req.query.id;
  res.render('order-scan/index', { id: id })
})

//At the moment, we will GET all manufacturing process screens

//Renders of all three subpages on the three scans in the process
router.get('/new', (req, res) => {
  res.render('order-scan/new')
})

router.get('/finish', (req, res) => {
  res.render('order-scan/finish')
})

router.get('/verification', (req, res) => {
  res.render('order-scan/verification')
})

// This POSTs new orders into the orders-log (from the order-scan/new route)
router.post('/orders-log', (req, res) => {
  res.send('New order has been added to list')
})

//Technical POST for querying orders database
router.post('/check-order', async (req, res) => {
  const id_comanda_scanata = req.body.id;
  const id_angajat_curent = req.body.id;

  try {
    const comanda_scanata = await Orders.findOne({ id: id_comanda_scanata })
    const angajat_curent = await Employees.findOne({ id: id_angajat_curent })

    if (comanda_scanata) {
      const status = comanda_scanata.status;
      
      const position = angajat_curent.position;
      
      const nume_angajat_preluare = comanda_scanata.name;
      const angajat_preluare = await Employees.findOne({ name: nume_angajat_preluare })
      const id_angajat_preluare = angajat_preluare.id;

      if (status === "In Productie") {
        if (id_angajat_curent === id_angajat_preluare) {
          res.render('./finish')
        } else {
          res.render('Doar angajatul care a initiat comanda o poate finaliza')
        }
      } else if (status === "In Verificare") {
        if (position === 'verification') {
          res.render('./verification')
        } else {
          res.render('Nu aveti permisiunea necesara sa efectuati inspectia piesei')
        }
      } else {
        res.render('Comanda se afla deja in magazie')
      }
    } else {
      // Orice post poate scana o fisa noua si confirma preluarea comenzii
      res.render('order-scan/new', { id: id_angajat_curent })
    }

  } catch (error) {
    console.log(error);
  }
})

module.exports = router