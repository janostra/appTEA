import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleNavigation = (screen: string) => {
  switch (screen) {
    case 'infantes':
      router.push('/infantes');
      break;
    case 'recordatorios':
      router.push('/addReminder');
      break;
    case 'rutinas':
      router.push('/listaRutinas');
      break;
    case 'perfil':
      router.push('/perfil');
      break;
  }
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* <Text style={styles.welcome}>¡Hola, {user?.name || 'Usuario'}!</Text> */}
        <Text style={styles.welcome}>
        ¡Hola, {(typeof user?.name === 'string' && user.name.trim() !== '') ? user.name : 'Adulto'}!
        </Text>

        <Text style={styles.subtitle}>¿Qué querés hacer hoy?</Text>

        <View style={styles.buttonGrid}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handleNavigation('infantes')}
          >
            <Text style={styles.buttonIcon}>👶</Text>
            <Text style={styles.buttonText}>Infantes</Text>
            <Text style={styles.buttonSubtext}>Gestionar infantes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handleNavigation('recordatorios')}
          >
            <Text style={styles.buttonIcon}>⏰</Text>
            <Text style={styles.buttonText}>Recordatorios</Text>
            <Text style={styles.buttonSubtext}>Crear recordatorios</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handleNavigation('rutinas')}
          >
            <Text style={styles.buttonIcon}>📋</Text>
            <Text style={styles.buttonText}>Rutinas</Text>
            <Text style={styles.buttonSubtext}>Ver y crear rutinas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handleNavigation('perfil')}
          >
            <Text style={styles.buttonIcon}>👤</Text>
            <Text style={styles.buttonText}>Perfil</Text>
            <Text style={styles.buttonSubtext}>Configuración</Text>
          </TouchableOpacity>
        </View>

          <TouchableOpacity
            style={[styles.button, styles.logout]}
            onPress={() => {
              logout();
              router.replace('/login');
            }}
          >
            <Text style={styles.buttonText}>🚪 Cerrar sesión</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  welcome: { 
    fontSize: 28, 
    marginBottom: 10, 
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  subtitle: { 
    fontSize: 18, 
    marginBottom: 30, 
    color: '#666',
    textAlign: 'center'
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    width: '48%',
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonText: { 
    color: '#333', 
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  buttonSubtext: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  logout: { 
    backgroundColor: '#d9534f',
    width: '100%',
    paddingVertical: 15,
  },
});
