import { UsuarioService } from '../services/usuarioService.js'
const usuarioService = new UsuarioService()

export class UsuarioController {
    async crearUsuario(req, res) {
        try {
            const { pin } = req.body 

            if (!pin || typeof pin !== 'string' || pin.length !== 4) {
                return res.status(400).json({ error: 'El PIN es obligatorio y debe tener 4 dígitos' })
            }

            const nuevoUsuario = await usuarioService.crearUsuario(pin)
            return res.status(201).json(nuevoUsuario)
        } catch (error) {
            console.error('Error al crear usuario:', error)
            return res.status(500).json({ error: error.message || 'Error interno del servidor' })
        }
    }

    async alternarRol(req, res) {
        try {
            const usuarioID = req.user?.id || req.body.userId
            const { pin } = req.body // Solo necesario si se cambia a adulto

            if (!usuarioID) {
                return res.status(401).json({ error: 'Usuario no autenticado' })
            }

            const usuarioActualizado = await usuarioService.alternarRol(usuarioID, pin)
            return res.status(200).json({
                mensaje: 'Rol actualizado correctamente',
                usuario: usuarioActualizado
            })
        } catch (error) {
            console.error('Error al alternar el rol:', error)
            return res.status(400).json({ error: error.message || 'No se pudo cambiar el rol del usuario' })
        }
    }

    async cambiarPin(req, res) {
        const usuarioID = req.user?.id || req.body.userId
        const { nuevoPin } = req.body

        if (!usuarioID) {
            return res.status(401).json({ message: 'Usuario no autenticado' })
        }

        if (!nuevoPin) {
            return res.status(400).json({ message: 'Debes proporcionar un nuevo PIN' })
        }

        try {
            const usuario = await this.usuarioService.cambiarPin(usuarioID, nuevoPin)
            return res.status(200).json({ message: 'PIN actualizado correctamente', usuario })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}
