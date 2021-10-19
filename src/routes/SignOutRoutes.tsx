import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';

export function SignOutRoutes() {
  const {Screen,Navigator} = createNativeStackNavigator();
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen
        name="Login" 
        component={Login} 
      />
    </Navigator>
  )
}