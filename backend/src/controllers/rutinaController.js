const rutinaService = require('../services/rutinaService')
import PasoService from '../services/pasoService.js'
import ActivacionService from '../services/activacionService.js'

class RutinaController {
  async crearRutina(req, res) {
    try {
      const { pasos, activaciones, ...rutinaData } = req.body
      const userId = req.user?.id
      const { nombre, imagen } = rutinaData

      if (!nombre || !imagen) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' })
      }

      if (!Array.isArray(pasos) || pasos.length === 0) {
        return res.status(400).json({ error: 'Debe haber al menos un paso' })
      }

      if (!userId) {
        return res.status(401).json({ error: 'No autorizado. Usuario no identificado.' })
      }

      const rutinaCreada = await rutinaService.crearRutina({
        nombre,
        imagen,
        userId
      })

      const rutinaID = rutinaCreada.id

      let activacionesCreadas = []
      if (activaciones && Array.isArray(activaciones)) {
        activacionesCreadas = await ActivacionService.crearActivaciones(activaciones, rutinaId)
      }

      const pasosCreados = await PasoService.crearPasos(pasos, rutinaId)

      return res.status(201).json({
        rutina: rutinaCreada,
        activaciones: activacionesCreadas,
        pasos: pasosCreados
      })
    } catch (error) {
      console.error('Error al crear rutina:', error)
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

}

module.exports = new RutinaController()
