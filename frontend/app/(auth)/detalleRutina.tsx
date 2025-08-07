import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Image, FlatList } from 'react-native';
import api from '../../services/api';
import { useRouter } from 'expo-router';

export const RutinaDetalle = ({ id, onCerrar }: { id: number; onCerrar: () => void }) => {
  const [detalle, setDetalle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const res = await api.get(`http://localhost:3000/api/rutinas/${id}`);
        console.log(res.data.rutina)
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

  const marcarPasoComoCompletado = async (pasoID: number) => {
    try {
      await api.patch(`http://localhost:3000/api/rutinas/pasos/${pasoID}/completar`);

      // Actualizo localmente sin await
      setDetalle((prevDetalle: any) => {
        const pasosActualizados = prevDetalle.pasos.map((paso: any) =>
          paso.ID === pasoID ? { ...paso, completado: true } : paso
        );
        return {
          ...prevDetalle,
          pasos: pasosActualizados,
        };
      });

      // Ahora obtengo el estado actualizado para chequear
      const pasosActualizados = detalle.pasos.map((paso: any) =>
        paso.ID === pasoID ? { ...paso, completado: true } : paso
      );
      const todosCompletos = pasosActualizados.every((paso: any) => paso.completado);

      if (todosCompletos) {
        try {
          await api.patch(`http://localhost:3000/api/rutinas/${detalle.ID}/completar`);
          console.log('Rutina completada automáticamente');
          router.push('/app');
        } catch (err) {
          console.error('Error al completar rutina:', err);
        }
      }
    } catch (error) {
      console.error('Error al marcar paso como completado:', error);
    }
  };


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
      <Text>Activaciones programadas: {detalle.diaHoraActivaciones?.length ?? 0}</Text>

      {detalle.diaHoraActivaciones?.map((activacion: { diaSemana: string; horaActivacion: string }, index: number) => (
        <Text key={index}>
          {activacion.diaSemana} -{' '}
          {new Date(activacion.horaActivacion).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      ))}

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Pasos:</Text>

      {detalle.pasos.length > 0 ? (
        <FlatList
          data={[...detalle.pasos].sort((a, b) => a.ID - b.ID)} // <- esto los ordena de menor a mayor ID
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
              <Text
                style={{
                  fontWeight: '600',
                  textDecorationLine: item.completado ? 'line-through' : 'none',
                  color: item.completado ? '#999' : '#000',
                }}
              >
                {item.descripcion}
              </Text>

              {item.imagen ? (
                <Image
                  source={{ uri: item.imagen }}
                  style={{ width: '100%', height: 150, marginTop: 8, borderRadius: 6 }}
                  resizeMode="cover"
                />
              ) : null}

              {!item.completado && (
                <Button
                  title="Completado"
                  onPress={() => marcarPasoComoCompletado(item.ID)}
                  color="green"
                />
              )}

              {item.completado && (
                <Text style={{ marginTop: 8, color: 'green', fontWeight: 'bold' }}>✅ Completado</Text>
              )}
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
