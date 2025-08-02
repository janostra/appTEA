import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { FrecuenciaRecordatorio, FrecuenciaLabels } from '../constants/enums/frecuenciaRecordatorio';

interface Rutina {
  ID: number;
  nombre: string;
}

interface Color {
  nombre: string;
  valor: string | null;
}

export default function AddReminderScreen() {
  const router = useRouter();

  const [rutinasDisponibles, setRutinasDisponibles] = useState<Rutina[]>([]);
  const [loadingRutinas, setLoadingRutinas] = useState(true);
  const [routineId, setRoutineId] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<string>('Semanal');
  const [day, setDay] = useState<string>('Lunes');
  const [time, setTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sound, setSound] = useState<string>('Campanita suave');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const sonidos = ['Campanita suave', 'Alarma clásica', 'Tono de notificación'];
  const colores: Color[] = [
    { nombre: 'Rojo', valor: '#FF5252' },
    { nombre: 'Verde', valor: '#4CAF50' },
    { nombre: 'Azul claro', valor: '#03A9F4' },
    { nombre: 'Amarillo', valor: '#FFEB3B' },
    { nombre: 'Morado', valor: '#9C27B0' },
    { nombre: 'Sin color', valor: null },
  ];

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        setLoadingRutinas(true);
        const res = await fetch('http://localhost:3000/api/rutinas');
        const data = await res.json();
        setRutinasDisponibles(data);
      } catch (error) {
        console.error('Error al cargar rutinas:', error);
        Alert.alert('Error', 'No se pudieron cargar las rutinas');
      } finally {
        setLoadingRutinas(false);
      }
    };
    fetchRutinas();
  }, []);

  const validarHora = (hora: string): boolean => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(hora);
  };

  const handleGuardar = () => {
    if (!routineId) {
      Alert.alert('Error', 'Debe seleccionar una rutina');
      return;
    }

    if (!time || !validarHora(time)) {
      Alert.alert('Error', 'Debe ingresar una hora válida (HH:mm)');
      return;
    }

    console.log({
      routineId,
      frequency,
      day,
      time,
      description,
      selectedColor,
      sound,
    });

    Alert.alert('Recordatorio guardado', 'Tu recordatorio fue creado correctamente.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  if (loadingRutinas) {
    return (
      <View style={[styles.gradient, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Cargando rutinas...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#f5f7fa', '#e4e8f0']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#4f46e5" />
          </TouchableOpacity>
          <Text style={styles.title}>Agregar Recordatorio</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Rutina */}
        <View style={styles.card}>
          <Text style={styles.label}>Rutina</Text>
          <Picker
            selectedValue={routineId}
            onValueChange={(val) => setRoutineId(val)}
            style={styles.picker}
            dropdownIconColor="#4f46e5"
          >
            <Picker.Item label="Seleccione una rutina" value={null} />
            {rutinasDisponibles.map((r) => (
              <Picker.Item key={r.ID} label={r.nombre} value={r.ID} />
            ))}
          </Picker>
        </View>

        {/* Frecuencia */}
        <View style={styles.card}>
          <Text style={styles.label}>Frecuencia</Text>
          <Picker
            selectedValue={frequency}
            onValueChange={(val) => setFrequency(val)}
            style={styles.picker}
            dropdownIconColor="#4f46e5"
          >
            {Object.values(FrecuenciaRecordatorio).map((freq) => (
              <Picker.Item key={freq} label={FrecuenciaLabels[freq]} value={freq} />
            ))}
          </Picker>
        </View>

        {frequency === 'Semanal' && (
          <View style={styles.card}>
            <Text style={styles.label}>Día</Text>
            <Picker
              selectedValue={day}
              onValueChange={(val) => setDay(val)}
              style={styles.picker}
              dropdownIconColor="#4f46e5"
            >
              {diasSemana.map((dia) => (
                <Picker.Item key={dia} label={dia} value={dia} />
              ))}
            </Picker>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.label}>Hora</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 08:30"
            placeholderTextColor="#999"
            value={time}
            onChangeText={setTime}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Escriba aquí..."
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Color</Text>
          <View style={styles.colorContainer}>
            {colores.map((color) => (
              <TouchableOpacity
                key={color.valor ?? 'default'}
                style={[
                  styles.colorOption,
                  { backgroundColor: color.valor ?? 'transparent' },
                  selectedColor === color.valor && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color.valor)}
              >
                {!color.valor && <Text style={styles.noColorText}>X</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Sonido</Text>
          <Picker
            selectedValue={sound}
            onValueChange={(val) => setSound(val)}
            style={styles.picker}
            dropdownIconColor="#4f46e5"
          >
            {sonidos.map((s) => (
              <Picker.Item key={s} label={s} value={s} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={[styles.actionButton, styles.primaryButton]} onPress={handleGuardar}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: { width: 24 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#1f2937',
  },
  picker: {
    height: Platform.OS === 'ios' ? 140 : 50,
    color: '#1f2937',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#4f46e5',
  },
  noColorText: {
    fontSize: 18,
    color: '#666',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});
