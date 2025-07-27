import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const AdultHomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [infantes, setInfantes] = useState([]);

  useEffect(() => {
    const fetchInfantes = async () => {
      try {
        const res = await api.get(`/adulto/${user.ID}/infantes`);
        setInfantes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInfantes();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ChildHome', { infante: item })}
    >
      <Text style={styles.name}>{item.nombre}</Text>
      <Text style={styles.nivel}>Nivel: {item.nivel?.descripcion || 'N/A'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infantes a Cargo</Text>
      <FlatList
        data={infantes}
        keyExtractor={(item) => item.infanteID.toString()}
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
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nivel: {
    fontSize: 14,
    color: '#555',
  },
});

export default AdultHomeScreen;