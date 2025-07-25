import rutinaService from '../services/rutinaService'
import PasoService from '../services/pasoService.js'
import ActivacionService from '../services/activacionService.js'
import MotivacionService from '../services/motivacionService.js'

class RutinaController {
  async crearRutina(req, res) {
    try {
      const { pasos, activaciones, motivacion, ...rutinaData } = req.body
      const userId = req.user?.id
      const { nombre, imagen } = rutinaData

      if (!nombre || !imagen || !motivacion) {
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
        activacionesCreadas = await ActivacionService.crearActivaciones(activaciones, rutinaID)
      }

      const pasosCreados = await PasoService.crearPasos(pasos, rutinaID)

      const motivacionCreada = await MotivacionService.crearMotivacion(motivacion, rutinaID)

      return res.status(201).json({
        rutina: rutinaCreada,
        motivacion: motivacionCreada,
        activaciones: activacionesCreadas,
        pasos: pasosCreados
      })
    } catch (error) {
      console.error('Error al crear rutina:', error)
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

   async editarRutina(req, res) {
    try {
      const { pasos, activaciones, motivacion, ...rutinaData } = req.body
      const userId = req.user?.id
      const rutinaID = req.params.id  // Asumo que el ID viene por params

      if (!rutinaID) {
        return res.status(400).json({ error: 'Falta el ID de la rutina' })
      }

      if (!nombre || !imagen || !motivacion) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' })
      }

      if (!Array.isArray(pasos) || pasos.length === 0) {
        return res.status(400).json({ error: 'Debe haber al menos un paso' })
      }

      if (!userId) {
        return res.status(401).json({ error: 'No autorizado. Usuario no identificado.' })
      }

      // Actualizamos la rutina principal
      const rutinaActualizada = await rutinaService.editarRutina(rutinaID, {
        ...rutinaData
      })

      // Actualizamos pasos
      const pasosActualizados = await PasoService.editarPasos(pasos, rutinaID)

      // Actualizamos activaciones (si vienen)
      let activacionesActualizadas = []
      if (activaciones && Array.isArray(activaciones)) {
        activacionesActualizadas = await ActivacionService.editarActivaciones(activaciones, rutinaID)
      }

      // Actualizamos motivación
      const motivacionActualizada = await MotivacionService.editar(motivacion, rutinaID)

      return res.status(200).json({
        rutina: rutinaActualizada,
        motivacion: motivacionActualizada,
        activaciones: activacionesActualizadas,
        pasos: pasosActualizados,
      })
    } catch (error) {
      console.error('Error al editar rutina:', error)
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

}

module.exports = new RutinaController()
