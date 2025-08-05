import { Router } from 'express'
import RecordatorioController from '../controllers/recordatorioController.js'

const router = Router()

router.post('/', (req, res) =>
  RecordatorioController.crearRecordatorio(req, res)
)

router.put('/:id', (req, res) =>
  RecordatorioController.editarRecordatorio(req, res)
)

export default router
