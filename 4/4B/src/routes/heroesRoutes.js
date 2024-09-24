const express = require('express')
const router = express.Router()
const { addHero, getHero, editHero, deleteHero } = require('../controllers/heroesController')
const authAccess = require('../middlewares/auth')

router.post('', authAccess, addHero)
router.get('/:id', getHero)
router.put('/:id', editHero)
router.delete('/:id', deleteHero)

module.exports = router
