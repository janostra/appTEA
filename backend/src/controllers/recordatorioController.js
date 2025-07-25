import  RecordatorioService  from '../services/recordatorioService.js'

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
}

export default new RecordatorioController()
