import prisma from '../prisma/client.js'

class PasoService {
  async crearPasos(pasos = [], rutinaId) {
    if (!Array.isArray(pasos) || pasos.length === 0) return []

    try {
      const pasosCreados = await Promise.all(
        pasos.map(({ orden, descripcion, estadoID, imagen, audio }) =>
          prisma.paso.create({
            data: {
              orden,
              descripcion,
              estadoID,
              imagen,
              audio,
              rutinaId,
            },
          })
        )
      )

      return pasosCreados
    } catch (error) {
      console.error('Error al crear pasos:', error)
      throw new Error('No se pudieron crear los pasos')
    }
  }
}

export default new PasoService()
