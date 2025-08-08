import { useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import RecordatorioActivo from './RecordatorioActivo';


type Recordatorio = {
  ID: number;
  descripcion: string;
  hora: string; // DateTime string
  diaSemana?: string;
  sonido?: string;
  color?: string;
};

export const RecordatorioNotificador = () => {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]);
  const recordatoriosRef = useRef<Recordatorio[]>([]);
  const notifiedRef = useRef<Set<string>>(new Set());
  const [recordatorioActivo, setRecordatorioActivo] = useState<Recordatorio | null>(null);
  // Mantener referencia actualizada sin re-crear intervalos
  useEffect(() => {
    recordatoriosRef.current = recordatorios;
  }, [recordatorios]);

  // Cargar recordatorios una sola vez
  useEffect(() => {
    const obtenerRecordatorios = async () => {
      try {
        const res = await api.get('http://localhost:3000/api/recordatorios');
        const items = Array.isArray(res.data)
          ? res.data
          : (res.data?.recordatorios ?? []);
        setRecordatorios(items);
        console.log('frontend recordatorios', items);
      } catch (error) {
        console.error('Error al obtener recordatorios:', error);
      }
    };

    obtenerRecordatorios();
  }, []);

  // Chequeo cada minuto usando la ref (evita loops por dependencias)
  useEffect(() => {
    const checkNotificaciones = () => {
      const ahora = new Date();
      const diaActual = ahora
        .toLocaleDateString('es-ES', { weekday: 'long' })
        .toLowerCase();

      const lista = Array.isArray(recordatoriosRef.current)
        ? recordatoriosRef.current
        : [];

      lista.forEach((rec) => {
        const horaRecordatorio = new Date(rec.hora);

        const esMismoMinuto =
          horaRecordatorio.getHours() === ahora.getHours() &&
          horaRecordatorio.getMinutes() === ahora.getMinutes();

        const esMismoDia =
          !rec.diaSemana || rec.diaSemana.toLowerCase() === diaActual;

        // LOG DE DEPURACIÓN (aquí)
        const key = `${rec.ID}-${ahora.toDateString()}-${ahora.getHours()}${ahora.getMinutes()}`;

        if (esMismoMinuto && esMismoDia && !notifiedRef.current.has(key)) {
          notifiedRef.current.add(key);
          setRecordatorioActivo(rec); // Monta el componente
        }

      });
    };

    // Ejecutar una vez al montar para el minuto actual
    checkNotificaciones();

    const intervalo = setInterval(checkNotificaciones, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (

    <>
      {recordatorioActivo && (
        <RecordatorioActivo
          descripcion={recordatorioActivo.descripcion}
          hora={recordatorioActivo.hora}
          diaSemana={recordatorioActivo.diaSemana}
          sonido={recordatorioActivo?.sonido}
          color={recordatorioActivo?.color}
          onCerrar={() => setRecordatorioActivo(null)}
        />
      )}
    </>)
};

export default RecordatorioNotificador;