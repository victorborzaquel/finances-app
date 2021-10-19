import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';

export function SignInRoutes() {
  const {Screen,Navigator} = createBottomTabNavigator();
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen
        name="Dashboard" 
        component={Dashboard} 
      />
    </Navigator>
  )
}