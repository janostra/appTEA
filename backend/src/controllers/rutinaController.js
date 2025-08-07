import rutinaService from '../services/rutinaService.js'
import PasoService from '../services/pasoService.js'
import ActivacionService from '../services/activacionService.js'
import MotivacionService from '../services/motivacionService.js'
import { UsuarioService } from '../services/usuarioService.js'
const usuarioService = new UsuarioService();

class RutinaController {
  async crearRutina(req, res) {
    try {
      const { pasos, activaciones, motivacion, ...rutinaData } = req.body
      const { nombre, imagen } = rutinaData

      console.log(req.body)

      if (!nombre || !imagen) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' })
      }

      if (!Array.isArray(pasos) || pasos.length === 0) {
        return res.status(400).json({ error: 'Debe haber al menos un paso' })
      }

      const usuario = await usuarioService.getUsuario();
      if (!usuario || !usuario.ID) {
        return res.status(401).json({ error: 'No autorizado. Usuario no identificado.' });
      }

      const rutinaCreada = await rutinaService.crearRutina({
        nombre,
        imagen,
        userId: usuario.ID
      })

      const rutinaID = rutinaCreada.ID

      let activacionesCreadas = []
      if (activaciones && Array.isArray(activaciones)) {
        activacionesCreadas = await ActivacionService.crearActivaciones(activaciones, rutinaID)
      }

      const pasosCreados = await PasoService.crearPasos(pasos, rutinaID)

      const motivacionCreada = await MotivacionService.crear(motivacion, rutinaID)

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
      const userId = req.user?.id || req.body.userId
      const rutinaID = parseInt(req.params.id, 10)
      const { nombre, imagen } = rutinaData

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

  async obtenerRutinasPorUsuario(req, res) {
    try {
      const usuario = await usuarioService.getUsuario();

      if (!usuario?.ID) {
        return res.status(400).json({ error: 'No se pudo obtener el ID del usuario' });
      }

      const rutinas = await rutinaService.getRutinasPorUsuario(usuario.ID);
      res.json(rutinas);
    } catch (error) {
      console.error('Error en obtenerRutinasPorUsuario:', error);
      res.status(500).json({ error: 'No se pudieron obtener las rutinas' });
    }
  }

  async ocultarRutina(req, res) {
    try {
      const rutinaID = parseInt(req.params.id)
      const userID = req.user?.id || req.body.userId

      if (!userID) {
        return res.status(401).json({ error: 'No autorizado' })
      }

      if (!rutinaID) {
        return res.status(400).json({ error: 'ID de rutina inválido' })
      }

      const rutinaOcultada = await rutinaService.ocultarRutina(rutinaID, userID)

      res.status(200).json({ message: 'Rutina ocultada correctamente', rutina: rutinaOcultada })
    } catch (error) {
      console.error('Error al ocultar rutina:', error)
      res.status(500).json({ error: 'No se pudo ocultar la rutina' })
    }
  }

  async ocultarPaso(req, res) {
    const { id } = req.params

    try {
      const paso = await PasoService.ocultarPaso(parseInt(id))
      res.status(200).json(paso)
    } catch (error) {
      res.status(500).json({ mensaje: error.message })
    }
  }

  async obtenerRutinaById(req, res) {
  try {
    const rutinaID = parseInt(req.params.id, 10);
    if (!rutinaID) {
      return res.status(400).json({ error: 'ID de rutina inválido' });
    }

    // Supongamos que rutinaService tiene un método para obtener rutina por id
    const rutina = await rutinaService.getRutinaPorId(rutinaID);
    if (!rutina) {
      return res.status(404).json({ error: 'Rutina no encontrada' });
    }

    return res.status(200).json({
      rutina
    });
  } catch (error) {
    console.error('Error al obtener rutina por ID:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}


}

export default new RutinaController()