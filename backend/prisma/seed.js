import { PrismaClient } from '@prisma/client'

import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

async function crearSiNoExiste(modelo, descripcion) {
  const existe = await prisma[modelo].findFirst({
    where: { descripcion }
  })

  if (!existe) {
    await prisma[modelo].create({ data: { descripcion } })
  }
}

async function main() {
  const rutinaEstados = ['Activa', 'Completada', 'Oculta', 'Cancelada']
  for (const desc of rutinaEstados) await crearSiNoExiste('rutinaEstado', desc)

  const pasoEstados = ['Pendiente', 'Completado', 'Oculto']
  for (const desc of pasoEstados) await crearSiNoExiste('pasoEstado', desc)

  const frecuencias = ['Diario', 'Semanal', 'Mensual']
  for (const desc of frecuencias) await crearSiNoExiste('recordatorioFrecuencia', desc)

  const roles = ['Adulto', 'Infante']
  for (const desc of roles) await crearSiNoExiste('usuarioRol', desc)

  const niveles = ['Básico', 'Intermedio', 'Avanzado']
  for (const desc of niveles) await crearSiNoExiste('usuarioNivel', desc)

  console.log('Seed ejecutado correctamente ✅')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
