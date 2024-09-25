 
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const session = require('express-session')
const flash = require('express-flash')
require('dotenv').config()

module.exports = (app) => {

  app.use('/public', express.static(path.join(__dirname,'..','..', 'public')))
  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, '..', 'views'))
  hbs.registerPartials(path.join(__dirname, '..', 'views', 'partials'))

  app.use(flash())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(
    session({
      name: 'user-session',
      secret: 'ewVsqWOyeb',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
      }
    })
  )

  hbs.registerHelper('not', function(value) {
    return !value
  })
  hbs.registerHelper('equals', function(val1,val2) {
    return val1 === val2
  })

}
