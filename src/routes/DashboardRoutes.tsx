import React from 'react'
import { 
  createNativeStackNavigator, 
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Dashboard } from '../screens/Dashboard';
import { Settings } from '../screens/Settings';
import { EditDashboard } from '../screens/EditDashboard';
import { UserDetails } from '../screens/UserDetails';

export type RootDashboardParamList = {
  Dashboard: undefined;
  Settings: undefined;
  EditDashboard: undefined;
  UserDetails: undefined;
};

export type RootDashboardNavigationProps<Screen extends keyof RootDashboardParamList> = NativeStackNavigationProp<RootDashboardParamList, Screen>;
export type RootDashboardRouteProps<Screen extends keyof RootDashboardParamList> = RouteProp<RootDashboardParamList, Screen>;

export function DashboardRoutes() {
  const { Screen, Navigator } = createNativeStackNavigator<RootDashboardParamList>();
  return (
    <Navigator 
      initialRouteName='Dashboard'
      screenOptions={{
        headerShown: false
      }}>
      <Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Screen
        name="Settings"
        component={Settings}
      />
      <Screen
        name="EditDashboard"
        component={EditDashboard}
      />
      <Screen
        name="UserDetails"
        component={UserDetails}
      />
    </Navigator>
  )
}
