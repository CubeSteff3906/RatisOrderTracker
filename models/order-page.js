const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
  Nr_Comanda: {
    type: Number,
    required: true
  },
  Cantitate: {
    type: Number,
    required: true,
    default: 0
  },
  Data_Intrare: {
    type: Date,
    required: true
  },
  Data_iesire: {
    type: Date,
    required: false
  },
  Stadiu: {
    type: String,
    required: true,
    default: "In productie"
  }

})

module.exports = mongoose.model('Orders', ordersSchema)