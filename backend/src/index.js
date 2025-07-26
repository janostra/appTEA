import express from 'express'
import rutinaRoutes from './routes/rutina.routes.js'
import cancelacionRoutes from './routes/cancelacion.routes.js'
import recordatorioRoutes from './routes/recordatorio.routes.js'
import usuarioRoutes from './routes/usuario.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

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
