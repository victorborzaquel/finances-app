import { StatusBar, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Providers } from './src/hooks/providers';
import { Routes } from './src/routes';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  const FONTS = {
    Inter_400Regular: require('./assets/fonts/Inter-Regular.ttf'),
    Inter_500Medium: require('./assets/fonts/Inter-Medium.ttf'),
    Inter_600SemiBold: require('./assets/fonts/Inter-SemiBold.ttf')
  }

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(FONTS);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Providers >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Routes />
      </Providers>
    </View>
  );
}
