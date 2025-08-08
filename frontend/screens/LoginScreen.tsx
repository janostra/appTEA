import { useState } from 'react';
import api from '../services/api';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth, UserRole } from '../context/AuthContext';

import { API_BASE_URL } from '../config';

export default function LoginScreen() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rolId, setRolId] = useState(null)
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage(null);

    if (!pin) {
      setErrorMessage('Por favor ingresa tu PIN');
      return;
    }

    setLoading(true);

    try {
      // Autenticar usuario
      const authResponse = await fetch(`${API_BASE_URL}/api/usuarios/autenticar-adulto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: parseInt(pin, 10) }),
      });

      const authData = await authResponse.json();

      if (!authResponse.ok) {
        setErrorMessage(authData?.message || 'PIN incorrecto');
        setLoading(false);
        return;
      }

      // Obtener rol del usuario
      const rolResponse = await api.get(`http://localhost:3000/api/usuarios/rol`);
      const userRolID = rolResponse.data.rolID;
      console.log('Rol del usuario:', userRolID);
      setRolId(userRolID);

      // Guardar datos del usuario
      const userData = {
        id: authData.adultoID.toString(),
        name: authData.nombre || (userRolID === 2 ? 'Niño' : 'Adulto'),
        role: userRolID === 2 ? 'niño' : 'adulto' as UserRole,
        email: '',
        ID: authData.adultoID,
      };

      await login(userData);

      //Redirigir según el rol
      if (userRolID) {
        router.replace('/app'); // Vista de niño
      }
    } catch (error) {
      console.error('Error en login:', error);
      setErrorMessage('Ocurrió un error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍👩‍👧‍👦 Padres</Text>
      <Text style={styles.subtitle}>Gestiona las tareas de tus hijos</Text>

      <View style={styles.form}>
        <Text style={styles.label}>PIN</Text>
        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={text => {
            setPin(text);
            setErrorMessage(null);
          }}
          placeholder="Ingresa tu PIN"
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          editable={!loading}
          textContentType="oneTimeCode"
        />

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Verificando...' : 'Iniciar sesión'}
          </Text>
        </TouchableOpacity>
      </View>
      {rolId ?
        <TouchableOpacity style={styles.registerButton} onPress={goToRegister}>
          <Text style={styles.registerText}>¿No tenés cuenta? Registrarse</Text>
        </TouchableOpacity> : (null)}
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
    fontSize: 32,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 300,
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
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 8,
  },
  errorText: {
    color: 'red',
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    marginTop: 30,
  },
  registerText: {
    color: '#0066cc',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});