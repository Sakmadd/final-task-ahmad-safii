 
const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('dotenv').config()

module.exports = (app) => {

  app.use('/public', express.static(path.join(__dirname,'..','..', 'public')))
  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, '..', 'views'))
  hbs.registerPartials(path.join(__dirname, '..', 'views', 'partials'))

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  hbs.registerHelper('not', function(value) {
    return !value
  })

  hbs.registerHelper('includes', function(array, value) {
    return array.includes(value)
  })
  hbs.registerHelper('techIncludes', function(array, value) {
    return array && array.includes(value)
  })
}
