import prisma  from '../../prisma/client.js'

class MotivacionService {
  async crear(motivacionData, rutinaID) {
    try {
      if (!rutinaID) {
        throw new Error('Debe proporcionar el ID de la rutina.');
      }

      const nuevaMotivacion = await prisma.motivacion.create({
        data: {
          ...motivacionData,
          rutina: {
            connect: { ID: rutinaID },
          },
        },
      });

      return nuevaMotivacion;
    } catch (error) {
      console.error('Error al crear la motivación:', error);
      throw error;
    }
  }

   async editar(motivacionData, rutinaID) {
    try {
      if (!rutinaID) {
        throw new Error('Debe proporcionar el ID de la rutina.');
      }

      // Buscamos la motivación existente de la rutina
      const motivacionExistente = await prisma.motivacion.findFirst({
        where: { rutinaID },
      });

      if (!motivacionExistente) {
        throw new Error('No se encontró motivación para la rutina especificada.');
      }

      // Actualizamos la motivación existente
      const motivacionActualizada = await prisma.motivacion.update({
        where: { ID: motivacionExistente.ID },
        data: motivacionData,
      });

      return motivacionActualizada;
    } catch (error) {
      console.error('Error al editar la motivación:', error);
      throw error;
    }
  }

}

export default new MotivacionService()
