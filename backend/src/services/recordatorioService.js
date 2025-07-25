import  prisma  from '../config/prismaClient.js'

export class RecordatorioService {
  async crearRecordatorio({
    descripcion,
    frecuenciaID,
    hora,
    diaSemana,
    sonido,
    color,
    rutinaID,
  }) {
    try {
      const nuevoRecordatorio = await prisma.recordatorio.create({
        data: {
          descripcion,
          frecuenciaID,
          hora: new Date(hora), // asumimos formato ISO
          diaSemana,
          sonido,
          color,
          rutina: {
            connect: { ID: rutinaID },
          },
        },
      })

      return nuevoRecordatorio
    } catch (error) {
      console.error('Error al crear el recordatorio:', error)
      throw new Error('No se pudo crear el recordatorio')
    }
  }

  async actualizar(id, {
    descripcion,
    frecuenciaID,
    hora,
    diaSemana,
    sonido,
    color,
  }) {
    try {
      const actualizado = await prisma.recordatorio.update({
        where: { ID: id },
        data: {
          descripcion,
          frecuenciaID,
          hora: hora ? new Date(hora) : undefined,
          diaSemana,
          sonido,
          color,
        },
      })

      return actualizado
    } catch (error) {
      console.error('Error al actualizar el recordatorio:', error)
      throw new Error('No se pudo actualizar el recordatorio')
    }
  }

  async eliminar(id) {
    try {
      await prisma.recordatorio.delete({ where: { ID: id } })
      return { mensaje: 'Recordatorio eliminado correctamente' }
    } catch (error) {
      console.error('Error al eliminar recordatorio:', error)
      throw new Error('No se pudo eliminar el recordatorio')
    }
  }

  async listarPorRutina(rutinaID) {
    try {
      return await prisma.recordatorio.findMany({
        where: { rutinaID },
      })
    } catch (error) {
      console.error('Error al listar recordatorios:', error)
      throw new Error('No se pudieron obtener los recordatorios')
    }
  }
}
