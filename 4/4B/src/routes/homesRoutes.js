const express = require('express')
const router = express.Router()
const { homeView } = require('../controllers/homesController')

router.get('/', homeView)
router.get('/home', homeView)

module.exports = router
