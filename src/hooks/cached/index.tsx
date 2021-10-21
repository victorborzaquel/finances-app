import AppLoading from 'expo-app-loading';
import React, { ReactNode } from 'react'
import { useAuth } from '../auth'

export function CachedProvider({ children }: { children: ReactNode }) {
  const { authStorageLoaded } = useAuth();
  if (!authStorageLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      {children}
    </>
  )
}