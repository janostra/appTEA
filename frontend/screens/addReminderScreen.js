import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FrecuenciaRecordatorio, FrecuenciaLabels } from '../constants/enums/frecuenciaRecordatorio';

const AddReminderScreen = ({ navigation }) => {
  const [rutinasDisponibles, setRutinasDisponibles] = useState([]);
  const [loadingRutinas, setLoadingRutinas] = useState(true);
  const [routineId, setRoutineId] = useState(null);
  const [frequency, setFrequency] = useState('Semanal');
  const [day, setDay] = useState('Lunes');
  const [description, setDescription] = useState('');
  const [sound, setSound] = useState('Campanita suave');
  const [selectedColor, setSelectedColor] = useState(null);
  const [time, setTime] = useState('');

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const sonidos = ['Campanita suave', 'Alarma clásica', 'Tono de notificación'];
  const colores = [
    { nombre: 'Rojo', valor: '#FF5252' },
    { nombre: 'Verde', valor: '#4CAF50' },
    { nombre: 'Azul claro', valor: '#03A9F4' },
    { nombre: 'Amarillo', valor: '#FFEB3B' },
    { nombre: 'Morado', valor: '#9C27B0' },
    { nombre: 'Sin color', valor: null }
  ];

  useEffect(() => {
    fetch('http://localhost:3000/api/rutinas')
      .then(response => response.json())
      .then(data => {
        setRutinasDisponibles(data);
      })
      .catch(error => {
        console.error('Error al cargar rutinas:', error);
        setRutinasDisponibles([]);
      })
      .finally(() => setLoadingRutinas(false));
  }, []);

  const validarHora = (hora) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(hora);
  };

  const handleGuardar = () => {
    if (time && !validarHora(time)) {
      Alert.alert('Error', 'La hora debe estar en formato HH:mm (ej: 08:30 o 18:45)');
      return;
    }

    console.log('Datos del recordatorio:', {
      routineId,
      frequency,
      day,
      time,
      description,
      selectedColor,
      sound
    });

    Alert.alert('Recordatorio guardado', 'Tu recordatorio fue creado correctamente.');
  };

  if (loadingRutinas) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Cargando rutinas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Agregar Recordatorio</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rutina</Text>
        <Picker
          selectedValue={routineId}
          onValueChange={(itemValue) => setRoutineId(itemValue)}
          style={styles.picker}
          dropdownIconColor="#666"
        >
          <Picker.Item label="Seleccione una rutina" value={null} />
          {rutinasDisponibles.map((rutina) => (
            <Picker.Item key={rutina.ID} label={rutina.nombre} value={rutina.ID} />
          ))}
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frecuencia</Text>
        <Picker
          selectedValue={frequency}
          onValueChange={(itemValue) => setFrequency(itemValue)}
          style={styles.picker}
          dropdownIconColor="#666"
        >
          {Object.values(FrecuenciaRecordatorio).map((freq) => (
            <Picker.Item key={freq} label={FrecuenciaLabels[freq]} value={freq} />
          ))}
        </Picker>
      </View>

      {frequency === 'Semanal' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Día Semana</Text>
          <Picker
            selectedValue={day}
            onValueChange={setDay}
            style={styles.picker}
            dropdownIconColor="#666"
          >
            {diasSemana.map((d) => (
              <Picker.Item key={d} label={d} value={d} />
            ))}
          </Picker>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hora de la rutina</Text>
        <TextInput
          style={styles.timeInput}
          placeholder="Ej: 14:30"
          value={time}
          onChangeText={setTime}
          keyboardType="numeric"
          maxLength={5}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción:</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Escriba aquí..."
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color</Text>
        <View style={styles.colorContainer}>
          {colores.map((color) => (
            <TouchableOpacity
              key={color.valor || 'default'}
              style={[
                styles.colorOption,
                { backgroundColor: color.valor || 'transparent' },
                selectedColor === color.valor && styles.selectedColor
              ]}
              onPress={() => setSelectedColor(color.valor)}
            >
              {!color.valor && <Text style={styles.noColorText}>X</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sonido</Text>
        <Picker
          selectedValue={sound}
          onValueChange={(itemValue) => setSound(itemValue)}
          style={styles.picker}
          dropdownIconColor="#666"
        >
          {sonidos.map((s) => (
            <Picker.Item key={s} label={s} value={s} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  picker: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#333',
  },
  noColorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddReminderScreen;