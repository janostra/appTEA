import { CancelacionService } from '../services/cancelacionService.js'
import rutinaService from '../services/rutinaService.js'

export class CancelacionController {
  constructor() {
    this.cancelacionService = new CancelacionService()
    this.rutinaService = rutinaService  
  }

  async crearCancelacion(req, res) {
    try {
      const { rutinaID, fechaHora } = req.body
      const userID = req.user?.id || req.body.userId

      if (!rutinaID) {
        return res.status(400).json({ error: 'El ID de la rutina es obligatorio' })
      }
      if (!userID) {
        return res.status(401).json({ error: 'Usuario no autenticado' })
      }

      // Primero validar y cancelar la rutina (cambia estado)
      await rutinaService.cancelarRutina(rutinaID, userID)

      // Luego crear la cancelación
      const cancelacion = await this.cancelacionService.crear(fechaHora, rutinaID)

      return res.status(201).json(cancelacion)
    } catch (error) {
      console.error('Error en crearCancelacion:', error)
      return res.status(500).json({ error: error.message || 'Error interno del servidor' })
    }
  }

  // Función auxiliar dentro de la misma clase (por ej. CancelacionController o donde estés)
  async cancelarRutina(rutinaID, userID) {
    // Validar que la rutina exista y le pertenezca al usuario
    const rutina = await prisma.rutina.findUnique({
      where: { ID: Number(rutinaID) } // ojo que el ID debe ser número
    })

    if (!rutina || rutina.usuarioID !== userID) {
      throw new Error('Rutina no encontrada o no autorizada')
    }

    return prisma.rutina.update({
      where: { ID: Number(rutinaID) },
      data: {
        estadoID: 4  // suponiendo que 4 es el estado "cancelada"
      }
    })
  }


  async getAllCancelaciones(req, res) {
    try {
      const id = req.user?.id || req.query.userId;
      const userId = typeof id === 'string' ? parseInt(id, 10) : id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' })
      }

      const cancelaciones = await this.cancelacionService.getAll(userId)
      return res.status(200).json(cancelaciones)
    } catch (error) {
      console.error('Error en getAllCancelaciones:', error)
      return res.status(500).json({ error: error.message || 'Error interno del servidor' })
    }
  }
}
