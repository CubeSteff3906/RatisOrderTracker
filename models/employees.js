const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  position: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    default: 'null'
  }
})

module.exports = mongoose.model('Employees', employeeSchema)