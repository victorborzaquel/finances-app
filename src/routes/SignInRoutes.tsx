import React from 'react'
import { 
  createBottomTabNavigator, 
  BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { 
  RouteProp, 
  NavigatorScreenParams, 
  ParamListBase 
} from '@react-navigation/native';
import { DashboardRoutes } from './DashboardRoutes';
import { RootDashboardParamList } from './DashboardRoutes'
import { Test } from '../screens/Test';
import styled, { css } from 'styled-components/native';
import { ThemeColorType } from '../global/interfaces';
import { BorderlessButton } from 'react-native-gesture-handler';
import { AddTransaction } from '../screens/AddTransaction';
import { RFValue } from 'react-native-responsive-fontsize';
import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { TabBarIcon, TabBarIconNameType } from '../components/TabBarIcon';
import { Transactions } from '../screens/Transactions';
import { RootTransactionsParamList, TransactionsRoutes } from './TransactionsRoutes';

export type RootSignInParamList = {
  DashboardRoutes: NavigatorScreenParams<RootDashboardParamList>;
  TransactionsRoutes: NavigatorScreenParams<RootTransactionsParamList>;
  AddTransaction: undefined;
};

export type RootDashboardNavigationProps<Screen extends keyof RootSignInParamList> = BottomTabNavigationProp<RootSignInParamList, Screen>;
export type RootDashboardRouteProps<Screen extends keyof RootSignInParamList> = RouteProp<RootSignInParamList, Screen>;

export function SignInRoutes() {
  const {Screen,Navigator} = createBottomTabNavigator();

  function selectTabBarIcon(route: RouteProp<ParamListBase, string>): TabBarIconNameType {
    switch (route.name) {
      case 'DashboardRoutes': return 'home';
      case 'TransactionsRoutes': return 'calendar';
      case 'AddTransaction': return 'plus';
      case 'Charts': return 'bar-chart';
      case 'Goals': return 'check-circle';
      default : return 'home';
    }
  }

  return (
    <Navigator 
      initialRouteName='DashboardRoutes'
      screenOptions={({route}) => {
        const isTransaction = route.name === 'AddTransaction';
        return({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: 'main' as ThemeColorType,
          tabBarInactiveTintColor: 'line' as ThemeColorType,
          tabBarIcon: ({color, ...rest}: any) => (
            <TabBarIcon 
              {...rest}
              color={isTransaction ? 'background_secondary' : color}  
              name={selectTabBarIcon(route)} 
            />
          ),
          tabBarButton: ({children, ...rest}: any) => (
            <TabBarBackground isTransaction={isTransaction}>
              <TabBarButton {...rest}>
                {children}
              </TabBarButton>
            </TabBarBackground>
          ),
      })}}
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
        component={Test} 
      />
      <Screen
        name="Goals" 
        component={Test} 
      />
    </Navigator>
  )
}

const TabBarBackground = styled.View<{isTransaction: boolean}>`
${({isTransaction}) => isTransaction 
  ? css`
    top: -${RFValue(18)}px;
    width: ${RFValue(66)}px;
    height: ${RFValue(66)}px;
    margin: 0 ${RFValue(6)}px;
    border-radius: ${RFValue(33)}px;
    background-color: ${({theme}) => theme.colors.main};`
  : css` flex: 1;`
}
`;

const TabBarButton = styled(BorderlessButton)`
  flex: 1;
`;

const styles = StyleSheet.create({
	tabBarStyle: {
		position: 'absolute',
		height: RFValue(65),
		left: 10,
		right: 10,
		bottom: getBottomSpace() + 10,
		borderRadius: 15,
		backgroundColor: '#ffffff',

		shadowColor: '#7F5DF0',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		elevation: 5,
		shadowRadius: 3.5,
		shadowOpacity: 0.25,
	},
});