import { useEffect, useState } from 'react';
import { Alert, Vibration } from 'react-native';
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

useEffect(() => {
  const obtenerRecordatorios = async () => {
    try {
      const res = await api.get('http://localhost:3000/api/recordatorios');
      setRecordatorios(res.data.recordatorios);
      console.log("frontend", recordatorios)
    } catch (error) {
      console.error('Error al obtener recordatorios:', error);
    }
  };

  obtenerRecordatorios();

  const checkNotificaciones = () => {
    const ahora = new Date();
    const diaActual = ahora.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();

    recordatorios.forEach((rec) => {
      const horaRecordatorio = new Date(rec.hora);

      const esMismoMinuto =
        horaRecordatorio.getHours() === ahora.getHours() &&
        horaRecordatorio.getMinutes() === ahora.getMinutes();

      const esMismoDia =
        !rec.diaSemana || rec.diaSemana.toLowerCase() === diaActual;

      if (esMismoMinuto && esMismoDia) {
        lanzarNotificacion(rec);
      }
    });
  };

  const intervalo = setInterval(() => {
    checkNotificaciones();
  }, 60000);

  return () => clearInterval(intervalo);
}, [recordatorios]); // ← importante incluir dependencias reales


  const lanzarNotificacion = async (recordatorio: Recordatorio) => {
    if (Device.isDevice) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '⏰ Recordatorio',
          body: recordatorio.descripcion,
          sound: recordatorio.sonido || 'default',
          color: recordatorio.color || undefined,
        },
        trigger: null, // inmediata
      });

      Vibration.vibrate(500);
    } else {
      Alert.alert('Recordatorio', recordatorio.descripcion);
    }
  };

  return null; // no muestra nada visual
};
