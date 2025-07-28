export enum RolUsuario {
  ADULTO = 'ADULTO',
  INFANTE = 'INFANTE',
}

export const RolUsuarioLabels: Record<RolUsuario, string> = {
  [RolUsuario.ADULTO]: 'Administrador',
  [RolUsuario.INFANTE]: 'Usuario',
};