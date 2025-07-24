import express from 'express'
import rutinaRoutes from './routes/rutinas.js'

const app = express()
app.use(express.json())

// Rutas
app.use('/api/rutinas', rutinaRoutes)
