import { UsuarioService } from '../services/usuarioService.js';

const usuarioService = new UsuarioService();

export class UsuarioController {
  async crearUsuario(req, res) {
    try {
      const { pin, rol } = req.body;

      if (!rol) {
        return res.status(400).json({ error: 'El rol es requerido' });
      }

      if (rol === 'adulto' && !pin) {
        return res.status(400).json({ error: 'El PIN es requerido para rol adulto' });
      }

      const usuario = await usuarioService.crearUsuario({ pin, rol });

      return res.status(201).json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || 'Error en el servidor' });
    }
  }

  async alternarRol(req, res) {
    try {
      const { usuarioID, rolID } = await usuarioService.getUsuarioRol();
      
      let usuarioActualizado
      if (!usuarioID) {
        return res.status(400).json({ error: 'El ID del usuario es requerido' });
      }
      if (rolID == 2) {
        const { pin } = req.body
        usuarioActualizado = await usuarioService.alternarRol(pin);
      } else {
        usuarioActualizado = await usuarioService.alternarRol()
      }

      return res.json(usuarioActualizado);
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || 'Error al cambiar el rol' });
    }
  }

  async cambiarPin(req, res) {
    try {
      const { nuevoPin } = req.body;
      if (!usuarioID || !nuevoPin) {
        return res.status(400).json({ error: 'nuevo PIN son requeridos' });
      }
      const usuarioActualizado = await usuarioService.cambiarPin(nuevoPin);
      return res.json(usuarioActualizado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || 'Error al cambiar el PIN' });
    }
  }

  async autenticarAdulto(req, res) {
    try {
      const { pin } = req.body;
      
      if (!pin) {
        return res.status(400).json({ error: 'El PIN es requerido' });
      }

      // Buscar adulto por PIN
      const adulto = await usuarioService.autenticarAdulto(pin);

      return res.json({
        adultoID: adulto.adultoID,
        nombre: adulto.nombre || 'Adulto',
        rol: 'adulto'
      });
    } catch (error) {
      console.error(error);
      return res.status(error.message === 'PIN incorrecto' ? 401 : 500).json({ 
        message: error.message || 'Error en el servidor' 
      });
    }
  }


  async cambiarNombre(req, res) {
    try {
      const { usuarioID, nuevoNombre } = req.body;
      if (!usuarioID || !nuevoNombre) {
        return res.status(400).json({ error: 'UsuarioID y nuevo nombre son requeridos' });
      }
      const usuarioActualizado = await usuarioService.cambiarNombre(usuarioID, nuevoNombre);
      return res.json(usuarioActualizado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || 'Error al cambiar el nombre' });
    }
  }

  async getUsuarioRol(req, res) {
    try {
      const rol = await usuarioService.getUsuarioRol();
      return res.status(200).json(rol);
    } catch (error) {
      console.error('Error en getUsuarioRol:', error);
      return res.status(500).json({ error: error.message || 'Error al obtener el rol del usuario' });
    }
  }

  
}