import prisma  from '../../prisma/client.js'

export class UsuarioService {
    async crearUsuario({ pin }) {
        try {
            // 1. Crear usuario con rol adulto por defecto (rolID = 2)
            const nuevoUsuario = await prisma.usuario.create({
                data: {
                    rolID: 2,
                },
            })

            const userID = nuevoUsuario.ID

            // 2. Crear el adulto
            await prisma.adulto.create({
                data: {
                    adultoID: userID,
                    pin: pin ?? null,
                },
            })

            // 3. Crear también el infante asociado (aunque no se use hasta el cambio de rol)
            await prisma.infante.create({
                data: {
                    infanteID: userID,
                    nivel: 1, // Valor inicial por defecto
                },
            })

            // 4. Devolver usuario con ambas relaciones
            const usuarioCompleto = await prisma.usuario.findUnique({
                where: { ID: userID },
                include: {
                    adulto: true,
                    infante: true,
                },
            })

            return usuarioCompleto
        } catch (error) {
            console.error('Error al crear el usuario:', error)
            throw new Error('No se pudo crear el usuario')
        }
    }

    async alternarRol(usuarioID, pin = null) {
        try {
            const usuario = await prisma.usuario.findUnique({
                where: { ID: usuarioID },
                include: {
                    adulto: true,
                },
            })

            if (!usuario) throw new Error('Usuario no encontrado')

            const rolActual = usuario.rolID // 1: niño, 2: adulto

            let nuevoRolID

            if (rolActual === 2) {
                // Adulto → Niño (no requiere PIN)
                nuevoRolID = 1
            } else if (rolActual === 1) {
                // Niño → Adulto (requiere validación de PIN)
                if (!pin) throw new Error('Se requiere el PIN para cambiar a modo adulto')
                if (!usuario.adulto || usuario.adulto.pin !== pin) {
                    throw new Error('PIN incorrecto')
                }
                nuevoRolID = 2
            } else {
                throw new Error('Rol desconocido')
            }

            const usuarioActualizado = await prisma.usuario.update({
                where: { ID: usuarioID },
                data: {
                    rolID: nuevoRolID,
                },
            })

            return usuarioActualizado
        } catch (error) {
            console.error('Error al alternar el rol:', error)
            throw new Error(error.message || 'No se pudo cambiar el rol del usuario')
        }
    }

    async cambiarPin(usuarioID, nuevoPin) {
        if (!nuevoPin || typeof nuevoPin !== 'string') {
            throw new Error('PIN inválido')
        }

        try {
            const usuarioActualizado = await prisma.usuario.update({
                where: { ID: usuarioID },
                data: { pin: nuevoPin },
            })

            return usuarioActualizado
        } catch (error) {
            console.error('Error al cambiar el PIN:', error)
            throw new Error('No se pudo cambiar el PIN')
        }
    }

}
