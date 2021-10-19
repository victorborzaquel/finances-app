import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Providers } from './src/hooks/providers';
import { Routes } from './src/routes';
import 'react-native-gesture-handler';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Providers>
      <StatusBar style="auto" />
      <Routes />
    </Providers>
  );
}
