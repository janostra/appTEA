
//============================================================================================================
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, Image, Alert, Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function CrearRutinaScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [imagenUri, setImagenUri] = useState<string | null>(null);
  const [horarios, setHorarios] = useState([{ hora: '', dia: 'Lunes' }]);
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const pedirPermisos = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para seleccionar una imagen.');
      return false;
    }
    return true;
  };

  const seleccionarImagen = async () => {
    const tienePermiso = await pedirPermisos();
    if (!tienePermiso) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagenUri(resultado.assets[0].uri);
    }
  };

  const agregarHorario = () => {
    setHorarios([...horarios, { hora: '', dia: 'Lunes' }]);
  };

  const eliminarHorario = (index: number) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios.splice(index, 1);
    setHorarios(nuevosHorarios);
  };

  const esHoraValida = (hora: string) => {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(hora);
  };

  return (
    <LinearGradient colors={['#f5f7fa', '#e4e8f0']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header con botón de volver */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/listaRutinas')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#4f46e5" />
          </TouchableOpacity>
          <Text style={styles.title}>Crear Nueva Rutina</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Sección Nombre */}
        <View style={styles.card}>
          <Text style={styles.label}>Nombre de la Rutina</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej: Rutina matutina"
            placeholderTextColor="#999"
          />
        </View>

        {/* Sección Imagen */}
        <View style={styles.card}>
          <Text style={styles.label}>Imagen de la Rutina</Text>
          <View style={styles.imageSection}>
            <TouchableOpacity onPress={seleccionarImagen} style={styles.imageButton}>
              {imagenUri ? (
                <Image source={{ uri: imagenUri }} style={styles.imagenSeleccionada} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="camera" size={32} color="#6b7280" />
                  <Text style={styles.imagePlaceholderText}>Seleccionar imagen</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Sección Horarios */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Programar activación</Text>
            <TouchableOpacity onPress={agregarHorario} style={styles.addButton}>
              <Ionicons name="add-circle" size={24} color="#4f46e5" />
            </TouchableOpacity>
          </View>

          {horarios.map((h, index) => (
            <View key={index} style={styles.scheduleCard}>
              <View style={styles.row}>
                <View style={[styles.column, { flex: 2 }]}>
                  <Text style={styles.subLabel}>Día</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={h.dia}
                      style={styles.picker}
                      dropdownIconColor="#4f46e5"
                      onValueChange={(value) => {
                        const nuevosHorarios = [...horarios];
                        nuevosHorarios[index].dia = value;
                        setHorarios(nuevosHorarios);
                      }}
                    >
                      {diasSemana.map((dia) => (
                        <Picker.Item label={dia} value={dia} key={dia} />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={[styles.column, { flex: 2 }]}>
                  <Text style={styles.subLabel}>Hora (HH:mm)</Text>
                  <TextInput
                    style={[
                      styles.input,
                      !esHoraValida(h.hora) && h.hora.length > 0 ? styles.inputError : null,
                    ]}
                    placeholder="08:00"
                    placeholderTextColor="#999"
                    value={h.hora}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const nuevosHorarios = [...horarios];
                      nuevosHorarios[index].hora = text;
                      setHorarios(nuevosHorarios);
                    }}
                    maxLength={5}
                  />
                  {!esHoraValida(h.hora) && h.hora.length > 0 && (
                    <Text style={styles.errorText}>Formato inválido (HH:mm)</Text>
                  )}
                </View>

                <TouchableOpacity onPress={() => eliminarHorario(index)} style={styles.deleteButton}>
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Botones de acción */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.motivationButton]}
            activeOpacity={0.8}
            onPress={() => router.push('/elegirMotivacion')}
          >
            <Ionicons name="sparkles" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Motivación</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => router.push('/crearPaso')}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Crear Paso</Text>
          </TouchableOpacity>
        </View>
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
  headerSpacer: { width: 24 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    flex: 1,
  },
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
  label: { fontSize: 16, fontWeight: '600', color: '#374151' },
  subLabel: { fontSize: 14, marginBottom: 6, color: '#6b7280' },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
    color: '#1f2937',
  },
  inputError: { borderColor: '#ef4444' },
  imageSection: { marginTop: 8 },
  imageButton: { width: '100%', alignItems: 'center' },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: { marginTop: 8, color: '#6b7280', fontSize: 14 },
  imagenSeleccionada: { width: '100%', height: 150, borderRadius: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  column: { flex: 1 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: { height: Platform.OS === 'ios' ? 140 : 50, color: '#1f2937' },
  addButton: { padding: 4 },
  scheduleCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  deleteButton: { padding: 8, marginLeft: 'auto' },
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
  actionsContainer: { marginTop: 20, gap: 12 },
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
  primaryButton: { backgroundColor: '#4f46e5' },
  motivationButton: { backgroundColor: '#8b5cf6' },
  actionButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
});
