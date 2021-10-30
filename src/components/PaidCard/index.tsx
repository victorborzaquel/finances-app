import { TransactionType } from '../../global/interfaces';
import { useAuth } from '../../hooks/auth';
import { RootSignInNavigationProps } from '../../routes/SignInRoutes';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { otherCategory } from '../../data/CategoryDefaultData';
import { ITransaction } from '../../global/interfaces';
import { useLocalization } from '../../hooks/localization';
import { UIIconCircle } from '../UIIconCircle';
import { t } from 'i18n-js'

import {
  AccountTitle,
  Amount,
  CategoryTitle,
  Container,
  DateText,
  Description,
  Titles,
  Transaction,
  Header,
  Content,
  TransactionButton,
} from './styles';
import { isSameDay } from '../../utils/dateUtils';
import { useStyle } from '../../hooks/style';
import { Card } from '../Card';

export function PaidCard({type}: {
  type: TransactionType;
}) {
  const { accounts, transactions, categories, user } = useAuth()
  const { toCurrency, toDate } = useLocalization()
  const navigation = useNavigation<RootSignInNavigationProps<'TransactionsRoutes'>>()
  const style = useStyle()

  const data = transactions
    .filter(transaction => transaction.type === type && transaction.confirmed === false)
    .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())

  function handleEditTransaction(transactionId: ITransaction['id']) {
    navigation.navigate('TransactionsRoutes', {screen: 'TransactionEdit', params: {transactionId}})
  }

  function hideAmount() {
    return user.money_hide && style.money.hide;
  }

  return (
    <Card
      title={type === 'expense' ? t('Not paid') : t('Not received')} 
      style={{display: (data.length === 0 ? 'none' : 'flex')}}
    >
      {data.map((transaction, index) => {
      const category = categories.find(category => category.id === transaction.category_id)
      
      return (
        <Transaction key={transaction.id}>
          {(index === 0 || !isSameDay(transaction.date, data[index -1].date)) && (
            <Header>
              <DateText>{toDate(transaction.date, 'allDate')}</DateText>
            </Header>
          )}

        <TransactionButton onPress={() => handleEditTransaction(transaction.id)}>
          <Content>
            <Description>
              <UIIconCircle
                icon_category={category?.icon_name}
                color_name={category?.color_name}
                size={40}
              />
              <Titles>
                <CategoryTitle>{transaction.description || categories.find(category => category.id === transaction.category_id)?.name}</CategoryTitle>
                <AccountTitle>{accounts.find(account => account.id === transaction.account_id)?.name}</AccountTitle>
              </Titles>
            </Description>

            <Amount type={transaction.type} style={hideAmount()}>{toCurrency(transaction.amount)}</Amount>
          </Content>
        </TransactionButton>
      </Transaction>
      )})}
    </Card>
  );
}
