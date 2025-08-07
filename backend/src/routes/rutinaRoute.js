import { Router } from 'express'
import RutinaController from '../controllers/rutinaController.js'
import { protegerPorRol } from '../middlewares/auth.js'

const router = Router()

router.post('/', protegerPorRol(1), (req, res) =>
  RutinaController.crearRutina(req, res)
)

router.put('/:id', protegerPorRol(1), (req, res) =>
  RutinaController.editarRutina(req, res)
)

router.get('/', (req, res) =>
  RutinaController.obtenerRutinasPorUsuario(req, res)
)

router.patch('/:id/ocultar', protegerPorRol(1), RutinaController.ocultarRutina)


router.patch('/pasos/:id/ocultar', protegerPorRol(1), RutinaController.ocultarPaso)


router.patch('/:id/estado', protegerPorRol(1), RutinaController.cambiarEstadoRutina.bind(RutinaController));

router.get('/:id', RutinaController.obtenerRutinaById)


export default router
