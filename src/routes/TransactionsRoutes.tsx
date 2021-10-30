import React from 'react'
import { 
  createNativeStackNavigator, 
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Transactions } from '../screens/Transactions';
import { TransactionEdit } from '../screens/TransactionEdit';
import { IFilter, ITransaction, ITransfer } from '../global/interfaces';
import { TransferEdit } from '../screens/TransferEdit';


export type RootTransactionsParamList = {
  Transaction: IFilter | undefined;
  TransactionEdit: {transactionId: ITransaction['id']};
  TransferEdit: {transferId: ITransfer['id']};
};

export type RootTransactionsNavigationProps<Screen extends keyof RootTransactionsParamList> = NativeStackNavigationProp<RootTransactionsParamList, Screen>;
export type RootTransactionsRouteProps<Screen extends keyof RootTransactionsParamList> = RouteProp<RootTransactionsParamList, Screen>;

export function TransactionsRoutes() {
  const { Screen, Navigator } = createNativeStackNavigator<RootTransactionsParamList>();

  return (
    <Navigator
      initialRouteName='Transaction'
      screenOptions={{headerShown: false}}
    >
      <Screen
        name="Transaction"
        component={Transactions}
      />
      <Screen
        name="TransactionEdit"
        component={TransactionEdit}
      />
      <Screen
        name="TransferEdit"
        component={TransferEdit}
      />
    </Navigator>
  )
}
