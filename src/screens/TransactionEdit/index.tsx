import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Platform, Alert } from 'react-native'
import { GoBackButton } from '../../components/GoBackButton'
import { InputModal } from '../../components/InputModal'
import { InputToggle } from '../../components/InputToggle'
import { UIButton } from '../../components/UIButton'
import { IAccount, ICategory, TransactionType } from '../../global/interfaces'
import { useLocalization } from '../../hooks/localization'
import DateTimePicker from '@react-native-community/datetimepicker'
import { InputText } from '../../components/InputText'
import { useAuth } from '../../hooks/auth'

import {
  Amount,
  AmountButton,
  Container,
  DeleteTransactionButton,
  Footer,
  Form,
  GoBackButtonWrapper,
  Header,
} from './styles';
import { Calculator } from '../../components/Calculator';
import { RootTransactionsRouteProps } from '../../routes/TransactionsRoutes'
import { UIIcon } from '../../components/UIIcon'
import { t } from 'i18n-js'
import { Modalize } from 'react-native-modalize'
import { ListSelect } from '../../components/ListSelect'
import { useTheme } from 'styled-components'
import { useModalize } from '../../hooks/modalize'

export function TransactionEdit() {
  const { toCurrency, toDate } = useLocalization()
  const { user, categories, accounts, removeData, updateData, transactions } = useAuth()
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const route = useRoute<RootTransactionsRouteProps<'TransactionEdit'>>()
  const { transactionId } = route.params
  const transaction = transactions.find(transaction => transaction.id === transactionId)

  if (!transaction) throw new Error('Transação não existe.')

  const accountTransaction = accounts.find(account => account.id === transaction.account_id)
  const categoryTransaction = categories.find(category => category.id === transaction.category_id)

  const [transactionType] = useState<TransactionType>(transaction.type)
  const [transactionConfirmed, setTransactionConfirmed] = useState(transaction.confirmed)
  const [description, setDescription] = useState(transaction.description)
  const [date, setDate] = useState(new Date(transaction.date))
  const [amount, setAmount] = useState(transaction.amount)
  const [category, setCategory] = useState(categoryTransaction as ICategory)
  const [account, setAccount] = useState(accountTransaction as IAccount)

  const [dateModalVisible, setDateModalVisible] = useState(false)

  const theme = useTheme()
  const { createModalize } = useModalize()

  const calculatorModal = createModalize()
  const categoryModal = createModalize()
  const accountModal = createModalize()

  function handleSelectDate(event: any, date?: Date | undefined) {
    setDateModalVisible(Platform.OS === 'ios')
    if (date) setDate(date)
  }

  function handleUpdateTransaction() {
    if (amount === 0) return Alert.alert('Ops', 'Você precisa colocar um valor!')

    updateData('transaction', {
      id: transactionId,
      user_id: user.id,
      category_id: category.id,
      account_id: account.id,
      type: transactionType,
      amount,
      date,
      description,
      confirmed: transactionConfirmed,
      recurring: false,
      repeat_quant: 1,
      repeat_period: 1,
      ignore: false,
      note: '',
      favorite: false,
    })
    navigation.goBack()
  }

  function handleDeleteTransaction() {
    Alert.alert(
      'Tem certeza que quer deletar essa transação?',
      'Essa ação não podera ser desfeita!',
      [
        {
          text: "Cancelar",
          onPress: () => { },
          style: "cancel"
        },
        {
          text: "Deletar",
          onPress: () => {
            navigation.goBack()
            removeData('transaction', transactionId)
          },
          style: "default"
        }
      ]
    )
  }

  useEffect(() => {
    if (!isFocused) navigation.goBack()
  }, [isFocused])

  return (
    <>
      <Container>
        <Header color={transactionType === 'income' ? 'success' : 'attention'}>
          <GoBackButtonWrapper>
            <GoBackButton color="background_secondary" navigation={navigation} />

            <DeleteTransactionButton onPress={handleDeleteTransaction}>
              <UIIcon
                icon_interface="trash"
                size={24}
                color='background_secondary'
              />
            </DeleteTransactionButton>
          </GoBackButtonWrapper>

          <AmountButton onPress={calculatorModal.open}>
            <Amount>{toCurrency(amount)}</Amount>
          </AmountButton>
        </Header>

        {transaction.type === 'expense' && (
          <Form>
            <InputToggle
              title={transactionConfirmed ? t('Paid') : t('Not paid')}
              color="attention"
              state={transactionConfirmed}
              setState={setTransactionConfirmed}
              icon="check-square"
            />
            <InputModal
              title={toDate(date, 'allDate', true)}
              setOpenModal={setDateModalVisible}
              icon="calendar"
            />
            <InputModal
              title={category.name}
              setOpenModal={categoryModal.open}
              icon="folder"
            />
            <InputModal
              title={account.name}
              setOpenModal={accountModal.open}
              icon="credit-card"
            />
            <InputText
              title={t('Description')}
              state={description}
              setState={setDescription}
              icon="align-left"
            />
          </Form>
        )}

        {transaction.type === 'income' && (
          <Form>
            <InputToggle
              title={transactionConfirmed ? t('Received') : t('Not received')}
              color="success"
              state={transactionConfirmed}
              setState={setTransactionConfirmed}
              icon="check-square"
            />
            <InputModal
              title={toDate(date, 'allDate', true)}
              setOpenModal={setDateModalVisible}
              icon="calendar"
            />
            <InputModal
              title={category.name}
              setOpenModal={categoryModal.open}
              icon="folder"
            />
            <InputModal
              title={account.name}
              setOpenModal={accountModal.open}
              icon="credit-card"
            />
            <InputText
              title={t('Description')}
              state={description}
              setState={setDescription}
              icon="align-left"
            />
          </Form>
        )}

        <Footer>
          <UIButton
            title={t('Confirm')}
            color="main"
            onPress={handleUpdateTransaction}
          />
        </Footer>
      </Container>

      <Modalize // Calculator
        ref={calculatorModal.ref}
        withHandle={false}
        adjustToContentHeight
      >
        <Calculator
          setAmount={setAmount}
          close={calculatorModal.close}
        />
      </Modalize>

      <Modalize // Category
        ref={categoryModal.ref}
        snapPoint={theme.display.window_height / 2}
      >
        <ListSelect
          setState={setCategory}
          close={categoryModal.close}
          data={categories.filter(category => category.type === transactionType)}
          type="category"
        />
      </Modalize>

      <Modalize // Account
        ref={accountModal.ref}
        adjustToContentHeight
      >
        <ListSelect
          setState={setAccount}
          close={accountModal.close}
          data={accounts}
          type="account"
        />
      </Modalize>

      {dateModalVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleSelectDate}
        />
      )}
    </>
  );
}
