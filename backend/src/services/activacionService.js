import prisma  from '../../prisma/client.js'

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
              rutina: {
                connect: { ID: rutinaId },
              },
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

  async editarActivaciones(activaciones = [], rutinaId) {
    if (!Array.isArray(activaciones)) throw new Error('Activaciones debe ser un arreglo')

    try {
      // Borro todas las activaciones asociadas a la rutina
      await prisma.diaHoraActivacion.deleteMany({
        where: {
          rutinaID: rutinaId,
        },
      })

      // Creo las nuevas activaciones
      const activacionesActualizadas = await Promise.all(
        activaciones.map(({ diaSemana, horaActivacion }) =>
          prisma.diaHoraActivacion.create({
            data: {
              diaSemana,
              horaActivacion: new Date(horaActivacion),
              rutina: {
                connect: { ID: rutinaId },
              },
            },
          })
        )
      )

      return activacionesActualizadas
    } catch (error) {
      console.error('Error al editar activaciones:', error)
      throw new Error('No se pudieron editar las activaciones')
    }
  }
  
}

export default new ActivacionService()
