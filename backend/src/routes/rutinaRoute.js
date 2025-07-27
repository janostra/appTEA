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

router.patch('/:id/ocultar', RutinaController.ocultarRutina)


router.patch('/pasos/:id/ocultar', RutinaController.ocultarPaso)


export default router
