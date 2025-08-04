import express from 'express'
import rutinaRoutes from './routes/rutinaRoute.js'
import cors from 'cors';
import cancelacionRoutes from './routes/cancelacionRoute.js'
import recordatorioRoutes from './routes/recordatorioRoute.js'
import usuarioRoutes from './routes/usuarioRoute.js'

import dotenv from 'dotenv';
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: 'http://localhost:8081'
}));
app.use(express.json())

// Rutas
app.use('/api/rutinas', rutinaRoutes)
app.use('/api/cancelaciones', cancelacionRoutes)
app.use('/api/recordatorios', recordatorioRoutes)
app.use('/api/usuarios', usuarioRoutes)

// Manejo básico de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
