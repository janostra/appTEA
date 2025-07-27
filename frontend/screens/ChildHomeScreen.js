import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

const ChildHomeScreen = ({ route, navigation }) => {
  const { infante } = route.params;
  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        const res = await api.get(`/infante/${infante.infanteID}/rutinas`);
        setRutinas(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRutinas();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Rutina', { rutina: item })}
    >
      <Text style={styles.name}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutinas de {infante.nombre}</Text>
      <FlatList
        data={rutinas}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#e6f0ff',
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChildHomeScreen;
