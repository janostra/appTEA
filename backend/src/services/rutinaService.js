import prisma from '../prisma/client.js'

class RutinaService {
  async crearRutina({ nombre, imagen, userId }) {
    if (!nombre || !userId) {
      throw new Error('Faltan datos obligatorios: nombre y userId')
    }

    try {
      const rutinaCreada = await prisma.rutina.create({
        data: {
          nombre,
          imagen: imagen || null,
          usuarioID: userId,
          estadoID: 1, // Asumimos estado inicial ID = 1 (ej: "activa"). Cambiá esto si tenés otro valor por defecto.
          fechaCreacion: new Date(),
        },
      })

      return rutinaCreada
    } catch (error) {
      console.error('Error al crear rutina:', error)
      throw new Error('No se pudo crear la rutina')
    }
  }
}

export default new RutinaService()
