import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const PerfilScreen = ({ route, navigation }) => {
  const { user, logout, isAdult, isChild } = useAuth();
  const [nombre, setNombre] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  // Si hay parámetros de infante (para adultos gestionando niños)
  const infante = route?.params?.infante;

  const guardarCambios = async () => {
    try {
      setLoading(true);
      
      if (infante && isAdult) {
        // Adulto actualizando perfil de infante
        await api.put(`/infantes/${infante.infanteID}`, {
          nombre,
          nivel: email, // Usamos email como nivel temporalmente
        });
        Alert.alert('Éxito', 'Perfil del infante actualizado correctamente.');
      } else if (isChild) {
        // Niño actualizando su propio perfil
        await api.put(`/niños/${user?.ID}`, {
          nombre,
          email,
        });
        Alert.alert('Éxito', 'Tu perfil se actualizó correctamente.');
      } else if (isAdult) {
        // Adulto actualizando su propio perfil
        await api.put(`/adultos/${user?.ID}`, {
          nombre,
          email,
        });
        Alert.alert('Éxito', 'Tu perfil se actualizó correctamente.');
      }
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  const getTitle = () => {
    if (infante && isAdult) {
      return `Perfil de ${infante.nombre}`;
    } else if (isChild) {
      return 'Mi Perfil (Niño)';
    } else {
      return 'Mi Perfil (Adulto)';
    }
  };

  const getAvatar = () => {
    if (infante && isAdult) {
      return infante.avatar || 'https://via.placeholder.com/100';
    } else {
      return user?.avatar || 'https://via.placeholder.com/100';
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: getAvatar() }} 
        style={styles.avatar} 
      />
      
      <Text style={styles.title}>{getTitle()}</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput 
        style={styles.input} 
        value={nombre} 
        onChangeText={setNombre}
        placeholder="Ingresa tu nombre"
      />

      <Text style={styles.label}>
        {infante && isAdult ? 'Nivel' : 'Email'}
      </Text>
      <TextInput 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail}
        placeholder={infante && isAdult ? "Nivel del infante" : "tu@email.com"}
        keyboardType={infante && isAdult ? "default" : "email-address"}
      />

      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={guardarCambios}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Text>
      </TouchableOpacity>

      {/* Mostrar información adicional según el rol */}
      {isChild && (
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Información del Niño</Text>
          <Text style={styles.infoText}>• Puedes ver tus rutinas activas</Text>
          <Text style={styles.infoText}>• Marca pasos como completados</Text>
          <Text style={styles.infoText}>• Gana puntos por completar rutinas</Text>
        </View>
      )}

      {isAdult && !infante && (
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Funciones de Adulto</Text>
          <Text style={styles.infoText}>• Crear rutinas para niños</Text>
          <Text style={styles.infoText}>• Gestionar infantes</Text>
          <Text style={styles.infoText}>• Crear recordatorios</Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
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
});

export default PerfilScreen;
