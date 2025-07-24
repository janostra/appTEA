import prisma from '../prisma/client.js'

class ActivacionService {
  async crearActivaciones(activaciones = [], rutinaId) {
    if (!Array.isArray(activaciones) || activaciones.length === 0) return []

    try {
      const activacionesCreadas = await Promise.all(
        activaciones.map(({ diaSemana, horaActivacion }) =>
          prisma.diaHoraActivacion.create({
            data: {
              diaSemana,
              horaActivacion: new Date(horaActivacion),
              rutinaId,
            },
          })
        )
      )

      return activacionesCreadas
    } catch (error) {
      console.error('Error al crear activaciones:', error)
      throw new Error('No se pudieron crear las activaciones')
    }
  }
}

export default new ActivacionService()
