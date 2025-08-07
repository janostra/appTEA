import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../services/api';

interface Rutina {
  ID: number;
  nombre: string;
  fechaCreacion?: string;
  imagen?: string;
  estadoID: number;   // 1=activa, 2=completada, 3=inactiva/oculta, 4=cancelada
  activa: boolean;
  completada: boolean;
}

export default function ListaRutinasScreen() {
  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [filtro, setFiltro] = useState<'todas' | 'activas' | 'inactivas' | 'completadas'>('todas');
  const router = useRouter();

  useEffect(() => {
    fetchRutinas();
  }, []);

  const fetchRutinas = async () => {
    try {
      setLoading(true);
      const res = await api.get('http://localhost:3000/api/rutinas');
      console.log('Rutinas recibidas:', res.data); // <-- AQUÍ
      setRutinas(
        res.data.map((r: any) => ({
          ...r,
          activa: r.estadoID === 1 || (r.estado && r.estado.nombre?.toLowerCase() === 'activa'),
          completada: r.estadoID === 2 || r.estado?.nombre?.toLowerCase() === 'completada',
        }))
      );
    } catch (err) {
      console.error('Error al obtener rutinas:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleEstado = async (id: number, estadoID: number) => {
    try {
      setUpdatingId(id);
      const nuevoEstadoID = estadoID === 1 ? 3 : 1;
      await api.patch(`/api/rutinas/${id}/estado`, { estadoID: nuevoEstadoID });
      setRutinas(prev => prev.map(r => r.ID === id ? { ...r, estadoID: nuevoEstadoID } : r));
    } finally {
      setUpdatingId(null);
    }
  };

  const rutinasFiltradas = rutinas.filter((r) => {
    if (filtro === 'activas') return r.estadoID === 1;
    if (filtro === 'completadas') return r.estadoID === 2;
    if (filtro === 'inactivas') return r.estadoID === 3;
    return true;
  });

  const renderItem = ({ item }: { item: Rutina }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      {item.fechaCreacion && (
        <Text style={styles.fecha}>Creada: {new Date(item.fechaCreacion).toLocaleDateString()}</Text>
      )}
      <TouchableOpacity

        style={[styles.estadoButton, { backgroundColor: item.estadoID === 1 ? '#d9534f' : '#4CAF50' }]}
        onPress={() => toggleEstado(item.ID, item.estadoID)}

        disabled={updatingId === item.ID}
      >
        {updatingId === item.ID ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.estadoButtonText}>
            {item.estadoID === 1 ? 'Ocultar ❌' : 'Activar ✅'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.volver}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Rutinas creadas</Text>

      {/* 🔍 Filtros como botones */}
      <View style={styles.filtroContainer}>
        <TouchableOpacity
          style={[styles.filtroButton, filtro === 'todas' && styles.filtroActivo]}
          onPress={() => setFiltro('todas')}
        >
          <Text style={[styles.filtroText, filtro === 'todas' && styles.filtroTextActivo]}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtroButton, filtro === 'activas' && styles.filtroActivo]}
          onPress={() => setFiltro('activas')}
        >
          <Text style={[styles.filtroText, filtro === 'activas' && styles.filtroTextActivo]}>Activas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtroButton, filtro === 'inactivas' && { backgroundColor: 'red' }]}
          onPress={() => setFiltro('inactivas')}
        >
          <Text style={[styles.filtroText, filtro === 'inactivas' && styles.filtroTextActivo]}>Inactivas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtroButton, filtro === 'completadas' && { backgroundColor: '#1976D2' }]}
          onPress={() => setFiltro('completadas')}
        >
          <Text style={[styles.filtroText, filtro === 'completadas' && styles.filtroTextActivo]}>Completadas</Text>
        </TouchableOpacity>
      </View>


      {rutinasFiltradas.length === 0 && !loading && (
        <Text style={styles.emptyText}>No hay rutinas que coincidan con el filtro.</Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={rutinasFiltradas}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/crearRutina')}>
        <Text style={styles.buttonText}>➕ Crear rutina</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  volver: { fontSize: 16, color: '#007BFF', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filtroButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  filtroActivo: {
    backgroundColor: '#4CAF50',
  },
  filtroText: {
    fontSize: 16,
    color: '#333',
  },
  filtroTextActivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    padding: 16,
    backgroundColor: '#e6f0ff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  fecha: { fontSize: 14, color: '#666', marginTop: 4 },
  estadoButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  estadoButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#999', marginVertical: 20 },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});