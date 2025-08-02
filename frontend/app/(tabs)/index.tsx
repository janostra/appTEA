import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

export default function TabsHomeScreen() {
  const { user, logout, isAdult, isChild } = useAuth();
  const router = useRouter();

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'infantes':
        if (isAdult) {
          // Adulto ve gestión de infantes
          alert('Funcionalidad de Gestión de Infantes - Usar React Navigation');
        } else {
          alert('Esta función solo está disponible para adultos');
        }
        break;
      case 'recordatorios':
        if (isAdult) {
          router.push('/(tabs)/addReminder');
        } else {
          alert('Esta función solo está disponible para adultos');
        }
        break;
      case 'rutinas':
        if (isAdult) {
          // Adulto ve creación de rutinas
          router.push('/(tabs)/explore');
        } else {
          // Niño ve sus rutinas activas
          alert('Funcionalidad de Rutinas del Niño - Usar React Navigation');
        }
        break;
      case 'perfil':
        // Ambos roles pueden ver perfil
        alert('Funcionalidad de Perfil - Usar React Navigation');
        break;
    }
  };

  const getWelcomeMessage = () => {
    if (isChild) {
      return `¡Hola, ${user?.name || 'Niño'}!`;
    } else {
      return `¡Hola, ${user?.name || 'Adulto'}!`;
    }
  };

  const getSubtitle = () => {
    if (isChild) {
      return '¿Qué rutina quieres hacer hoy?';
    } else {
      return '¿Qué quieres gestionar hoy?';
    }
  };

  const getButtonsForRole = () => {
    if (isChild) {
      return [
        {
          icon: '📋',
          title: 'Mis Rutinas',
          subtitle: 'Ver rutinas activas',
          action: 'rutinas'
        },
        {
          icon: '👤',
          title: 'Mi Perfil',
          subtitle: 'Configuración',
          action: 'perfil'
        }
      ];
    } else {
      return [
        {
          icon: '👶',
          title: 'Infantes',
          subtitle: 'Gestionar infantes',
          action: 'infantes'
        },
        {
          icon: '⏰',
          title: 'Recordatorios',
          subtitle: 'Crear recordatorios',
          action: 'recordatorios'
        },
        {
          icon: '📋',
          title: 'Rutinas',
          subtitle: 'Crear rutinas',
          action: 'rutinas'
        },
        {
          icon: '👤',
          title: 'Perfil',
          subtitle: 'Configuración',
          action: 'perfil'
        }
      ];
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcome}>{getWelcomeMessage()}</Text>
        <Text style={styles.subtitle}>{getSubtitle()}</Text>

        <View style={styles.buttonGrid}>
          {getButtonsForRole().map((button, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.button} 
              onPress={() => handleNavigation(button.action)}
            >
              <Text style={styles.buttonIcon}>{button.icon}</Text>
              <Text style={styles.buttonText}>{button.title}</Text>
              <Text style={styles.buttonSubtext}>{button.subtitle}</Text>
            </TouchableOpacity>
          ))}
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
