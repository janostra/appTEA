import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AdultHomeScreen from '../screens/AdultHomeScreen.tsx';
import ChildHomeScreen from '../screens/ChildHomeScreen.tsx';
import RutinaScreen from '../screens/RutinaScreen';
import PerfilScreen from '../screens/PerfilScreen';
<<<<<<< HEAD
import AddReminderScreen from '../screens/addReminderScreen.tsx'
=======
import AddReminderScreen from '../screens/addReminderScreen'
>>>>>>> 836f31cfd9885fc3bc6e6457e252fbcdfa6f2b6b
import EditReminderScreen from '../screens/editReminderScreen'
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="AdultHome" component={AdultHomeScreen} />
            <Stack.Screen name="ChildHome" component={ChildHomeScreen} />
            <Stack.Screen name="Rutina" component={RutinaScreen} />
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="Recordatorio" component={AddReminderScreen}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
