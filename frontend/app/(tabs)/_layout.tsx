// app/(tabs)/_layout.tsx
import { Redirect, Slot } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function TabsLayout() {
  const { user } = useAuth();

  if (!user) return <Redirect href="/login" />;

  return <Slot />;
}
