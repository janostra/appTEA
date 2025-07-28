export enum EstadoRutina {
  ACTIVA = 'ACTIVA',
  OCULTA = 'OCULTA',
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA',
}

export const EstadoRutinaLabels: Record<EstadoRutina, string> = {
  [EstadoRutina.ACTIVA]: 'Activa',
  [EstadoRutina.OCULTA]: 'Oculta',
  [EstadoRutina.COMPLETADA]: 'Completada',
  [EstadoRutina.CANCELADA]: 'Cancelada',
};