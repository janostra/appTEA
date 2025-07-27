import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

const RutinaScreen = ({ route }) => {
  const { rutina } = route.params;
  const [pasos, setPasos] = useState([]);

  useEffect(() => {
    const fetchPasos = async () => {
      try {
        const res = await api.get(`/rutinas/${rutina.ID}/pasos`);
        setPasos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPasos();
  }, []);

  const togglePasoCompletado = async (pasoID) => {
    try {
      await api.put(`/pasos/${pasoID}/completar`);
      setPasos((prev) =>
        prev.map((p) =>
          p.ID === pasoID ? { ...p, completado: !p.completado } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.pasoCard, item.completado && styles.completado]}
      onPress={() => togglePasoCompletado(item.ID)}
    >
      <Text style={styles.text}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutina: {rutina.nombre}</Text>
      <FlatList
        data={pasos}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  pasoCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fefefe',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  completado: {
    backgroundColor: '#c8e6c9',
  },
  text: {
    fontSize: 16,
  },
});

export default RutinaScreen;
