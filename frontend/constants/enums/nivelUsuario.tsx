export enum NivelUsuario {
  BASICO = 'BASICO',
  INTERMEDIO = 'INTERMEDIO',
  AVANZADO = 'AVANZADO',
}

export const NivelUsuarioLabels: Record<NivelUsuario, string> = {
  [NivelUsuario.BASICO]: 'Principiante',
  [NivelUsuario.INTERMEDIO]: 'Intermedio',
  [NivelUsuario.AVANZADO]: 'Avanzado',
};