import React, { useEffect, useRef } from 'react'
import { DateSelect } from '../../components/DateSelect'
import { Header } from '../../components/Header'
import { useAuth } from '../../hooks/auth'
import { UIIconCircle } from '../../components/UIIconCircle'
import { isSameDay, isSameMonth } from '../../utils/dateUtils'
import { useLocalization } from '../../hooks/localization'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { RootTransactionsNavigationProps } from '../../routes/TransactionsRoutes'
import { useData } from '../../hooks/data'
import { ITransaction, ITransfer, TransactionType } from '../../global/interfaces'
import { FlatList } from 'react-native'
import { UIAccountIcon } from '../../components/UIAccountIcon'
import { UIIcon } from '../../components/UIIcon'

import {
  AccountTitle,
  Amount,
  BalanceButton,
  BalanceText,
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
  Transfer,
  TransferDescription,
  TransferTitle,
} from './styles'
import { t } from 'i18n-js'

export function Transactions() {
  const navigation = useNavigation<RootTransactionsNavigationProps<'Transaction'>>()

  const { categories, accounts, transfers } = useAuth()
  const { toCurrency, toDate } = useLocalization()
  const { getBalance, filterTransactions, filter, resetFilter, updateFilter } = useData()
  const isFocused = useIsFocused()

  const scrollRef = useRef<FlatList>()

  const balance = getBalance(filter.date, true)
  const data = filterTransactions()

  function handleEditTransaction(transactionId: ITransaction['id']) {
    navigation.navigate('TransactionEdit', { transactionId })
  }

  function handleEditTransfer(transferId: ITransfer['id']) {
    navigation.navigate('TransferEdit', { transferId })
  }

  function handleBalanceButton(transactionType: TransactionType) {
    updateFilter({ date: filter.date, transactionType })
  }

  function transfersBalance() {
    return transfers
      .filter(transfer => isSameMonth(transfer.date, filter.date))
      .reduce((acc, curr) => Number(acc) + Number(curr.amount), 0)
  }

  function TransactionType({transaction}: {
    transaction: ITransaction;
  }) {
    const category = categories.find(category => category.id === transaction.category_id)
    return (
      <Transaction confirmed={transaction.confirmed} onPress={() => handleEditTransaction(transaction.id)}>
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
        <Amount type={transaction.type}>{toCurrency(transaction.amount)}</Amount>
      </Transaction>
    )
  }

  function TransferType({transfer}: {
    transfer: ITransfer;
  }) {
    const accountOrigin = accounts.find(account => account.id === transfer.account_origin_id)
    const accountDestination = accounts.find(account => account.id === transfer.account_destination_id)
    return (
      <Transfer  onPress={() => handleEditTransfer(transfer.id)}>
        <TransferDescription>
          <TransferTitle>{transfer.description || 'Transferencia'}</TransferTitle>
            <Description>
            <UIAccountIcon account={accountOrigin} />
            <UIIcon
              icon_interface='chevron-right'
            />
          
            <UIAccountIcon account={accountDestination} />
          </Description>
        </TransferDescription>
        <Amount type={transfer.type}>{toCurrency(transfer.amount)}</Amount>
      </Transfer>
    )
  }

  useEffect(() => {
    if (!isFocused) {
      resetFilter()
      scrollRef.current?.scrollToOffset({ animated: false, offset: 0 })
    }
  }, [isFocused])

  return (
    <Container space={useBottomTabBarHeight()}>
      <Header title={t('Transactions')} icons={[
        {
          iconName: 'refresh-cw', 
          onPress: resetFilter,
          hidden: Object.keys(filter).length === 1
        },
        {
          iconName: 'filter',
          color: Object.keys(filter).length === 1 ? 'background_secondary' : 'attention',
          // onPress: () => setFilterModalVisible(true)
        }
      ]}/>

      <DateSelect
        date={filter.date}
        setDate={updateFilter}
        filter
      />

      <TransactionsBalance>
        <BalanceButton onPress={() => handleBalanceButton('income')} align='flex-start'>
          <BalanceText>{t('Incomes')}</BalanceText>
          <TransactionAmount type="income">{toCurrency(balance.income)}</TransactionAmount>
        </BalanceButton>
        <BalanceButton onPress={() => handleBalanceButton('expense')} align='center'>
          <BalanceText>{t('Expenses')}</BalanceText>
          <TransactionAmount type="expense">{toCurrency(balance.expense)}</TransactionAmount>
        </BalanceButton>
        <BalanceButton onPress={() => handleBalanceButton('transfer')} align='flex-end'>
          <BalanceText>{t('Transfers')}</BalanceText>
          <TransactionAmount type="transfer">{toCurrency(transfersBalance())}</TransactionAmount>
        </BalanceButton>
      </TransactionsBalance>

      <TransactionList
        data={data}
        keyExtractor={transaction => transaction.id}
        ref={scrollRef as any}
        contentContainerStyle={{
          paddingBottom: useBottomTabBarHeight(),
        }}
        renderItem={({ item, index }) => {
          
          return (
            <>
              {(index === 0 || !isSameDay(item.date, data[index - 1].date)) && (
                <TransactionHeader>
                  <TransactionHeaderTitle>
                    {toDate(item.date, 'shortDayOfWeek')}
                  </TransactionHeaderTitle>
                </TransactionHeader>
              )}

                {item.type === 'transfer'
                  ? <TransferType transfer={item as ITransfer} />
                  : <TransactionType transaction={item as ITransaction} />
                }
              
            </>
          )
        }}
      />

      {/* {(filterModalVisible
      ) && (
        <ShadowBackground/>
      )}

      <FilterModal
        visible={filterModalVisible}
        setVisible={setFilterModalVisible}
        date={date}
      /> */}
    </Container>
  );
}
