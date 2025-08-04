// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import api from '../services/api';
// import { ChildHomeScreenProps, Rutina } from '../types/navigation';

// const ChildHomeScreen: React.FC<ChildHomeScreenProps> = ({ route, navigation }) => {
//   const { infante } = route.params;
//   const [rutinas, setRutinas] = useState<Rutina[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchRutinas = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/infante/${infante.infanteID}/rutinas`);
//         setRutinas(res.data);
//       } catch (err) {
//         console.error('Error fetching rutinas:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRutinas();
//   }, [infante.infanteID]);

//   const renderItem = ({ item }: { item: Rutina }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('Rutina', { rutina: item })}
//     >
//       <Text style={styles.name}>{item.nombre}</Text>
//       {item.descripcion && (
//         <Text style={styles.description}>{item.descripcion}</Text>
//       )}
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loadingText}>Cargando rutinas...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Rutinas de {infante.nombre}</Text>
//       <FlatList
//         data={rutinas}
//         keyExtractor={(item) => item.ID.toString()}
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//   },
//   card: {
//     padding: 16,
//     backgroundColor: '#e6f0ff',
//     borderRadius: 10,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   description: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default ChildHomeScreen; 



//===========================================================================================================

//===========================================================================================================
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';
import { useRouter } from 'expo-router';

interface Props {
  infanteID: number;
  nombre: string;
}

interface Rutina {
  ID: number;
  nombre: string;
  descripcion?: string;
}

const ChildHomeScreen: React.FC<Props> = ({ infanteID, nombre }) => {
  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/infante/${infanteID}/rutinas`);
        setRutinas(res.data);
      } catch (err) {
        console.error('Error fetching rutinas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRutinas();
  }, [infanteID]);

  const renderItem = ({ item }: { item: Rutina }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/rutina', params: { rutinaID: item.ID } })}
    >
      <Text style={styles.name}>{item.nombre}</Text>
      {item.descripcion && <Text style={styles.description}>{item.descripcion}</Text>}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando rutinas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutinas de {nombre}</Text>
      <FlatList
        data={rutinas}
        keyExtractor={(item) => item.ID.toString()}
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
    backgroundColor: '#e6f0ff',
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
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ChildHomeScreen;
