import { Router } from 'express'
import { CancelacionController } from '../controllers/cancelacionController.js'

const router = Router()
const cancelacionController = new CancelacionController()

router.post('/cancelaciones', (req, res) =>
  cancelacionController.crearCancelacion(req, res)
)

router.get('/cancelaciones', (req, res) =>
  cancelacionController.getAllCancelaciones(req, res)
)

export default router
