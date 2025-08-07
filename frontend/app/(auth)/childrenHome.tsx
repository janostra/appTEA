import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../services/api'; // Ajustá la ruta si es necesario

type Rutina = {
  id: number;
  nombre: string;
};

const HomeScreenChildren = () => {
  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRutinas();
  }, []);

  const fetchRutinas = async () => {
    try {
      setLoading(true);
      const res = await api.get('http://localhost:3000/api/rutinas');
      setRutinas(res.data);
    } catch (err) {
      console.error('Error al obtener rutinas:', err);
    } finally {
      setLoading(false);
    }
  };

  const pedirAyuda = () => {
    Alert.alert('Ayuda', '¡Se ha solicitado ayuda!');
  };

  const irAConfiguracion = () => {
    router.push('/perfil');
  };

  return (
    <View style={styles.container}>
      {/* Botón de configuración */}
      <TouchableOpacity style={styles.configBoton} onPress={irAConfiguracion}>
        <Text style={styles.configTexto}>⚙️</Text>
      </TouchableOpacity>

      <Text style={styles.header}>👦 Mis Rutinas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center' }}>
          {rutinas.length === 0 ? (
            <Text style={{ marginTop: 20, color: '#555' }}>No hay rutinas disponibles.</Text>
          ) : (
            rutinas.map((rutina) => (
              <View key={rutina.id} style={styles.rutina}>
                <Text style={styles.rutinaTexto}>📌 {rutina.nombre}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.ayudaBoton} onPress={pedirAyuda}>
        <Text style={styles.ayudaTexto}>Pedir ayuda</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreenChildren;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1f0f6',
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  configBoton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  configTexto: {
    fontSize: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  rutina: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
  },
  rutinaTexto: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
  },
  ayudaBoton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 40,
  },
  ayudaTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
