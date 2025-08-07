import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PerfilScreen = ({ route }) => {
  const { logout } = useAuth();
  const router = useRouter();
  const [rolID, setRolID] = useState(null);
  const [mostrarModalPin, setMostrarModalPin] = useState(false);
  const [pinIngresado, setPinIngresado] = useState('');

  useEffect(() => {
    const fetchRol = async () => {
      try {
        const response = await api.get('http://localhost:3000/api/usuarios/rol');
        console.log(response.data.rolID)
        setRolID(response.data.rolID);
      } catch (error) {
        console.error('Error al obtener rol:', error);
      }
    };
    fetchRol();
  }, []);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const cambiarRolAdultoANinio = async () => {
    try {
      const response = await api.post('http://localhost:3000/api/usuarios/cambiar-rol', {});
      if (response.data?.rolID === 2) {
        Alert.alert('Éxito', 'Cambiado a modo niño');
        setRolID(1);
        router.replace('/app');
      } else {
        Alert.alert('Error', 'No se pudo cambiar al modo niño.');
      }
    } catch (error) {
      console.error('Error al cambiar de rol:', error);
      Alert.alert('Error', 'No se pudo cambiar el rol.');
    }
  };

  const enviarCambioConPin = async () => {
    try {
      const response = await api.post('http://localhost:3000/api/usuarios/cambiar-rol', {
        pin: parseInt(pinIngresado, 10),
      });

      if (response.data?.rolID === 1) {
        Alert.alert('Éxito', 'Cambiado a modo adulto');
        setRolID(2);
        setMostrarModalPin(false);
        setPinIngresado('');
        router.replace('/home');
      } else {
        Alert.alert('Error', 'PIN incorrecto o no se pudo cambiar el rol.');
      }
    } catch (error) {
      console.error('Error al cambiar de rol:', error);
      Alert.alert('Error', 'No se pudo cambiar el rol.');
    }
  };

  const getTitle = () => {
    return rolID === 2 ? 'Mi Perfil (Niño)' : 'Mi Perfil (Adulto)';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4f46e5" />
        </TouchableOpacity>
        <Text style={styles.title}>{getTitle()}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {rolID === 1 && (
        <TouchableOpacity style={styles.changeRoleButton} onPress={cambiarRolAdultoANinio}>
          <Text style={styles.changeRoleButtonText}>Cambiar a usuario niño</Text>
        </TouchableOpacity>
      )}

      {rolID === 2 && (
        <TouchableOpacity style={styles.changeRoleButton} onPress={() => setMostrarModalPin(true)}>
          <Text style={styles.changeRoleButtonText}>Cambiar a usuario adulto</Text>
        </TouchableOpacity>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>
          {rolID === 2 ? 'Información del Niño' : 'Funciones de Adulto'}
        </Text>
        {rolID === 2 ? (
          <>
            <Text style={styles.infoText}>• Puedes ver tus rutinas activas</Text>
            <Text style={styles.infoText}>• Marca pasos como completados</Text>
            <Text style={styles.infoText}>• Gana puntos por completar rutinas</Text>
          </>
        ) : (
          <>
            <Text style={styles.infoText}>• Crear rutinas para niños</Text>
            <Text style={styles.infoText}>• Gestionar infantes</Text>
            <Text style={styles.infoText}>• Crear recordatorios</Text>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* MODAL DE PIN */}
      <Modal visible={mostrarModalPin} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ingrese el PIN para cambiar a adulto</Text>
            <TextInput
              style={styles.input}
              placeholder="PIN"
              secureTextEntry
              keyboardType="numeric"
              value={pinIngresado}
              onChangeText={setPinIngresado}
            /> 
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.saveButton, { flex: 1, marginRight: 8 }]}
                onPress={enviarCambioConPin}
              >
                <Text style={styles.saveButtonText}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.logoutButton, { flex: 1, marginLeft: 8 }]}
                onPress={() => {
                  setMostrarModalPin(false);
                  setPinIngresado('');
                }}
              >
                <Text style={styles.logoutButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  /* mantené tus estilos igual, sin cambios */
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
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
  headerSpacer: {
    width: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 24,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeRoleButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  changeRoleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
    modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default PerfilScreen;
