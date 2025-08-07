import prisma from '../../prisma/client.js'

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

  async editarRutina(rutinaId, { nombre, imagen }) {
    if (!rutinaId) {
      throw new Error('Debe proporcionar el ID de la rutina')
    }

    try {
      // Obtener la rutina actual
      const rutinaExistente = await prisma.rutina.findUnique({
        where: { ID: rutinaId },
      })

      if (!rutinaExistente) {
        throw new Error('La rutina no existe')
      }

      // Usar los valores nuevos si vienen, si no, mantener los actuales
      const rutinaActualizada = await prisma.rutina.update({
        where: { ID: rutinaId },
        data: {
          nombre: nombre ?? rutinaExistente.nombre,
          imagen: imagen ?? rutinaExistente.imagen
        },
      })

      return rutinaActualizada
    } catch (error) {
      console.error('Error al editar la rutina:', error)
      throw new Error('No se pudo editar la rutina')
    }
  }

  async getRutinasPorUsuario(userId) {
    if (!userId) {
      throw new Error('Debe proporcionar el ID del usuario')
    }

    try {
      const rutinas = await prisma.rutina.findMany({
        where: {
          usuarioID: userId
        },
        include: {
          pasos: true,
          estado: true
        },
        orderBy: {
          fechaCreacion: 'desc'
        }
      })

      return rutinas
    } catch (error) {
      console.error('Error al obtener rutinas del usuario:', error)
      throw new Error('No se pudieron obtener las rutinas del usuario')
    }
  }


  async ocultarRutina(rutinaID, userID) {
    // Validar que la rutina exista y le pertenezca al usuario
    const rutina = await prisma.rutina.findUnique({
      where: { ID: rutinaID }
    })

    if (!rutina || rutina.usuarioID !== userID) {
      throw new Error('Rutina no encontrada o no autorizada')
    }

    // Asumiendo que el estado "Oculta" tiene ID = 3
    return prisma.rutina.update({
      where: { ID: rutinaID },
      data: {
        estadoID: 3  // O el ID real de "Oculta"
      }
    })
  }

    async cancelarRutina(rutinaID, userID) {
    // Validar que la rutina exista y le pertenezca al usuario
    const rutina = await prisma.rutina.findUnique({
      where: { id: rutinaID }
    })

    if (!rutina || rutina.usuarioID !== userID) {
      throw new Error('Rutina no encontrada o no autorizada')
    }

    return prisma.rutina.update({
      where: { id: rutinaID },
      data: {
        estadoID: 4  
      }
    })
  }

  async cambiarEstadoRutina(rutinaID, estadoID) {
    if (!rutinaID || !estadoID) {
      throw new Error('Faltan datos obligatorios: rutinaID y estadoID');
     }
    try {
      return await prisma.rutina.update({
        where: { ID: rutinaID },
        data: { estadoID }
      });
    } catch (error) {
           console.error('Error al cambiar estado de rutina:', error);
      throw new Error('No se pudo cambiar el estado de la rutina');
      }
    }
}



export default new RutinaService()
