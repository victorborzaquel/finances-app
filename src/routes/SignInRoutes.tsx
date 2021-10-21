import React from 'react'
import { 
  createBottomTabNavigator, 
  BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, NavigatorScreenParams } from '@react-navigation/native';
import { DashboardRoutes } from './DashboardRoutes';
import { RootDashboardParamList } from './DashboardRoutes'

export type RootSignInParamList = {
  DashboardRoutes: NavigatorScreenParams<RootDashboardParamList>;
};

export type RootDashboardNavigationProps<Screen extends keyof RootSignInParamList> = BottomTabNavigationProp<RootSignInParamList, Screen>;
export type RootDashboardRouteProps<Screen extends keyof RootSignInParamList> = RouteProp<RootSignInParamList, Screen>;

export function SignInRoutes() {
  const {Screen,Navigator} = createBottomTabNavigator();
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen
        name="DashboardRoutes" 
        component={DashboardRoutes} 
      />
    </Navigator>
  )
}