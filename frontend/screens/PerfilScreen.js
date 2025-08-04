// //===============================================================================================
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
// import { useAuth } from '../context/AuthContext';
// import api from '../services/api';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// const PerfilScreen = ({ route }) => {
//   const { user, logout, isAdult, isChild } = useAuth();
//   const router = useRouter();

//   const [nombre, setNombre] = useState(user?.name || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [loading, setLoading] = useState(false);

//   const infante = route?.params?.infante;

//   const guardarCambios = async () => {
//     try {
//       setLoading(true);

//       if (infante && isAdult) {
//         await api.put(`/infantes/${infante.infanteID}`, {
//           nombre,
//           nivel: email,
//         });
//         Alert.alert('Éxito', 'Perfil del infante actualizado correctamente.');
//       } else if (isChild) {
//         await api.put(`/niños/${user?.ID}`, {
//           nombre,
//           email,
//         });
//         Alert.alert('Éxito', 'Tu perfil se actualizó correctamente.');
//       } else if (isAdult) {
//         await api.put(`/adultos/${user?.ID}`, {
//           nombre,
//           email,
//         });
//         Alert.alert('Éxito', 'Tu perfil se actualizó correctamente.');
//       }
//     } catch (err) {
//       console.error('Error al actualizar perfil:', err);
//       Alert.alert('Error', 'No se pudo actualizar el perfil.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.replace('/login'); // reemplazamos navegación manual
//   };

//   const getTitle = () => {
//     if (infante && isAdult) {
//       return `Perfil de ${infante.nombre}`;
//     } else if (isChild) {
//       return 'Mi Perfil (Niño)';
//     } else {
//       return 'Mi Perfil (Adulto)';
//     }
//   };

//   const getAvatar = () => {
//     if (infante && isAdult) {
//       return infante.avatar || 'https://via.placeholder.com/100';
//     } else {
//       return user?.avatar || 'https://via.placeholder.com/100';
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header con botón de volver */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#4f46e5" />
//         </TouchableOpacity>
//         <Text style={styles.title}>{getTitle()}</Text>
//         <View style={styles.headerSpacer} />
//       </View>

//       <Image source={{ uri: getAvatar() }} style={styles.avatar} />

//       <Text style={styles.label}>Nombre</Text>
//       <TextInput
//         style={styles.input}
//         value={nombre}
//         onChangeText={setNombre}
//         placeholder="Ingresa tu nombre"
//       />

//       <Text style={styles.label}>
//         {infante && isAdult ? 'Nivel' : 'Email'}
//       </Text>
//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholder={infante && isAdult ? 'Nivel del infante' : 'tu@email.com'}
//         keyboardType={infante && isAdult ? 'default' : 'email-address'}
//       />

//       <TouchableOpacity
//         style={styles.saveButton}
//         onPress={guardarCambios}
//         disabled={loading}
//       >
//         <Text style={styles.saveButtonText}>
//           {loading ? 'Guardando...' : 'Guardar cambios'}
//         </Text>
//       </TouchableOpacity>

//       {isAdult && !infante && (
//         <TouchableOpacity
//           style={styles.changeRoleButton}
//           onPress={async () => {
//             try {
//               const response = await api.put('/usuario/alternar-rol', {
//                 usuarioID: user.ID,
//                 pin: user.pin || 1234,
//               });

//               if (response.data && response.data.rol === 'infante') {
//                 Alert.alert('Éxito', 'Cambiado a modo niño');
//                 router.replace('/child-home');
//               } else {
//                 Alert.alert('Error', 'No se pudo cambiar al modo niño.');
//               }
//             } catch (error) {
//               console.error('Error al cambiar de rol:', error);
//               Alert.alert('Error', 'No se pudo cambiar el rol.');
//             }
//           }}
//         >
//           <Text style={styles.changeRoleButtonText}>Cambiar a usuario niño</Text>
//         </TouchableOpacity>
//       )}

//       {isChild && (
//         <View style={styles.infoSection}>
//           <Text style={styles.infoTitle}>Información del Niño</Text>
//           <Text style={styles.infoText}>• Puedes ver tus rutinas activas</Text>
//           <Text style={styles.infoText}>• Marca pasos como completados</Text>
//           <Text style={styles.infoText}>• Gana puntos por completar rutinas</Text>
//         </View>
//       )}

//       {isAdult && !infante && (
//         <View style={styles.infoSection}>
//           <Text style={styles.infoTitle}>Funciones de Adulto</Text>
//           <Text style={styles.infoText}>• Crear rutinas para niños</Text>
//           <Text style={styles.infoText}>• Gestionar infantes</Text>
//           <Text style={styles.infoText}>• Crear recordatorios</Text>
//         </View>
//       )}

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     width: '100%',
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   headerSpacer: {
//     width: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     textAlign: 'center',
//     flex: 1,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 24,
//   },
//   label: {
//     alignSelf: 'flex-start',
//     marginBottom: 4,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     marginTop: 16,
//     width: '100%',
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   changeRoleButton: {
//     backgroundColor: '#2196F3',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     marginTop: 10,
//     width: '100%',
//     alignItems: 'center',
//   },
//   changeRoleButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   infoSection: {
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 20,
//     width: '100%',
//   },
//   infoTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   infoText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   logoutButton: {
//     backgroundColor: '#d9534f',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     marginTop: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   logoutButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default PerfilScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PerfilScreen = ({ route }) => {
  const { user, logout, isAdult, isChild } = useAuth();
  const router = useRouter();

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const infante = route?.params?.infante;

  const guardarCambios = async () => {
    try {
      setLoading(true);

      if (infante && isAdult) {
        await api.put(`/usuario/infante/${infante.id}`, {
          nombre,
          nivel: email,
        });
        Alert.alert('Éxito', 'Perfil del infante actualizado correctamente.');
      } else if (isChild) {
        await api.put(`/usuario/niño/${user.id}`, {
          nombre,
          email,
        });
        Alert.alert('Éxito', 'Tu perfil se actualizó correctamente.');
      } else if (isAdult) {
        await api.put(`/usuario/adulto/${user.id}`, {
          nombre,
          email,
        });
        Alert.alert('Éxito', 'Tu perfil se actualizó correctamente.');
      }
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const getTitle = () => {
    if (infante && isAdult) {
      return `Perfil de ${infante.nombre}`;
    } else if (isChild) {
      return 'Mi Perfil (Niño)';
    } else {
      return 'Mi Perfil (Adulto)';
    }
  };

  const getAvatar = () => {
    if (infante && isAdult) {
      return infante.avatar || 'https://via.placeholder.com/100';
    } else {
      return user?.avatar || 'https://via.placeholder.com/100';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4f46e5" />
        </TouchableOpacity>
        <Text style={styles.title}>{getTitle()}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Image source={{ uri: getAvatar() }} style={styles.avatar} />

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingresa tu nombre"
      />

      <Text style={styles.label}>
        {infante && isAdult ? 'Nivel' : 'Email'}
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder={infante && isAdult ? 'Nivel del infante' : 'tu@email.com'}
        keyboardType={infante && isAdult ? 'default' : 'email-address'}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={guardarCambios}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Text>
      </TouchableOpacity>

      {isAdult && !infante && (
        <TouchableOpacity
          style={styles.changeRoleButton}
          onPress={async () => {
            try {
              const response = await api.put('/usuario/alternar-rol', {
                usuarioId: user.id,
                pin: user.pin || 1234,
              });

              if (response.data?.rol === 'infante') {
                Alert.alert('Éxito', 'Cambiado a modo niño');
                router.replace('/child-home');
              } else {
                Alert.alert('Error', 'No se pudo cambiar al modo niño.');
              }
            } catch (error) {
              console.error('Error al cambiar de rol:', error);
              Alert.alert('Error', 'No se pudo cambiar el rol.');
            }
          }}
        >
          <Text style={styles.changeRoleButtonText}>Cambiar a usuario niño</Text>
        </TouchableOpacity>
      )}

      {(isAdult || isChild) && (
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>
            {isChild ? 'Información del Niño' : 'Funciones de Adulto'}
          </Text>
          {isChild ? (
            <>
              <Text style={styles.infoText}>• Puedes ver tus rutinas activas</Text>
              <Text style={styles.infoText}>• Marca pasos como completados</Text>
              <Text style={styles.infoText}>• Gana puntos por completar rutinas</Text>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>• Crear rutinas para niños</Text>
              <Text style={styles.infoText}>• Gestionar infantes</Text>
              <Text style={styles.infoText}>• Crear recordatorios</Text>
            </>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerSpacer: {
    width: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 24,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeRoleButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  changeRoleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PerfilScreen;
