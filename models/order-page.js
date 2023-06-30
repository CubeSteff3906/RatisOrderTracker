const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  cantitate: {
    type: Number,
    required: true,
    default: 0
  },
  data_initiere: {
    type: Date,
    required: true
  },
  data_finalizare: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('Orders', ordersSchema)