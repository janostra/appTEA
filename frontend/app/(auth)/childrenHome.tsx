import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Modal, Button } from 'react-native';
import api from '../../services/api';
import { RutinaDetalle } from './detalleRutina';
import { useRouter } from 'expo-router';

type Rutina = {
    ID: number;
    nombre: string;
};

const HomeScreenChildren = () => {
    const [rutinas, setRutinas] = useState<Rutina[]>([]);
    const [loading, setLoading] = useState(true);
    const [rutinaSeleccionada, setRutinaSeleccionada] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchRutinas();
    }, []);

    const fetchRutinas = async () => {
        try {
            setLoading(true);
            const res = await api.get('http://localhost:3000/api/rutinas');
            // Filtra solo las rutinas activas (estadoId === 1)
            const rutinasActivas = res.data.filter((rutina: any) => rutina.estadoID === 1);
            setRutinas(rutinasActivas);
        } catch (err) {
            console.error('Error al obtener rutinas:', err);
        } finally {
            setLoading(false);
        }
    };

    const irAConfiguracion = () => {
        router.push('/perfil');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.configBoton}
                onPress={irAConfiguracion}
                activeOpacity={0.8}
                accessibilityLabel="Ir a configuración"
            >
                <Text style={styles.configTexto}>⚙️</Text>
            </TouchableOpacity>

            <Text style={styles.header}>👦 Mis Rutinas</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 40 }} />
            ) : (
                <>
                    {rutinas.length === 0 ? (
                        <Text style={{ marginTop: 20, color: '#555' }}>No hay rutinas disponibles.</Text>
                    ) : (
                        <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center' }}>
                            {rutinas.map((rutina) => (
                                <TouchableOpacity
                                    key={rutina.ID}
                                    style={styles.rutina}
                                    onPress={() => setRutinaSeleccionada(rutina.ID)}
                                >
                                    <Text style={styles.rutinaTexto}>📌 {rutina.nombre}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </>
            )}
   
            

            {/* Modal con detalle */}
            <Modal
                visible={rutinaSeleccionada !== null}
                animationType="slide"
                onRequestClose={() => setRutinaSeleccionada(null)}
            >
                {rutinaSeleccionada && (
                    <RutinaDetalle id={rutinaSeleccionada} onCerrar={() => setRutinaSeleccionada(null)} />
                )}
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d1f0f6',
        paddingTop: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
        position: 'relative',
    },
    configBoton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    configTexto: {
        fontSize: 22,
        fontWeight: '700',
        color: '#007BFF',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    rutina: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        elevation: 2,
    },
    rutinaTexto: {
        fontSize: 20,
        fontWeight: '600',
        color: '#444',
    },
    ayudaBoton: {
        backgroundColor: '#ffcc00',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginTop: 40,
    },
    ayudaTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default HomeScreenChildren;
