import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SignOutRoutes } from './SignOutRoutes';
import { useAuth } from '../hooks/auth';
import { SignInRoutes } from './SignInRoutes';

export function Routes() {
  const { user } = useAuth()
  return (
    <NavigationContainer>
      {!!user.id
        ? <SignInRoutes />
        : <SignOutRoutes />
      }
      
    </NavigationContainer>
  )
}