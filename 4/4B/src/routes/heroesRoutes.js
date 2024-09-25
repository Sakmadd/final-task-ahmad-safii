const express = require('express')
const router = express.Router()
const { addHero, editHero, deleteHero, addHeroView, editHeroView, detailHeroView } = require('../controllers/heroesController')

router.get('/add', addHeroView)
router.get('/edit/:id', editHeroView)
router.get('/:id', detailHeroView)
router.post('/add', addHero)
router.post('/edit/:id', editHero)
router.post('/delete/:id', deleteHero)

module.exports = router
