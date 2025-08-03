import prisma from '../../prisma/client.js';

export class UsuarioService {
  async crearUsuario({ pin, rol }) {
    try {
      const rolID = rol === 'adulto' ? 2 : 1;

      // Crear usuario con rol correspondiente
      const nuevoUsuario = await prisma.usuario.create({
        data: {
          rolID,
        },
      });

      const userID = nuevoUsuario.ID;

      if (rolID === 2) {
        // Crear adulto con PIN como número (parseInt)
        await prisma.adulto.create({
          data: {
            adultoID: userID,
            pin: pin ? parseInt(pin, 10) : null,
          },
        });
      } else {
        // Crear infante con nivelID default
        await prisma.infante.create({
          data: {
            infanteID: userID,
            nivelID: 1,
          },
        });
      }

      // Traer usuario completo con relaciones
      const usuarioCompleto = await prisma.usuario.findUnique({
        where: { ID: userID },
        include: {
          adulto: true,
          infante: true,
          rol: true,
        },
      });

      return usuarioCompleto;
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw new Error('No se pudo crear el usuario');
    }
  }

  async alternarRol(usuarioID, pin = null) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { ID: usuarioID },
        include: { adulto: true },
      });

      if (!usuario) throw new Error('Usuario no encontrado');

      const rolActual = usuario.rolID; // 1: niño, 2: adulto
      let nuevoRolID;

      if (rolActual === 2) {
        // Adulto → Niño (no requiere PIN)
        nuevoRolID = 1;
      } else if (rolActual === 1) {
        // Niño → Adulto (requiere PIN)
        if (!pin) throw new Error('Se requiere el PIN para cambiar a modo adulto');
        if (!usuario.adulto || usuario.adulto.pin !== parseInt(pin, 10)) {
          throw new Error('PIN incorrecto');
        }
        nuevoRolID = 2;
      } else {
        throw new Error('Rol desconocido');
      }

      const usuarioActualizado = await prisma.usuario.update({
        where: { ID: usuarioID },
        data: { rolID: nuevoRolID },
      });

      return usuarioActualizado;
    } catch (error) {
      console.error('Error al alternar el rol:', error);
      throw new Error(error.message || 'No se pudo cambiar el rol del usuario');
    }
  }

  async cambiarPin(usuarioID, nuevoPin) {
    if (!nuevoPin || typeof nuevoPin !== 'string') {
      throw new Error('PIN inválido');
    }

    try {
      // Cambiar PIN en tabla Adulto (no en Usuario)
      const adultoActualizado = await prisma.adulto.update({
        where: { adultoID: usuarioID },
        data: { pin: parseInt(nuevoPin, 10) },
      });

      return adultoActualizado;
    } catch (error) {
      console.error('Error al cambiar el PIN:', error);
      throw new Error('No se pudo cambiar el PIN');
    }
  }

  async autenticarAdulto(pin) {
    try {
      const adulto = await prisma.adulto.findFirst({
        where: { pin: parseInt(pin, 10) },
        include: { usuario: true }
      });

      if (!adulto) {
        throw new Error('PIN incorrecto');
      }

      return {
        adultoID: adulto.adultoID,
        nombre: adulto.nombre || 'Adulto',
        rol: 'adulto'
      };
    } catch (error) {
      console.error('Error al autenticar adulto:', error);
      throw error;
    }
  }
}