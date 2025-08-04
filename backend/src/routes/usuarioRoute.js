import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController.js';

const router = Router();
const usuarioController = new UsuarioController();


router.post('/', (req, res) => usuarioController.crearUsuario(req, res));
router.post('/cambiar-rol', (req, res) => usuarioController.alternarRol(req, res));
router.post('/cambiar-pin', (req, res) => usuarioController.cambiarPin(req, res));
router.post('/cambiar-nombre', (req, res) => usuarioController.cambiarNombre(req, res));
//Ruta para autenticación
router.post('/autenticar-adulto', (req, res) => usuarioController.autenticarAdulto(req, res));

export default router;