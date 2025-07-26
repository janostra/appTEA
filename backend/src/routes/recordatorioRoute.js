import { Router } from 'express'
import RecordatorioController from '../controllers/recordatorioController.js'

const router = Router()

router.post('/recordatorios', (req, res) =>
  RecordatorioController.crearRecordatorio(req, res)
)

router.put('/recordatorios/:id', (req, res) =>
  RecordatorioController.editarRecordatorio(req, res)
)

export default router
