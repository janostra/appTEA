import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, Image, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useRutina } from '../context/RutinaContext'; // ajustá el path si hace falta

export default function CrearPasoScreen() {
  const router = useRouter();
  const {
    nombre,
    imagenUri,
    horarios,
    pasos,
    agregarPaso,
    limpiarRutina,
  } = useRutina();

  const pasosActuales = pasos.length + 1;

  const [descripcion, setDescripcion] = useState('');
  const [imagenPasoUri, setImagenPasoUri] = useState<string | null>(null);

  const pedirPermisosGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para seleccionar una imagen.');
      return false;
    }
    return true;
  };

  const seleccionarImagen = async () => {
    const tienePermiso = await pedirPermisosGaleria();
    if (!tienePermiso) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagenPasoUri(resultado.assets[0].uri);
    }
  };

  const motivacion = {
    icono: "pulgar arriba",
    descripcion: "¡Lo has hecho bien!",
    fechaObtencion: new Date().toISOString(),
  };

  const handleGuardar = async () => {
    try {
      agregarPaso({
        descripcion: descripcion || 'Paso sin descripción',
        imagen: imagenPasoUri || '',

      });

      const activacionesTransformadas = horarios.map(({ dia, hora }) => {
        const hoy = new Date().toISOString().split('T')[0];
        return {
          diaSemana: dia,
          horaActivacion: `${hoy}T${hora}:00.000Z`,
        };
      });


      const response = await fetch('http://localhost:3000/api/rutinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          imagen: imagenUri,
          activaciones: activacionesTransformadas,
          pasos: [...pasos, { descripcion, imagen: imagenPasoUri }],
          motivacion,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Rutina guardada:', data);
        limpiarRutina();
        router.push('/listaRutinas');
      } else {
        console.error('Error al guardar rutina:', data);
        Alert.alert('Error', 'No se pudo guardar la rutina');
      }
    } catch (error) {
      console.error('Error de red:', error);
      Alert.alert('Error', 'Ocurrió un problema al guardar la rutina.');
    }
  };

  const agregarSiguientePaso = () => {
    agregarPaso({
      descripcion: descripcion || 'Paso sin descripción',
      imagen: imagenPasoUri || '',
    });
    router.push('/crearPaso'); // Recarga pantalla para el siguiente paso
  };

  return (
    <LinearGradient colors={['#f5f7fa', '#e4e8f0']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#4f46e5" />
          </TouchableOpacity>
          <Text style={styles.title}>Paso {pasosActuales} de 3</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Card principal */}
        <View style={styles.card}>
          <Text style={styles.label}>Descripción del paso</Text>
          <TextInput
            style={styles.textarea}
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={4}
            placeholder="Describe este paso de la rutina..."
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Multimedia</Text>
          <View style={styles.mediaOptions}>
            <TouchableOpacity onPress={seleccionarImagen} style={styles.mediaButton}>
              <View style={styles.mediaButtonContent}>
                <Ionicons name="image" size={28} color="#4f46e5" />
                <Text style={styles.mediaButtonText}>Imagen</Text>
              </View>
            </TouchableOpacity>
          </View>

          {imagenPasoUri && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: imagenPasoUri }} style={styles.imagenSeleccionada} />
              <TouchableOpacity
                style={styles.deleteImageButton}
                onPress={() => setImagenPasoUri(null)}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Navegación */}
        <View style={styles.navigationContainer}>
          {pasosActuales >= 3 ? (
            <Text style={styles.maxStepsText}>Has alcanzado el máximo de pasos</Text>
          ) : (
            <Text style={styles.nextStepText}>¿Deseas agregar otro paso?</Text>
          )}

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[styles.navButton, styles.saveButton]}
              onPress={handleGuardar}
            >
              <Text style={styles.navButtonText}>Guardar y salir</Text>
            </TouchableOpacity>

            {pasosActuales < 3 && (
              <TouchableOpacity
                style={[styles.navButton, styles.nextButton]}
                onPress={agregarSiguientePaso}
              >
                <Text style={styles.navButtonText}>Siguiente paso</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.navButton, styles.cancelButton]}
              onPress={() => {
                limpiarRutina();
                router.push('/listaRutinas');
              }}
            >
              <Text style={styles.navButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 20,
  },
  backButton: {
    padding: 8, borderRadius: 20, backgroundColor: 'white',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  cancelButton: { backgroundColor: '#ef4444' },
  headerSpacer: { width: 24 },
  title: {
    fontSize: 22, fontWeight: '700',
    color: '#1f2937', textAlign: 'center', flex: 1,
  },
  card: {
    backgroundColor: 'white', borderRadius: 12,
    padding: 20, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
  },
  label: {
    fontSize: 16, fontWeight: '600',
    color: '#374151', marginBottom: 10,
  },
  textarea: {
    width: '100%', minHeight: 120, borderWidth: 1,
    borderColor: '#e5e7eb', borderRadius: 8,
    padding: 12, fontSize: 16, color: '#1f2937',
    textAlignVertical: 'top', marginBottom: 20,
  },
  mediaOptions: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 20,
  },
  mediaButton: {
    width: '48%', borderWidth: 1,
    borderColor: '#e5e7eb', borderRadius: 8, padding: 12,
  },
  mediaButtonContent: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
  },
  mediaButtonText: {
    color: '#4f46e5', fontWeight: '500',
  },
  imagePreviewContainer: {
    position: 'relative', alignItems: 'center',
  },
  imagenSeleccionada: {
    width: '100%', height: 200,
    borderRadius: 8, marginTop: 10,
  },
  deleteImageButton: {
    position: 'absolute', top: 15, right: 15,
    backgroundColor: '#ef4444', borderRadius: 15,
    width: 30, height: 30, alignItems: 'center',
    justifyContent: 'center',
  },
  navigationContainer: { alignItems: 'center' },
  nextStepText: {
    fontSize: 16, color: '#6b7280', marginBottom: 15,
  },
  maxStepsText: {
    fontSize: 16, color: '#ef4444',
    fontWeight: '500', marginBottom: 15,
  },
  navigationButtons: {
    flexDirection: 'row', width: '100%', gap: 12,
  },
  navButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', padding: 16, borderRadius: 12,
    gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  saveButton: { backgroundColor: '#6b7280' },
  nextButton: { backgroundColor: '#4f46e5' },
  navButtonText: {
    color: 'white', fontWeight: '600', fontSize: 16,
  },
});
