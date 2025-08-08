import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type Props = {
  descripcion: string;
  hora: string; // DateTime string
  diaSemana?: string;
  sonido?: string;
  color?: string;
  onCerrar: () => void;
};

const RecordatorioActivo = ({
  descripcion,
  hora,
  diaSemana,
  sonido,
  color,
  onCerrar,
}: Props) => {
  const backgroundColor = color || '#fff';

  const horaFormateada = new Date(hora).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor }]}>
        <Text style={styles.titulo}>🧠 Recordatorio</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>
        <Text style={styles.detalle}>🕒 {horaFormateada}</Text>
        {diaSemana && <Text style={styles.detalle}>📅 {diaSemana}</Text>}
        {sonido && <Text style={styles.detalle}>🔊 Sonido: {sonido}</Text>}
        <View style={styles.boton}>
          <Button title="Cerrar" onPress={onCerrar} color="#333" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  card: {
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    elevation: 10,
    width: '80%',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  detalle: {
    fontSize: 14,
    marginBottom: 5,
  },
  boton: {
    marginTop: 15,
    width: '60%',
  },
});

export default RecordatorioActivo;
