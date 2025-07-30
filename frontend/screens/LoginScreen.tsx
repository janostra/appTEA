import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (pin === confirmPin && pin.length > 0) {
      login({ id: '123', name: 'Usuario de prueba' });
      router.replace('/');
    } else {
      alert('Los PIN no coinciden o están vacíos');
    }
  };

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.label}>Introduzca un pin</Text>
      <TextInput
        style={styles.input}
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={goToRegister}>
        <Text style={styles.registerText}>¿No tenés cuenta? Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d0ebe9', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, marginBottom: 40, fontWeight: 'bold' },
  label: { alignSelf: 'flex-start', marginLeft: 20, fontSize: 16, marginBottom: 5 },
  input: { width: '90%', height: 40, borderColor: '#999', borderWidth: 1, borderRadius: 6, marginBottom: 20, paddingHorizontal: 10, backgroundColor: '#fff' },
  button: { backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 20, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
  registerButton: { marginTop: 20 },
  registerText: { color: '#0066cc', fontSize: 16 },
});
