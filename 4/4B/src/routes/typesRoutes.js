const express = require('express')
const router = express.Router()
const { addType, editType, deleteType } = require('../controllers/typesController')
const authAccess = require('../middlewares/auth')

router.post('/', authAccess, addType)
router.put('/:id', authAccess, editType)
router.delete('/:id', authAccess, deleteType)

module.exports = router
