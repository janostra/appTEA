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

  async alternarRol(pin = null) {
    try {
      // Obtenemos el único usuario (asume que hay uno solo en la tabla)
      const usuario = await prisma.usuario.findFirst({
        include: { adulto: true },
      });

      if (!usuario) throw new Error('Usuario no encontrado');

      const rolActual = usuario.rolID;
      let nuevoRolID;

      if (rolActual === 1) {
        // Adulto → Niño (sin PIN)
        nuevoRolID = 2;
      } else if (rolActual === 2) {
        // Niño → Adulto (requiere PIN)
        if (!pin) throw new Error('Se requiere el PIN para cambiar a modo adulto');

        const pinCorrecto = usuario.adulto?.pin === parseInt(pin, 10);
        if (!pinCorrecto) throw new Error('PIN incorrecto');

        nuevoRolID = 1;
      } else {
        throw new Error('Rol desconocido');
      }
      const usuarioActualizado = await prisma.usuario.update({
        where: { ID: usuario.ID },
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

  async cambiarNombre(usuarioID, nuevoNombre) {
    if (!nuevoNombre || typeof nuevoNombre !== 'string') {
      throw new Error('Nombre inválido');
    }

    try {
      // Actualizar nombre en tabla Usuario
      const usuarioActualizado = await prisma.usuario.update({
        where: { ID: usuarioID },
        data: { nombre: nuevoNombre }
      });

      return usuarioActualizado;
    } catch (error) {
      console.error('Error al cambiar el nombre:', error);
      throw new Error('No se pudo cambiar el nombre del usuario');
    }
  }

async getUsuarioRol() {
  try {
    const usuario = await prisma.usuario.findFirst({
      include: { rol: true },
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return {
      usuarioID: usuario.ID,
      rolID: usuario.rolID,
    };
  } catch (error) {
    console.error('Error al obtener el rol del usuario:', error);
    throw new Error('No se pudo obtener el rol del usuario');
  }
}

async getUsuario() {
  try {
    const usuario = await prisma.usuario.findFirst({
      include: {
        rol: true,
        infante: true,
        adulto: true,
        rutinas: true,
      },
      // El ID viene con el objeto por defecto, no hace falta incluirlo explícitamente
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Por si querés verlo explícito, podés desestructurar:
    // const { ID, rol, infante, adulto, rutinas } = usuario;

    return usuario;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new Error('No se pudo obtener el usuario');
  }
}


}