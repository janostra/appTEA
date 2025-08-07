import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Image, FlatList } from 'react-native';
import api from '../../services/api';

export const RutinaDetalle = ({ id, onCerrar }: { id: number; onCerrar: () => void }) => {
  const [detalle, setDetalle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const res = await api.get(`http://localhost:3000/api/rutinas/${id}`);
        setDetalle(res.data.rutina);
      } catch (err) {
        console.error('Error al obtener detalle:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetalle();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#000" />;

  if (!detalle) return <Text>Error cargando detalle.</Text>;

  // Para formatear fecha de creación
  const fechaFormateada = new Date(detalle.fechaCreacion).toLocaleString();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        {detalle.nombre}
      </Text>

      {detalle.imagen ? (
        <Image
          source={{ uri: detalle.imagen }}
          style={{ width: '100%', height: 200, marginBottom: 15, borderRadius: 8 }}
          resizeMode="cover"
        />
      ) : null}

      <Text>Creada: {fechaFormateada}</Text>
      <Text>Estado ID: {detalle.estadoID}</Text>
      <Text>Usuario ID: {detalle.usuarioID}</Text>
      <Text>Activaciones programadas: {detalle.diaHoraActivaciones?.length ?? 0
}</Text>

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Pasos:</Text>

      {detalle.pasos.length > 0 ? (
        <FlatList
          data={detalle.pasos}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 15,
                padding: 10,
                backgroundColor: '#eee',
                borderRadius: 6,
              }}
            >
              <Text style={{ fontWeight: '600' }}>{item.descripcion}</Text>
              {item.imagen ? (
                <Image
                  source={{ uri: item.imagen }}
                  style={{ width: '100%', height: 150, marginTop: 8, borderRadius: 6 }}
                  resizeMode="cover"
                />
              ) : null}
            </View>
          )}
        />
      ) : (
        <Text>No hay pasos para mostrar.</Text>
      )}

      <Button title="Cerrar" onPress={onCerrar} />
    </View>
  );
};
