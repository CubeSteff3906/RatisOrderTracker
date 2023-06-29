if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts') //Standard connections to the libraries (a kind of @import if you want)

const indexRouter = require('./routes/index') // References router to use
const orderRouter = require('./routes/order-scan')

app.set('view engine', 'ejs') //Standard ejs initialisation
app.set('views', __dirname + '/views') //Views are used to generate dynamic HTML
app.set('layout', 'layouts/layout') //every html file (dynamically rendered) is placed inside this layout file that contains the header, footer, etc. This way, you don't have to rewrite the header or footer a million times
app.use(expressLayouts) //We use the variable from the library
app.use(express.static('public')) //Public styles are client js, html, style sheets, etc. and are usually stored in a public folder

const mongoose = require('mongoose') //Imports mongoose from library connected through the terminal
mongoose.connect(process.env.DATABASE_URL, { //connects mongoose to the local database; process.env.DATABASE_URL tells it to look for a local database, which might vary, not a fixed one
  useNewUrlParser: true }) // Crucial setting, by default mongoose uses an older way of accessing databases that's broken so like this we fix that; Chat-GPT says with this version it isn't necessary, but using it still doesn't break anything so I will use it
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter) //Uses router const indexRouter for root directory
app.use('/order-scan', orderRouter)

app.listen(process.env.PORT || 3000)