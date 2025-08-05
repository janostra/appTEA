// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';
// import api from '../../services/api';

// interface Rutina {
//   ID: number;
//   nombre: string;
//   fechaCreacion?: string;
//   imagen?: string;
// }

// export default function ListaRutinasScreen() {
//   const [rutinas, setRutinas] = useState<Rutina[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchRutinas = async () => {
//       try {
//         const res = await api.get('/rutinas'); // endpoint general
//         setRutinas(res.data);
//       } catch (err) {
//         console.error('Error al obtener rutinas:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRutinas();
//   }, []);

//   const renderItem = ({ item }: { item: Rutina }) => (
//     <TouchableOpacity style={styles.card} onPress={() => {}}>
//       <Text style={styles.nombre}>{item.nombre}</Text>
//       {item.fechaCreacion && (
//         <Text style={styles.fecha}>Creada: {new Date(item.fechaCreacion).toLocaleDateString()}</Text>
//       )}
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Rutinas creadas</Text>

//       {rutinas.length === 0 && !loading && (
//         <Text style={styles.emptyText}>No hay rutinas creadas aún.</Text>
//       )}

//       <FlatList
//         data={rutinas}
//         keyExtractor={(item) => item.ID.toString()}
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//       />

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push('/(tabs)/crearRutina')}
//       >
//         <Text style={styles.buttonText}>➕ Crear rutina</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     paddingTop: 60,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   card: {
//     padding: 16,
//     backgroundColor: '#e6f0ff',
//     borderRadius: 10,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   nombre: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   fecha: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   emptyText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#999',
//     marginVertical: 20,
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../services/api';

interface Rutina {
  ID: number;
  nombre: string;
  fechaCreacion?: string;
  imagen?: string;
}

export default function ListaRutinasScreen() {
  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
      const res = await fetch('http://localhost:3000/api/rutinas');
      
      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);

      const data = await res.json(); // 👈 ¡Acá está la magia!
      console.log('Rutinas:', data);
      setRutinas(data);
      } catch (err) {
        console.error('Error al obtener rutinas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRutinas();
  }, []);

  const renderItem = ({ item }: { item: Rutina }) => (
    <TouchableOpacity style={styles.card} onPress={() => {}}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      {item.fechaCreacion && (
        <Text style={styles.fecha}>Creada: {new Date(item.fechaCreacion).toLocaleDateString()}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.volver}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Rutinas creadas</Text>

      {rutinas.length === 0 && !loading && (
        <Text style={styles.emptyText}>No hay rutinas creadas aún.</Text>
      )}

      <FlatList
        data={rutinas}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/crearRutina')}
      >
        <Text style={styles.buttonText}>➕ Crear rutina</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  volver: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 16,
    backgroundColor: '#e6f0ff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  fecha: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
