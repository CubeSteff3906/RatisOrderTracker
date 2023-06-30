const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    default: 'null'
  }
})

module.exports = mongoose.model('Employees', employeeSchema)