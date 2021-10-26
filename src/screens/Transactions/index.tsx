import React, { useState } from 'react'
import { DateSelect } from '../../components/DateSelect'
import { Header } from '../../components/Header'
import { useAuth } from '../../hooks/auth'

import {
  AccountTitle,
  Amount,
  BalanceText,
  BalanceWrapper,
  CategoryTitle,
  Container, 
  Description, 
  Titles, 
  Transaction, 
  TransactionAmount, 
  TransactionHeader, 
  TransactionHeaderTitle, 
  TransactionList,
  TransactionsBalance,
} from './styles';
import { UIIconCircle } from '../../components/UIIconCircle'
import { otherCategory } from '../../data/CategoryDefaultData'
import { isSameMonth, isSameDay, isSameYear } from '../../utils/dateUtils'
import { useLocalization } from '../../hooks/localization'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { TransactionEdit } from '../TransactionEdit';
import { useNavigation } from '@react-navigation/native';
import { RootTransactionsNavigationProps } from '../../routes/TransactionsRoutes';

export function Transactions() {
  const [date, setDate] = useState(new Date())
  
  const navigation = useNavigation<RootTransactionsNavigationProps<'Transaction'>>()
  const { transactions, categories, accounts } = useAuth()
  const { toCurrency, toDate } = useLocalization()

  const data = transactions
    .filter(transaction => isSameMonth(transaction.date, date))
    .sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate())

    const mothBalance = (() => transactions.reduce((acc, curr) => {
      if (!curr.confirmed || !isSameMonth(curr.date, date)) return acc

      const { expense, income } = acc

      switch (curr.type) {
        case 'income': return {expense, income: Number(income) + Number(curr.amount)}
        case 'expense': return {income, expense: Number(expense) + Number(curr.amount)}
        default: return acc
      }
    }, {expense: 0, income: 0}))()

  return (
    <Container space={useBottomTabBarHeight()}>
      <Header title="Transações" />

      <DateSelect
        date={date}
        setDate={setDate}
      />

      <TransactionsBalance>
        <BalanceWrapper>
          <BalanceText>Receitas</BalanceText>
          <TransactionAmount type="income">{toCurrency(mothBalance.income)}</TransactionAmount>
        </BalanceWrapper>
        <BalanceWrapper>
          <BalanceText>Despesas</BalanceText>
          <TransactionAmount type="expense">{toCurrency(mothBalance.expense)}</TransactionAmount>
        </BalanceWrapper>
      </TransactionsBalance>

      <TransactionList
        data={data}
        keyExtractor={transaction => transaction.id}
        contentContainerStyle={{
          paddingBottom: useBottomTabBarHeight(),
        }}
        renderItem={({ item, index }) => {
          const category = categories.find(category => category.id === item.category_id)
          return (
            <>
            {(index === 0 || !isSameDay(item.date, data[index-1].date)) && (
              <TransactionHeader>
                <TransactionHeaderTitle>
                  {toDate(item.date, 'shortDayOfWeek')}
                </TransactionHeaderTitle>
              </TransactionHeader>
            )}
            
            <Transaction confirmed={item.confirmed} onPress={() => navigation.navigate('TransactionEdit', item)}>
              <Description>
                <UIIconCircle
                  icon_category={!!category ? category.icon_name : otherCategory[item.type].icon_name}
                  color_name={!!category ? category.color_name : otherCategory[item.type].color_name}
                  size={40}
                />
                <Titles>
                  <CategoryTitle>{item.description}</CategoryTitle>
                  <AccountTitle>{accounts.find(account => account.id === item.account_id)?.name}</AccountTitle>
                </Titles>
              </Description>
              
              <Amount type={item.type}>{toCurrency(item.amount)}</Amount>
            </Transaction>
            </>
          )}}
      />

    </Container>
  );
}
