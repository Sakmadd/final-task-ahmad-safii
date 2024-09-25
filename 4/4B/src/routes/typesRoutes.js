const express = require('express')
const router = express.Router()
const { addType, editType, deleteType, editTypeView, addTypeView } = require('../controllers/typesController')

router.post('/add', addType)
router.get('/add', addTypeView)
router.get('/edit/:id', editTypeView)
router.post('/edit/:id', editType)
router.post('/delete/:id', deleteType)

module.exports = router
