import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!pin || !confirmPin) {
      Alert.alert('Error', 'Por favor ingresa el PIN y la confirmación');
      return;
    }

    if (pin !== confirmPin) {
      Alert.alert('Error', 'Los PIN no coinciden');
      return;
    }

    if (pin.length < 4) {
      Alert.alert('Error', 'El PIN debe tener al menos 4 caracteres');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rol: 'adulto',
          pin,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Error en el registro');
      }

      const user = await response.json();

      await login({
        id: user.ID,
        name: user.nombre || 'Usuario',
        role: 'adulto',
        email: user.email || '',
      });

      Alert.alert('Éxito', 'Cuenta creada correctamente');
      router.replace('/');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'No se pudo crear la cuenta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro para Adultos</Text>

      <View style={styles.form}>
        <Text style={styles.label}>PIN</Text>
        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={setPin}
          secureTextEntry
          keyboardType="numeric"
          placeholder="Ingresa tu PIN"
        />

        <Text style={styles.label}>Confirmar PIN</Text>
        <TextInput
          style={styles.input}
          value={confirmPin}
          onChangeText={setConfirmPin}
          secureTextEntry
          keyboardType="numeric"
          placeholder="Confirma tu PIN"
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f8ff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
  },
  title: { 
    fontSize: 28, 
    marginBottom: 20, 
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  label: { 
    alignSelf: 'flex-start', 
    marginLeft: 10, 
    fontSize: 16, 
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
  },
  input: { 
    width: '100%', 
    height: 50, 
    borderColor: '#ddd', 
    borderWidth: 1, 
    borderRadius: 10, 
    marginBottom: 20, 
    paddingHorizontal: 15, 
    backgroundColor: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  button: { 
    backgroundColor: '#4CAF50', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 25, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    marginTop: 10,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
