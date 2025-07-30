import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import { FrecuenciaRecordatorio, FrecuenciaLabels } from '../constants/enums/frecuenciaRecordatorio';

export default function EditReminderScreen({ route, navigation }) {
  const { recordatorioId } = route.params;

  const [description, setDescription] = useState('');
  const [routine, setRoutine] = useState('');
  const [frequency, setFrequency] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState(new Date());
  const [color, setColor] = useState('');
  const [sound, setSound] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const sonidos = ['Campanita suave', 'Alarma fuerte', 'Vibración'];

  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/recordatorios/${recordatorioId}`);
        const r = res.data;
        setDescription(r.descripcion || '');
        setRoutine(r.rutinaId || '');
        setFrequency(r.frecuencia || '');
        setDay(r.diaSemana || '');
        setTime(new Date(r.hora));
        setColor(r.color || '#3498db');
        setSound(r.sonido || '');
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el recordatorio', error);
        setLoading(false);
      }
    };

    fetchReminder();
  }, [recordatorioId]);

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
    if (Platform.OS === 'android') setShowTimePicker(false);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/recordatorios/${recordatorioId}`, {
        descripcion: description,
        rutinaId: routine,
        frecuencia: frequency,
        diaSemana: day,
        hora: time.toISOString(),
        color,
        sonido: sound,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar el recordatorio', error);
    }
  };

  if (loading) return <Text style={{ padding: 20 }}>Cargando recordatorio...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>Descripción:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Frecuencia:</Text>
      <Picker selectedValue={frequency} onValueChange={setFrequency}>
        {Object.values(FrecuenciaRecordatorio).map((value) => (
          <Picker.Item key={value} label={FrecuenciaLabels[value]} value={value} />
        ))}
      </Picker>

      <Text>Día de la semana:</Text>
      <Picker selectedValue={day} onValueChange={setDay}>
        {diasSemana.map((d) => (
          <Picker.Item key={d} label={d} value={d} />
        ))}
      </Picker>

      <Text>Hora:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text style={{ fontSize: 16, padding: 10 }}>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker value={time} mode="time" display="default" onChange={handleTimeChange} />
      )}

      <Text>Color:</Text>
      <TextInput
        value={color}
        onChangeText={setColor}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Sonido:</Text>
      <Picker selectedValue={sound} onValueChange={setSound}>
        {sonidos.map((s) => (
          <Picker.Item key={s} label={s} value={s} />
        ))}
      </Picker>

      <Button title="Guardar cambios" onPress={handleSave} />
    </View>
  );
}
