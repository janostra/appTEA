import { Router } from 'express'
import { UsuarioController } from '../controllers/usuarioController.js'

const router = Router()
const usuarioController = new UsuarioController()

router.post('/usuarios', (req, res) =>
  usuarioController.crearUsuario(req, res)
)

// Las rutas que requieren usuario autenticado:
router.post('/usuarios/cambiar-rol', (req, res) =>
  usuarioController.alternarRol(req, res)
)

router.post('/usuarios/cambiar-pin', (req, res) =>
  usuarioController.cambiarPin(req, res)
)

export default router
