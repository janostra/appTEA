import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ElegirMotivacionScreen() {
  const [descripcion, setDescripcion] = useState('');
  const router = useRouter();

  return (
    <LinearGradient colors={['#f5f7fa', '#e4e8f0']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#4f46e5" />
          </TouchableOpacity>
          <Text style={styles.title}>Motivaciones</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>Elegí una motivación</Text>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Medalla</Text>
            <Ionicons name="medal-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Estrellas</Text>
            <Ionicons name="sparkles-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Pulgar arriba</Text>
            <Ionicons name="thumbs-up-outline" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={styles.textArea}
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={4}
            placeholder="Escribí una descripción..."
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.saveButton]}>
            <Text style={styles.buttonText}>Guardar</Text>
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
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#374151',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  option: {
    backgroundColor: '#7ED957',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
  },
  saveButton: {
    backgroundColor: '#10b981',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
