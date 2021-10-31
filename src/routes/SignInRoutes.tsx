import React from 'react'
import {
  createBottomTabNavigator,
  BottomTabNavigationProp
} from '@react-navigation/bottom-tabs'
import {
  RouteProp,
  NavigatorScreenParams,
  ParamListBase,
} from '@react-navigation/native'
import { DashboardRoutes } from './DashboardRoutes'
import { RootDashboardParamList } from './DashboardRoutes'
import styled, { useTheme } from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { AddTransaction } from '../screens/AddTransaction'
import { RFValue } from 'react-native-responsive-fontsize'
import { TabBarIcon, TabBarIconNameType } from '../components/TabBarIcon'
import { RootTransactionsParamList, TransactionsRoutes } from './TransactionsRoutes'
import { Charts } from '../screens/Charts'
import { Goals } from '../screens/Goals'

export type RootSignInParamList = {
  DashboardRoutes: NavigatorScreenParams<RootDashboardParamList>;
  TransactionsRoutes: NavigatorScreenParams<RootTransactionsParamList>;
  AddTransaction: undefined;
  Charts: undefined;
  Goals: undefined;
};

export type RootSignInNavigationProps<Screen extends keyof RootSignInParamList> = BottomTabNavigationProp<RootSignInParamList, Screen>;
export type RootSignInRouteProps<Screen extends keyof RootSignInParamList> = RouteProp<RootSignInParamList, Screen>;

export function SignInRoutes() {
  const { Screen, Navigator } = createBottomTabNavigator()
  const theme = useTheme()

  function selectTabBarIcon(route: RouteProp<ParamListBase, string>): TabBarIconNameType {
    switch (route.name) {
      case 'DashboardRoutes': return 'home'
      case 'TransactionsRoutes': return 'calendar'
      case 'AddTransaction': return 'plus'
      case 'Charts': return 'bar-chart'
      case 'Goals': return 'check-circle'
      default: return 'home'
    }
  }
  const tabBarStyle = {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.background_secondary,
    height: 50
  }

  return (
    <Navigator
      initialRouteName='DashboardRoutes'
      screenOptions={({ route }) => {
        const isTransaction = route.name === 'AddTransaction'

        return ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'main',
          tabBarInactiveTintColor: 'line',
          tabBarIcon: ({ color, ...rest }: any) => (
            <TabBarIcon
              {...rest}
              color={isTransaction ? 'background_secondary' : color}
              name={selectTabBarIcon(route)}
            />
          ),
          tabBarStyle,
          tabBarButton: ({ children, ...rest }: any) => isTransaction
            ? (
              <TabBarButton {...rest}>
                <TabBarBackground>
                  {children}
                </TabBarBackground>
              </TabBarButton>
            ) : (
              <BorderlessButton {...rest}>
                <TabBarHeight>
                  {children}
                </TabBarHeight>
              </BorderlessButton>
            ),
        })
      }}
    >
      <Screen
        name="DashboardRoutes"
        component={DashboardRoutes}
      />
      <Screen
        name="TransactionsRoutes"
        component={TransactionsRoutes}
      />
      <Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Screen
        name="Charts"
        component={Charts}
      />
      <Screen
        name="Goals"
        component={Goals}
      />
    </Navigator>
  )
}

const TabBarBackground = styled.View`
    width: 100%;
    height: 100%;
    border-radius: ${RFValue(33)}px;
    background-color: ${({ theme }) => theme.colors.main};
`;

const TabBarHeight = styled.View`
    width: 100%;
    height: 100%;
`;

const TabBarButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})`
  flex: 1;
  top: -${RFValue(20)}px;
  margin: 0 ${RFValue(10)}px;
  width: ${RFValue(66)}px;
  height: ${RFValue(66)}px;
`;
