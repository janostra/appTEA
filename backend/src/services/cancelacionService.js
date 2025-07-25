import  prisma  from '../config/prismaClient.js'

export class CancelacionService {
  async crear(fechaHora, rutinaID) {
    try {
      const cancelacion = await prisma.cancelacion.create({
        data: {
          fechaHora: fechaHora ?? new Date(),
          rutina: {
            connect: { ID: rutinaID },
          },
        },
      })

      return cancelacion
    } catch (error) {
      console.error('Error al crear cancelación:', error)
      throw new Error('No se pudo registrar la cancelación')
    }
  }
}
