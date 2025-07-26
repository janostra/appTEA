import prisma  from '../../prisma/client.js'

export class CancelacionService {
  async crear(fechaHora, rutinaID) {
    const estadoCanceladaID = 3 // Cambialo si usás otro ID para "cancelada"

    try {
      const cancelacion = await prisma.cancelacion.create({
        data: {
          fechaHora: fechaHora ?? new Date(),
          rutina: {
            connect: { ID: rutinaID },
          },
        },
      })

      // Cambiar estado de la rutina
      await prisma.rutina.update({
        where: { ID: rutinaID },
        data: {
          estadoID: estadoCanceladaID,
        },
      })

      return cancelacion
    } catch (error) {
      console.error('Error al crear cancelación:', error)
      throw new Error('No se pudo registrar la cancelación')
    }
  }

  async getAll(userID) {
    try {
      const cancelaciones = await prisma.cancelacion.findMany({
        where: {
          userID,
        },
        orderBy: {
          fechaHora: 'desc',
        },
      })

      return cancelaciones
    } catch (error) {
      console.error('Error al obtener cancelaciones:', error)
      throw new Error('No se pudieron obtener las cancelaciones')
    }
  }
}
