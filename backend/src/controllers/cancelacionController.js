import { CancelacionService } from '../services/cancelacionService.js'

export class CancelacionController {
  constructor() {
    this.cancelacionService = new CancelacionService()
  }

  async crearCancelacion(req, res) {
    try {
      const { rutinaID, fechaHora } = req.body

      if (!rutinaID) {
        return res.status(400).json({ error: 'El ID de la rutina es obligatorio' })
      }

      const cancelacion = await this.cancelacionService.crear(fechaHora, rutinaID)
      return res.status(201).json(cancelacion)
    } catch (error) {
      console.error('Error en crearCancelacion:', error)
      return res.status(500).json({ error: error.message || 'Error interno del servidor' })
    }
  }

  async getAllCancelaciones(req, res) {
    try {
      const userID = req.user?.id // Asumiendo que el middleware de auth ya inyectó el usuario

      if (!userID) {
        return res.status(401).json({ error: 'Usuario no autenticado' })
      }

      const cancelaciones = await this.cancelacionService.getAll(userID)
      return res.status(200).json(cancelaciones)
    } catch (error) {
      console.error('Error en getAllCancelaciones:', error)
      return res.status(500).json({ error: error.message || 'Error interno del servidor' })
    }
  }
}
