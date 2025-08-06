import prisma from '../../prisma/client.js'

// Roles:
// 1 = Niño
// 2 = Adulto

export function protegerPorRol(rolRequerido) {
  return async (req, res, next) => {
    try {
      const usuario = await prisma.usuario.findFirst() // asumimos un solo usuario
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      if (usuario.rolID !== rolRequerido) {
        return res.status(403).json({ error: 'Acceso denegado: rol no autorizado' })
      }

      next()
    } catch (error) {
      console.error('Error en middleware protegerPorRol:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}
