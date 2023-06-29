const express = require('express')
const router = express.Router()
const Employee = require('../models/employees')

router.get('/', (req, res) => {
  res.render('orders-log/index')
})

router.get('/new-employee', (req, res) => {

  Employee.find()
    .then((employees) => {
      res.render('orders-log/new-employee', {employee: new Employee(), employees: employees})
    })
    .catch((error) => {
      res.render('orders-log/new-employee', {employee: new Employee() })
    })
})

router.post('/new-employee', (req, res) => {
  const { name, position, password } = req.body

  let newEmployee

  if (password.length === 0) {
    newEmployee = new Employee ({
      name: name,
      position: position
    })
  } else {
    newEmployee = new Employee({
      name: name,
      position: position,
      password: password
    })
  }

  newEmployee.save()
    .then(() => {
      res.send('User registered succesfully')
    })
    .catch((error) => {
      res.status(500).send('Error registering user')
    })

})

router.post('/delete-employee', (req, res) => {
  const name = req.body.name

  Employee.findOneAndDelete({ name: name })
    .then(() => {
      res.redirect('./new-employee')
    })
    .catch((error) => {
      console.error('Error deleting employee', error)
    })
})

module.exports = router