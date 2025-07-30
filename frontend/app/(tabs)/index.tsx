import { View, Text, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido, {user?.name}</Text>
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}
