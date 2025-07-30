import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image } from 'react-native';
import api from '../services/api';

const PerfilScreen = ({ route }) => {
  const { infante } = route.params;
  const [nombre, setNombre] = useState(infante.nombre);
  const [nivel, setNivel] = useState(infante.nivel?.descripcion || '');

  const guardarCambios = async () => {
    try {
      await api.put(`/infantes/${infante.infanteID}`, {
        nombre,
        nivel,
      });
      alert('Datos actualizados con éxito.');
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: infante.avatar || 'https://via.placeholder.com/100' }} style={styles.avatar} />
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Nivel</Text>
      <TextInput style={styles.input} value={nivel} onChangeText={setNivel} />

      <Button title="Guardar cambios" onPress={guardarCambios} />
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
  label: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
});

export default PerfilScreen;
