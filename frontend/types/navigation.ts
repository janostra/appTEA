import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Data interfaces
export interface Infante {
  infanteID: number;
  nombre: string;
  nivel?: {
    descripcion: string;
  };
}

export interface Rutina {
  ID: number;
  nombre: string;
  descripcion?: string;
}

export interface Color {
  nombre: string;
  valor: string | null;
}

export interface Recordatorio {
  routineId: number;
  frequency: string;
  day?: string;
  time: string;
  description: string;
  selectedColor: string | null;
  sound: string;
}

export interface User {
  id: string;
  name: string;
  ID?: number; // For backward compatibility with existing code
}

// Navigation stack parameter list
export interface RootStackParamList {
  AdultHome: undefined;
  ChildHome: { infante: Infante };
  Rutina: { rutina: Rutina };
  Perfil: undefined;
  Recordatorio: undefined;
  Login: undefined;
}

// Navigation prop types
export type AdultHomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdultHome'>;
export type AdultHomeScreenRouteProp = RouteProp<RootStackParamList, 'AdultHome'>;

export type ChildHomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChildHome'>;
export type ChildHomeScreenRouteProp = RouteProp<RootStackParamList, 'ChildHome'>;

// Screen prop interfaces
export interface AdultHomeScreenProps {
  navigation: AdultHomeScreenNavigationProp;
  route: AdultHomeScreenRouteProp;
}

export interface ChildHomeScreenProps {
  navigation: ChildHomeScreenNavigationProp;
  route: ChildHomeScreenRouteProp;
} 