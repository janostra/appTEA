import RecordatorioService from '../services/recordatorioService.js'
import { UsuarioService } from '../services/usuarioService.js'
const usuarioService = new UsuarioService();


class RecordatorioController {

  async crearRecordatorio(req, res) {
    try {
      const {
        descripcion,
        frecuenciaID,
        hora,
        diaSemana,
        sonido,
        color,
        rutinaID,
      } = req.body

      if (
        !descripcion ||
        !frecuenciaID ||
        !hora ||
        !rutinaID
      ) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' })
      }

      const nuevoRecordatorio = await RecordatorioService.crearRecordatorio({
        descripcion,
        frecuenciaID,
        hora,
        diaSemana,
        sonido,
        color,
        rutinaID,
      })

      return res.status(201).json(nuevoRecordatorio)
    } catch (error) {
      console.error('Error en crearRecordatorio:', error)
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  async editarRecordatorio(req, res) {
    try {
      const recordatorioID = parseInt(req.params.id)
      const {
        descripcion,
        frecuenciaID,
        hora,
        diaSemana,
        sonido,
        color,
      } = req.body

      if (!recordatorioID || isNaN(recordatorioID)) {
        return res.status(400).json({ error: 'ID de recordatorio inválido' })
      }

      const datosActualizados = {
        descripcion,
        frecuenciaID,
        hora,
        diaSemana,
        sonido,
        color,
      }

      const recordatorioEditado = await RecordatorioService.editarRecordatorio(
        recordatorioID,
        datosActualizados
      )

      return res.status(200).json(recordatorioEditado)
    } catch (error) {
      console.error('Error al editar recordatorio:', error)
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  async getRecordatorios(req, res) {
    try {
      const recordatorios = await RecordatorioService.obtenerRecordatorios()

      console.log("backend", recordatorios)
      res.json(recordatorios);
    } catch (error) {
      console.error('Error en obtenerRutinasPorUsuario:', error);
      res.status(500).json({ error: 'No se pudieron obtener las rutinas' });
    }
  }

}

export default new RecordatorioController()
