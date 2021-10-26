import AppLoading from 'expo-app-loading';
import React, { ReactNode } from 'react'
import { useAuth } from '../auth'
import { useLocalization } from '../localization';

export function CachedProvider({ children }: { children: ReactNode }) {
  const { authStorageLoaded } = useAuth();
  const { localizationLoaded } = useLocalization();
  if (!authStorageLoaded || !localizationLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      {children}
    </>
  )
}