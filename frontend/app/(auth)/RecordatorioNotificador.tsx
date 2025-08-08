import { useEffect, useRef, useState } from 'react';
import { Alert, Vibration, Platform } from 'react-native';
import api from '../../services/api';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


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
        console.log('check', {
          desc: rec.descripcion,
          ahora: `${ahora.getHours()}:${ahora.getMinutes()}`,
          recHora: `${horaRecordatorio.getHours()}:${horaRecordatorio.getMinutes()}`,
          diaActual,
          diaRec: rec.diaSemana,
          esMismoMinuto,
          esMismoDia,
        });
        /*
        if (esMismoMinuto && esMismoDia) {
          const key = `${rec.ID}-${ahora.getFullYear()}${ahora.getMonth()}${ahora.getDate()}-${ahora.getHours()}${ahora.getMinutes()}`;
          if (!notifiedRef.current.has(key)) {
            notifiedRef.current.add(key);
            lanzarNotificacion(rec);
          }
        }
          */
      });
    };

    // Ejecutar una vez al montar para el minuto actual
    checkNotificaciones();

    const intervalo = setInterval(checkNotificaciones, 5000);
    return () => clearInterval(intervalo);
  }, []);


  const lanzarNotificacion = async (recordatorio: Recordatorio) => {
    if (Platform.OS === 'web') {
      Alert.alert('Recordatorio', recordatorio.descripcion); // fallback web
      console.log('DISPARO NOTIF', recordatorio.descripcion);
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Recordatorio',
        body: recordatorio.descripcion,
        sound: recordatorio.sonido || 'default',
        color: recordatorio.color || undefined,
      },
      trigger: null,
    });
    Vibration.vibrate(500);
  };

  return null; // no muestra nada visual
};

export default RecordatorioNotificador;