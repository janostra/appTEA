export enum EstadoPaso {
  PENDIENTE = 'PENDIENTE',
  COMPLETADO = 'COMPLETADO',
  OCULTO = 'OCULTO',
}

export const EstadoPasoLabels: Record<EstadoPaso, string> = {
  [EstadoPaso.PENDIENTE]: 'Pendiente',
  [EstadoPaso.COMPLETADO]: 'Completado',
  [EstadoPaso.OCULTO]: 'Oculto',
};