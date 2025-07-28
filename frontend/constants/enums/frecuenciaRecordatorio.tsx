export enum FrecuenciaRecordatorio {
  DIARIO = 'DIARIO',
  SEMANAL = 'SEMANAL',
  MENSUAL = 'MENSUAL',
}

export const FrecuenciaLabels: Record<FrecuenciaRecordatorio, string> = {
  [FrecuenciaRecordatorio.DIARIO]: 'Diaria',
  [FrecuenciaRecordatorio.SEMANAL]: 'Semanal',
  [FrecuenciaRecordatorio.MENSUAL]: 'Mensual',
};