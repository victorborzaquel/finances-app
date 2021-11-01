import React, { useEffect, useRef, useState } from 'react'
import { DateSelect } from '../../components/DateSelect'
import { Header } from '../../components/Header'

import {
  Container, 
  ChartsScroll, 
  Buttons,
} from './styles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { TransactionType } from '../../global/interfaces'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import { Chart } from '../../components/Chart';
import { UIButton } from '../../components/UIButton';
import { useData } from '../../hooks/data';
import { RootSignInNavigationProps } from '../../routes/SignInRoutes';
import { t } from 'i18n-js';

export function Charts() {
  const [date, setDate] = useState(new Date())

  const theme = useTheme()
  const isFocused = useIsFocused()
  
  const { getBalance, getBalanceByCategories, replaceFilter } = useData()
  const balance = getBalance(date)
  const balanceByCategories = getBalanceByCategories(date)

  const [transactionType, setTransactionType] = useState<TransactionType>('expense')
  const transactionTypeScrollData: TransactionType[] = ['expense', 'income'];
  const navigation = useNavigation<RootSignInNavigationProps<'Charts'>>()
  const scrollRef = useRef<ScrollView>()

  function handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Number((event.nativeEvent.contentOffset.x / theme.display.window_width).toFixed())
    setTransactionType(transactionTypeScrollData[index])
  }

  function handleButtonTypePress(type: TransactionType) {
    const x = transactionTypeScrollData.indexOf(type) * theme.display.window_width
    scrollRef.current?.scrollTo({ x, animated: false })
    setTransactionType(type);
  }

  function handleGoToTransactions(categoryId: string) {
    replaceFilter({ date, categoryId })
    navigation.navigate('TransactionsRoutes', { screen: 'Transaction'})
  }

  useEffect(() => {
    if (!isFocused) {
      setDate(new Date())
      scrollRef.current?.scrollTo({ x: 0, animated: false })
      setTransactionType('expense')
    }
  },[isFocused])

  return (
    <Container space={useBottomTabBarHeight()}>
      <Header title={t('Charts')} />
      
      <DateSelect
        date={date}
        setDate={setDate}
      />
        <Buttons>
          <UIButton
            title={t('Expense')}
            press={transactionType === 'expense'} 
            color="attention" 
            onPress={()=> handleButtonTypePress('expense')}
            heightDivider={1.5}
          />
          <UIButton
            title={t('Income')}
            press={transactionType === 'income'} 
            color="success" 
            onPress={()=> handleButtonTypePress('income')}
            heightDivider={1.5}
          />
        </Buttons>
      
      <ChartsScroll
        onScroll={handleOnScroll}
        ref={scrollRef as any}
      >
        <Chart 
          data={{
            balance: balance.expense, 
            balanceByCategories: balanceByCategories.expense 
          }} 
          goTo={handleGoToTransactions} 
        />
        <Chart 
          data={{
            balance: balance.income, 
            balanceByCategories: balanceByCategories.income 
          }} 
          goTo={handleGoToTransactions} 
        />
      </ChartsScroll>
    </Container>
  );
}
