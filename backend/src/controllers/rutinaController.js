const prisma = require('../models/prismaClient');

async function crearRutina(req, res) {
  try {
    const { titulo, activaDesde, activaHasta, pasos } = req.body; //PASO SE CREA A PARTE Y SE AÑADE DESPUES

    // Validación: máximo 4 pasos
    if (pasos.length > 4) {
      return res.status(400).json({ error: 'Una rutina no puede tener más de 4 pasos.' });
    }

    // Validación: máximo 5 rutinas activas
    const rutinasActivas = await prisma.rutina.count({
      where: { estado: 'ACTIVA' }
    });

    if (rutinasActivas >= 5) {
      return res.status(400).json({ error: 'Ya hay 5 rutinas activas.' });
    }

    // Crear rutina
    const nuevaRutina = await prisma.rutina.create({
      data: {
        titulo,
        activaDesde: activaDesde ? new Date(activaDesde) : null,
        activaHasta: activaHasta ? new Date(activaHasta) : null,
        pasos: {
          create: pasos.map((paso, index) => ({
            descripcion: paso.descripcion,
            imagenUrl: paso.imagenUrl,
            orden: index + 1
          }))
        }
      },
      include: {
        pasos: true
      }
    });

    return res.status(201).json(nuevaRutina);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la rutina.' });
  }
}

module.exports = {
  crearRutina
};
