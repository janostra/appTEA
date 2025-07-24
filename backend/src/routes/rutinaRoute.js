// routes/rutinas.js
const express = require('express')
const RutinaController = require('../controllers/rutinaController.js')

const router = express.Router()

router.post('/', RutinaController.crearRutina)

module.exports = router
