import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { otherCategory } from '../../data/CategoryDefaultData';
import { ITransaction } from '../../global/interfaces';
import { useAuth } from '../../hooks/auth';
import { useData } from '../../hooks/data';
import { useLocalization } from '../../hooks/localization';
import { RootSignInNavigationProps } from '../../routes/SignInRoutes';
import { RootTransactionsNavigationProps } from '../../routes/TransactionsRoutes';
import { isSameDay } from '../../utils/dateUtils';
import { UIIconCircle } from '../UIIconCircle';

import {
  AccountTitle,
  Amount,
  CategoryTitle,
  Container,
  Description,
  Titles,
  Transaction,
} from './styles';

export function TransactionList({data}: {
  data: ITransaction[];
  // navigation: RootSignInNavigationProps<'DashboardRoutes'>;
}) {
  const { categories, accounts } = useAuth()
  const { toCurrency } = useLocalization()

  const navigation = useNavigation<RootSignInNavigationProps<'TransactionsRoutes'>>()

  function handleEditTransaction(transaction: ITransaction) {
    navigation.navigate('TransactionsRoutes', {screen: 'TransactionEdit', params: transaction})
  }
  return (
    <Container>
      {data.map(transaction => {4
      const category = categories.find(category => category.id === transaction.category_id)
      return (
        <Transaction key={transaction.id} onPress={() => handleEditTransaction(transaction)}>
        <Description>
          <UIIconCircle
            icon_category={!!category ? category.icon_name : otherCategory[transaction.type].icon_name}
            color_name={!!category ? category.color_name : otherCategory[transaction.type].color_name}
            size={40}
          />
          <Titles>
            <CategoryTitle>{transaction.description || categories.find(category => category.id === transaction.category_id)?.name || otherCategory[transaction.type].name}</CategoryTitle>
            <AccountTitle>{accounts.find(account => account.id === transaction.account_id)?.name}</AccountTitle>
          </Titles>
        </Description>

        <Amount type={transaction.type}>{toCurrency(transaction.amount)}</Amount>
      </Transaction>
      )})}
    </Container>
  );
}
