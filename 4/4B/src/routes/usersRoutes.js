const express = require('express')
const { registerView, loginView, registerPost, loginPost } = require('../controllers/usersController')
const router = express.Router()

router.get('/register', registerView)
router.get('/login', loginView)
router.post('/register', registerPost)
router.post('/login', loginPost)

module.exports = router
