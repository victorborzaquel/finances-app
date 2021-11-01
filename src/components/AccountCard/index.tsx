import { useAuth } from '../../hooks/auth';
import { RootSignInNavigationProps } from '../../routes/SignInRoutes';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useLocalization } from '../../hooks/localization';

import {
  AccountTitle,
  Amount,
  Description,
  Titles,
  Transaction,
  Content,
  TransactionButton,
} from './styles';
import { useStyle } from '../../hooks/style';
import { UIAccountIcon } from '../UIAccountIcon';
import { Card } from '../Card';
import { t } from 'i18n-js';

interface IAmountData {
  [key: string]: number
}

export function AccountCard({ goTo }: {
  goTo({ accountId }: { accountId: string }): void
}) {
  const { accounts, transactions, user, transfers } = useAuth()
  const { toCurrency } = useLocalization()
  const style = useStyle()
  const navigation = useNavigation<RootSignInNavigationProps<'TransactionsRoutes'>>()

  const [data, setData] = useState(accounts)
  const [amount, setAmount] = useState({} as IAmountData)

  function getTransactionsAmount() { 
    return transactions.reduce((acc, curr) => {
      function math() {
        const a = Number(acc[curr.account_id]) || 0
        const b = Number(curr.amount) || 0

        switch (curr.type) {
          case 'expense': return a - b
          case 'income': return a + b
          default: return a
        }
      }

      if (!curr.confirmed) return acc
      return {...acc, [curr.account_id]: math()}
    }, {} as IAmountData)
  }

  function getTransfersAmount() {
    return transfers.reduce((acc, curr) => ({
        ...acc, 
        [curr.account_destination_id]: (Number(acc.account_destination_id) || 0) + Number(curr.amount),
        [curr.account_origin_id]: (Number(acc.account_origin_id) || 0) - Number(curr.amount),
      }
    ), {} as IAmountData)
  }

  function getAmount() {
    const transactions = getTransactionsAmount()
    const transfers = getTransfersAmount()
    const result = {} as IAmountData

    for (const prop in accounts) {
      const key = accounts[prop].id
      result[key] = (Number(transfers[key]) || 0) + (Number(transactions[key]) || 0)
    }
    return result
  }

  function handleEditAccount(accountId: string) {
    goTo({ accountId })
    // navigation.navigate('TransactionsRoutes', {screen: 'TransactionEdit', params: transaction})
  }

  function hideAmount() {
    return user.money_hide && style.money.hide;
  }

  useEffect(() => {
    setData(accounts)
  }, [accounts])

  useEffect(() => {
    setAmount(getAmount())
  }, [transactions, transfers])

  return (
    <Card title={t('My accounts')}>
      {data.map(account => {
        return (
          <Transaction key={account.id}>
            <TransactionButton onPress={() => handleEditAccount(account.id)}>
              <Content>
                <Description>
                  <UIAccountIcon account={account}/>
                  <Titles>
                    <AccountTitle>{account.name}</AccountTitle>
                  </Titles>
                </Description>
          
                <Amount style={hideAmount()}>{toCurrency(amount[account.id] || 0)}</Amount>
              </Content>
            </TransactionButton>
        </Transaction>
        )})}
    </Card>
  );
}
