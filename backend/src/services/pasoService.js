import prisma from '../../prisma/client.js'

class PasoService {
  async crearPasos(pasos = [], rutinaId) {
    if (!Array.isArray(pasos) || pasos.length === 0) return []

    try {
      const pasosCreados = await Promise.all(
        pasos.map(({ orden, descripcion, imagen, audio }) =>
          prisma.paso.create({
            data: {
              orden,
              descripcion,
              imagen,
              audio,
              estado: {
                connect: { ID: 1 }
              },
              rutina: {
                connect: { ID: rutinaId },
              },
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

  async editarPasos(pasos = [], rutinaId) {
    if (!Array.isArray(pasos)) throw new Error('Pasos debe ser un arreglo')

    try {
      // Borro todos los pasos que pertenecen a la rutina
      await prisma.paso.deleteMany({
        where: {
          rutinaID: rutinaId,
        },
      })

      // Creo los pasos nuevos
      const pasosActualizados = await Promise.all(
        pasos.map(({ orden, descripcion, estadoID, imagen, audio }) =>
          prisma.paso.create({
            data: {
              orden,
              descripcion,
              estado: {
                connect: { ID: estadoID }
              },
              imagen,
              audio,
              rutina: {
                connect: { ID: rutinaId },
              },
            },
          })
        )
      )

      return pasosActualizados
    } catch (error) {
      console.error('Error al editar pasos:', error)
      throw new Error('No se pudieron editar los pasos')
    }
  }

  async ocultarPaso(pasoId) {
    try {
      const pasoActualizado = await prisma.paso.update({
        where: { ID: pasoId },
        data: {
          estadoID: 3  // O el ID real de "Oculta"
        }
      })

      return pasoActualizado
    } catch (error) {
      console.error('Error al ocultar el paso:', error)
      throw new Error('No se pudo ocultar el paso')
    }
  }

    async completarPaso(pasoId) {
    try {
      const pasoActualizado = await prisma.paso.update({
        where: { ID: pasoId },
        data: {
          estadoID: 2
        }
      })

      return pasoActualizado
    } catch (error) {
      console.error('Error al ocultar el paso:', error)
      throw new Error('No se pudo ocultar el paso')
    }
  }

}

export default new PasoService()
