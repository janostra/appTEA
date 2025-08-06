import { Router } from 'express'
import RecordatorioController from '../controllers/recordatorioController.js'
import { protegerPorRol } from '../middlewares/auth.js'

const router = Router()

router.post('/', protegerPorRol(1), (req, res) =>
  RecordatorioController.crearRecordatorio(req, res)
)

router.put('/:id', protegerPorRol(1),  (req, res) =>
  RecordatorioController.editarRecordatorio(req, res)
)

export default router
