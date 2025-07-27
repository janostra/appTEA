import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AdultHomeScreen from '../screens/AdultHomeScreen';
import ChildHomeScreen from '../screens/ChildHomeScreen';
import RutinaScreen from '../screens/RutinaScreen';
import PerfilScreen from '../screens/PerfilScreen';
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
