import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // RutinaEstado
  const rutinaEstados = ['Activa', 'Inactiva', 'Pausada']
  for (const descripcion of rutinaEstados) {
    await prisma.rutinaEstado.upsert({
      where: { descripcion },
      update: {},
      create: { descripcion }
    })
  }

  // PasoEstado
  const pasoEstados = ['Pendiente', 'Completado', 'Cancelado']
  for (const descripcion of pasoEstados) {
    await prisma.pasoEstado.upsert({
      where: { descripcion },
      update: {},
      create: { descripcion }
    })
  }

  // RecordatorioFrecuencia
  const frecuencias = ['Diario', 'Semanal', 'Mensual']
  for (const descripcion of frecuencias) {
    await prisma.recordatorioFrecuencia.upsert({
      where: { descripcion },
      update: {},
      create: { descripcion }
    })
  }

  // UsuarioRol
  const roles = ['Adulto', 'Infante', 'Administrador']
  for (const descripcion of roles) {
    await prisma.usuarioRol.upsert({
      where: { descripcion },
      update: {},
      create: { descripcion }
    })
  }

  // UsuarioNivel
  const niveles = ['Básico', 'Intermedio', 'Avanzado']
  for (const descripcion of niveles) {
    await prisma.usuarioNivel.upsert({
      where: { descripcion },
      update: {},
      create: { descripcion }
    })
  }

  console.log('Seed ejecutado correctamente ✅')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
