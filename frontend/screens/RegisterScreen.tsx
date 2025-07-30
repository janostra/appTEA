import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = () => {
    if (pin === confirmPin && pin.length > 0) {
      login({ id: '123', name: 'Nuevo usuario' });
      router.replace('/');
    } else {
      alert('Los PIN no coinciden o están vacíos');
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.label}>Crea un PIN</Text>
      <TextInput
        style={styles.input}
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        keyboardType="number-pad"
      />
      <Text style={styles.label}>Confirma tu PIN</Text>
      <TextInput
        style={styles.input}
        value={confirmPin}
        onChangeText={setConfirmPin}
        secureTextEntry
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={goToLogin}>
        <Text style={styles.registerText}>¿Ya tenés cuenta? Iniciar sesión</Text>
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