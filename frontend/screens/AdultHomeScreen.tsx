import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { AdultHomeScreenProps, Infante } from '../types/navigation';

const AdultHomeScreen: React.FC<AdultHomeScreenProps> = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [infantes, setInfantes] = useState<Infante[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInfantes = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/adulto/${user?.id}/infantes`);
        setInfantes(res.data);
      } catch (err) {
        console.error('Error fetching infantes:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchInfantes();
    }
  }, [user?.id]);

  const renderItem = ({ item }: { item: Infante }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ChildHome', { infante: item })}
    >
      <Text style={styles.name}>{item.nombre}</Text>
      <Text style={styles.nivel}>Nivel: {item.nivel?.descripcion || 'N/A'}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando infantes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infantes a Cargo</Text>
      <FlatList
        data={infantes}
        keyExtractor={(item) => item.infanteID.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
    color: '#333',
  },
  card: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  nivel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AdultHomeScreen; 