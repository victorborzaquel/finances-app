import React from 'react'
import { 
  createNativeStackNavigator, 
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Transactions } from '../screens/Transactions';
import { TransactionEdit } from '../screens/TransactionEdit';
import { ITransaction } from '../global/interfaces';

export type RootTransactionsParamList = {
  Transaction: undefined;
  TransactionEdit: ITransaction;
};

export type RootTransactionsNavigationProps<Screen extends keyof RootTransactionsParamList> = NativeStackNavigationProp<RootTransactionsParamList, Screen>;
export type RootTransactionsRouteProps<Screen extends keyof RootTransactionsParamList> = RouteProp<RootTransactionsParamList, Screen>;

export function TransactionsRoutes() {
  const { Screen, Navigator } = createNativeStackNavigator<RootTransactionsParamList>();
  return (
    <Navigator
      initialRouteName='Transaction'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="Transaction"
        component={Transactions}
      />
      <Screen
        name="TransactionEdit"
        component={TransactionEdit}
      />
    </Navigator>
  )
}
