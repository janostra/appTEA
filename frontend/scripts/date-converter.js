export function convertirHorarioAISO({ hora, dia }) {
  const diasSemana = {
    Lunes: 1,
    Martes: 2,
    Miércoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sábado: 6,
    Domingo: 0
  };

  const hoy = new Date();
  const diaActual = hoy.getDay(); // 0 (domingo) a 6 (sábado)
  const diaObjetivo = diasSemana[dia];

  if (diaObjetivo === undefined) {
    throw new Error(`Día inválido: ${dia}`);
  }

  // Calcular diferencia de días para llegar al día objetivo
  const diferencia = (diaObjetivo - diaActual + 7) % 7;
  const fechaObjetivo = new Date(hoy);
  fechaObjetivo.setDate(hoy.getDate() + diferencia);

  // Separar hora y minutos
  const [horas, minutos] = hora.split(':').map(Number);
  fechaObjetivo.setHours(horas, minutos, 0, 0);

  return fechaObjetivo.toISOString();
}

// Ejemplo de uso:
const entrada = { hora: "08:00", dia: "Lunes" };
console.log(convertirHorarioAISO(entrada));
// Salida esperada: algo como "2025-08-04T08:00:00.000Z" si hoy es lunes
