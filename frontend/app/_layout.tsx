import React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { RutinaProvider } from '../context/RutinaContext';

export default function Layout() {
  return (
    <RutinaProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </RutinaProvider>
  );
}
