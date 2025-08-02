import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../context/AuthContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('adulto');
  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // Simular registro con diferentes roles
      let userData;
      
      if (selectedRole === 'adulto') {
        userData = {
          id: `adulto_${Date.now()}`,
          name: name,
          role: 'adulto' as UserRole,
          email: email,
          ID: Date.now()
        };
      } else {
        userData = {
          id: `niño_${Date.now()}`,
          name: name,
          role: 'niño' as UserRole,
          email: email,
          ID: Date.now()
        };
      }

      await login(userData);
      Alert.alert('Éxito', 'Cuenta creada correctamente');
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la cuenta');
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedRole === 'adulto' ? '👨‍👩‍👧‍👦 Registro Padres' : '👶 Registro Niños'}
      </Text>
      <Text style={styles.subtitle}>
        {selectedRole === 'adulto' 
          ? 'Crea tu cuenta para gestionar tareas' 
          : 'Únete para completar tus tareas'
        }
      </Text>

      <View style={styles.roleToggle}>
        <TouchableOpacity 
          style={[
            styles.roleButton, 
            selectedRole === 'adulto' && styles.roleButtonActive
          ]}
          onPress={() => setSelectedRole('adulto')}
        >
          <Text style={[
            styles.roleButtonText,
            selectedRole === 'adulto' && styles.roleButtonTextActive
          ]}>
            👨‍👩‍👧‍👦 Padres
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.roleButton, 
            selectedRole === 'niño' && styles.roleButtonActive
          ]}
          onPress={() => setSelectedRole('niño')}
        >
          <Text style={[
            styles.roleButtonText,
            selectedRole === 'niño' && styles.roleButtonTextActive
          ]}>
            👶 Niños
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={selectedRole === 'adulto' ? "Tu nombre completo" : "Tu nombre"}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="tu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
        />

        <Text style={styles.label}>Confirmar contraseña</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="••••••••"
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>
            {selectedRole === 'adulto' ? 'Crear cuenta' : '¡Registrarme!'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
        <Text style={styles.loginText}>
          ¿Ya tenés cuenta? Iniciar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f8ff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 28, 
    marginBottom: 10, 
    fontWeight: 'bold',
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center'
  },
  roleToggle: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    padding: 4,
    marginBottom: 30,
    width: '80%',
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#4CAF50',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#fff',
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
    color: '#333'
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
    fontSize: 16
  },
  button: { 
    backgroundColor: '#4CAF50', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 25, 
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginButton: { 
    marginTop: 30 
  },
  loginText: { 
    color: '#0066cc', 
    fontSize: 16,
    textDecorationLine: 'underline'
  },
});