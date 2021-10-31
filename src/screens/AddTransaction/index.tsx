import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, Platform, Alert } from 'react-native'
import { useTheme } from 'styled-components/native'
import { GoBackButton } from '../../components/GoBackButton'
import { InputModal } from '../../components/InputModal'
import { InputToggle } from '../../components/InputToggle'
import { UIButton } from '../../components/UIButton'
import { ButtonType, IAccount, ICategory, TransactionType } from '../../global/interfaces'
import { useLocalization } from '../../hooks/localization'
import DateTimePicker from '@react-native-community/datetimepicker'
import { InputText } from '../../components/InputText'
import { useAuth } from '../../hooks/auth'
import UUID from 'react-native-uuid'

import {
  Amount,
  AmountButton,
  Buttons,
  Container,
  Footer,
  Form,
  Forms,
  GoBackButtonWrapper,
  Header,
  TransferIndicator,
  TransferText,
} from './styles';
import { Calculator } from '../../components/Calculator';
import { otherCategory } from '../../data/CategoryDefaultData'
import { UIIcon } from '../../components/UIIcon'
import { t } from 'i18n-js'
import { Modalize } from 'react-native-modalize'
import { useModalize } from '../../hooks/modalize'
import { ListSelect } from '../../components/ListSelect'

export function AddTransaction() {
  const [transactionType, setTransactionType] = useState<TransactionType>('expense')
  const [transactionConfirmed, setTransactionConfirmed] = useState(true)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState({} as ICategory)
  const [account, setAccount] = useState({} as IAccount)

  const { createModalize } = useModalize()

  const [transferAccountOrigin, setTransferAccountOrigin] = useState({} as IAccount)
  const [transferAccountDestination, setTransferAccountDestination] = useState({} as IAccount)

  const [dateModalVisible, setDateModalVisible] = useState(false)

  const scrollRef = useRef<ScrollView>()
  const { toCurrency, toDate } = useLocalization()
  const { addData, useDefaultAccount, user, categories, accounts } = useAuth()
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const theme = useTheme()
  const defaultAccount = useDefaultAccount()

  const calculatorModal = createModalize()
  const categoryModal = createModalize()
  const accountModal = createModalize()
  const transferAccountOriginModal = createModalize()
  const transferAccountDestinationModal = createModalize()

  const transactionTypeScrollData: TransactionType[] = ['expense', 'income', 'transfer'];

  function setHeaderBackground(): ButtonType {
    switch (transactionType) {
      case 'expense': return 'attention'
      case 'income': return 'success'
      case 'transfer': return 'secondary'
      default: return 'attention'
    }
  }

  function handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Number((event.nativeEvent.contentOffset.x / theme.display.window_width).toFixed());
    setTransactionType(transactionTypeScrollData[index]);
  }

  function handleButtonTypePress(type: TransactionType) {
    const x = transactionTypeScrollData.indexOf(type) * theme.display.window_width;
    scrollRef.current?.scrollTo({ x, animated: false });
    setTransactionType(type);
  }

  function resetData() {
    scrollRef.current?.scrollTo({ x: 0, animated: false })
    setTransactionConfirmed(true)
    setTransactionType('expense')
    setDate(new Date())
    setDescription('')
    setAmount(0)
    setAccount({} as IAccount)
    setCategory({} as ICategory)
  }

  function handleSelectDate(event: any, date?: Date | undefined) {
    setDateModalVisible(Platform.OS === 'ios')
    if (date) setDate(date)
  }

  function handleCreateTransaction() {
    if (transferAccountOrigin === transferAccountDestination && transactionType === 'transfer') {
      return Alert.alert('Ops', 'As contas da transferencia não podem ser iguais!')
    }
    if (amount === 0) return Alert.alert('Ops', 'Você precisa colocar um valor!')

    if (transactionType === 'transfer') {
      addData('transfer', {
        id: String(UUID.v4()),
        user_id: user.id,
        account_origin_id: transferAccountOrigin.id,
        account_destination_id: transferAccountDestination.id,
        type: transactionType,
        description,
        amount,
        note: '',
        date,
        recurring: false,
      })
    } else {
      addData('transaction', {
        id: String(UUID.v4()),
        user_id: user.id,
        category_id: (isCurrentCategoryType() && category.id) || otherCategory[transactionType].id,
        account_id: account.id || defaultAccount.id,
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
    }
    navigation.goBack()
  }

  function isCurrentCategoryType() {
    return !!category.id && category.type === transactionType
  }

  useEffect(() => {
    if (isFocused) {
      calculatorModal.open()
    } else {
      resetData()
    }
  }, [isFocused])

  return (
    <>
      <Container>
        <Header color={setHeaderBackground()}>
          <GoBackButtonWrapper>
            <GoBackButton color="background_is_dark_secondary" navigation={navigation} />
          </GoBackButtonWrapper>

          <AmountButton onPress={calculatorModal.open}>
            <Amount>{toCurrency(amount)}</Amount>
          </AmountButton>

          <Buttons>
            <UIButton
              title={t('Expense')}
              press={transactionType === 'expense'}
              color="attention"
              onPress={() => handleButtonTypePress('expense')}
            />
            <UIButton
              title={t('Income')}
              press={transactionType === 'income'}
              color="success"
              onPress={() => handleButtonTypePress('income')}
            />
            <UIButton
              title={t('Transfer')}
              press={transactionType === 'transfer'}
              color="secondary"
              onPress={() => handleButtonTypePress('transfer')}
            />
          </Buttons>
        </Header>

        <Forms
          onScroll={handleOnScroll}
          ref={scrollRef as any}
        >
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
              title={isCurrentCategoryType() ? category.name : t(otherCategory[transactionType].name)}
              setOpenModal={categoryModal.open}
              icon="folder"
            />
            <InputModal
              title={!!account.id ? account.name : defaultAccount.name}
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
              title={isCurrentCategoryType() ? category.name : t(otherCategory[transactionType].name)}
              setOpenModal={categoryModal.open}
              icon="folder"
            />
            <InputModal
              title={!!account.id ? account.name : defaultAccount.name}
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

          <Form>
            <InputModal
              title={toDate(date, 'allDate', true)}
              setOpenModal={setDateModalVisible}
              icon="calendar"
            />
            <InputModal
              title={!!transferAccountOrigin.id ? transferAccountOrigin.name : t('Origin account')}
              color={!!transferAccountOrigin.id ? undefined : 'text_details'}
              setOpenModal={transferAccountOriginModal.open}
              icon="credit-card"
            />
            <TransferIndicator>
              <TransferText>{t('Transfer to')}</TransferText>
              <UIIcon
                icon_interface='chevron-down'
                color='title'
                size={34}
              />
            </TransferIndicator>
            <InputModal
              title={!!transferAccountDestination.id ? transferAccountDestination.name : t('Destination account')}
              color={!!transferAccountDestination.id ? undefined : 'text_details'}
              setOpenModal={transferAccountDestinationModal.open}
              icon="credit-card"
            />
            <InputText
              title={t('Description')}
              state={description}
              setState={setDescription}
              icon="align-left"
            />
          </Form>
        </Forms>

        <Footer>
          <UIButton
            title={t('Confirm')}
            color="main"
            onPress={handleCreateTransaction}
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
          data={categories}
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

      <Modalize // Account Destination
        ref={transferAccountDestinationModal.ref}
        adjustToContentHeight
      >
        <ListSelect
          setState={setTransferAccountDestination}
          close={transferAccountDestinationModal.close}
          data={accounts}
          type="account"
        />
      </Modalize>

      <Modalize // Account Origin
        ref={transferAccountOriginModal.ref}
        adjustToContentHeight
      >
        <ListSelect
          setState={setTransferAccountOrigin}
          close={transferAccountOriginModal.close}
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
