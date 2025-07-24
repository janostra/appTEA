const rutinaService = require('../services/rutinaService')

const crearRutina = async (req, res) => {
  try {
    const { nombre, descripcion, imagen, pasos, diaHoraActivacion } = req.body
    const userId = req.user?.id // Suponiendo que el middleware de auth ya adjuntó el usuario

    // Validaciones superficiales
    if (!nombre || !descripcion || !imagen) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    if (!Array.isArray(pasos) || pasos.length === 0) {
      return res.status(400).json({ error: 'Debe haber al menos un paso' })
    }

    if (!Array.isArray(diaHoraActivacion) || diaHoraActivacion.length === 0) {
      return res.status(400).json({ error: 'Debe haber al menos una programación de día y hora' })
    }

    if (!userId) {
      return res.status(401).json({ error: 'No autorizado. Usuario no identificado.' })
    }

    // Delegamos la lógica a la capa de servicio
    const rutinaCreada = await rutinaService.crearRutinaConTodo({
      nombre,
      descripcion,
      imagen,
      pasos,
      diaHoraActivacion,
      userId
    })

    return res.status(201).json(rutinaCreada)
  } catch (error) {
    console.error('Error al crear rutina:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = {
  crearRutina
}
