import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import HomeScreen from './home';
import HomeScreenChildren from './childrenHome';
import api from '../../services/api'; // Ajustá la ruta si es necesario

export default function App() {
  const [rolID, setRolID] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRol = async () => {
      try {
        const response = await api.get('http://localhost:3000/api/usuarios/rol');
        console.log('Rol obtenido:', response.data.rolID);
        setRolID(response.data.rolID);
      } catch (error) {
        console.error('Error al obtener rol:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRol();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (rolID === 1) {
    return <HomeScreen />;
  } else if (rolID === 2) {
    return <HomeScreenChildren />;
  } else {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
