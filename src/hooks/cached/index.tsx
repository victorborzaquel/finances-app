import React, { ReactNode, useCallback, useEffect } from 'react'
import { useAuth } from '../auth'
import { useLocalization } from '../localization';
import * as SplashScreen from 'expo-splash-screen';

export function CachedProvider({ children }: { children: ReactNode }) {
  const { authStorageLoaded } = useAuth();
  const { localizationLoaded } = useLocalization();


  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])

  const onLayout = useCallback(async () => {
    if (authStorageLoaded && localizationLoaded) await SplashScreen.hideAsync()
  }, [authStorageLoaded, localizationLoaded])

  if (!onLayout) return null

  return (
    <>
      {children}
    </>
  )
}