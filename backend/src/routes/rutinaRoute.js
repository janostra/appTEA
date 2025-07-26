import { Router } from 'express'
import RutinaController from '../controllers/rutinaController.js'

const router = Router()

router.post('/rutinas', (req, res) =>
  RutinaController.crearRutina(req, res)
)

router.put('/rutinas/:id', (req, res) =>
  RutinaController.editarRutina(req, res)
)

router.get('/rutinas', (req, res) =>
  RutinaController.obtenerRutinasPorUsuario(req, res)
)

export default router
