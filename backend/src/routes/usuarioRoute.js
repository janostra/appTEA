import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController.js';
import { protegerPorRol } from '../middlewares/auth.js'

const router = Router();
const usuarioController = new UsuarioController();


router.post('/', (req, res) => usuarioController.crearUsuario(req, res));
router.post('/cambiar-rol', (req, res) => usuarioController.alternarRol(req, res));
router.post('/cambiar-pin', protegerPorRol(2), (req, res) => usuarioController.cambiarPin(req, res));
router.post('/cambiar-nombre', (req, res) => usuarioController.cambiarNombre(req, res));
//Ruta para autenticación
router.post('/autenticar-adulto', (req, res) => usuarioController.autenticarAdulto(req, res));
router.get('/rol', (req, res) => usuarioController.getUsuarioRol(req, res));

export default router;