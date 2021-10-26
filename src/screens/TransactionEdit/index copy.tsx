import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, Platform } from 'react-native'
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
} from './styles';
import { CalculatorModal } from '../../components/CalculatorModal';
import { CategoryModal } from '../../components/CategoryModal';
import { AccountModal } from '../../components/AccountModal'
import { otherCategory } from '../../data/CategoryDefaultData'

export function TransactionEdit() {
  const [transactionType, setTransactionType] = useState<TransactionType>('expense')
  const [transactionConfirmed, setTransactionConfirmed] = useState(true)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState({} as ICategory)
  const [account, setAccount] = useState({} as IAccount)
  
  const [dateModalVisible, setDateModalVisible] = useState(false)
  const [calculatorModalVisible, setCalculatorModalVisible] = useState(false)
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)
  const [accountModalVisible, setAccountModalVisible] = useState(false)

  const scrollRef = useRef<ScrollView>()
  const { toCurrency, toDate } = useLocalization()
  const { addData, defaultAccount, user } = useAuth()
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const theme = useTheme()
  
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
    if (transactionType === 'transfer') {
      addData('transfer', {
        id: String(UUID.v4()),
        user_id: user.id,
        account_origin_id: '1',
        account_destination_id: '2',
        description,
        amount,
        note: '',
        date: new Date(date),
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
        description: description || (isCurrentCategoryType() && category.name) || otherCategory[transactionType].name,
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
      setCalculatorModalVisible(true)
    } else {
      resetData()
    }
  },[isFocused])

  return (
    <Container>
      <Header color={setHeaderBackground()}>
        <GoBackButtonWrapper>
          <GoBackButton color="background_secondary" />
        </GoBackButtonWrapper>

        <AmountButton onPress={() => setCalculatorModalVisible(true)}>
          <Amount>{toCurrency(amount)}</Amount>
        </AmountButton>

        <Buttons>
          <UIButton
            title="Despesa" 
            press={transactionType === 'expense'} 
            color="attention" 
            onPress={()=> handleButtonTypePress('expense')}
          />
          <UIButton
            title="Receita" 
            press={transactionType === 'income'} 
            color="success" 
            onPress={()=> handleButtonTypePress('income')}
          />
          <UIButton
            title="Transferencia" 
            press={transactionType === 'transfer'} 
            color="secondary" 
            onPress={()=> handleButtonTypePress('transfer')}
          />
        </Buttons>
      </Header>

      <Forms
        onScroll={handleOnScroll}
        ref={scrollRef as any}
      >
        <Form>
          <InputToggle
            title={transactionConfirmed ? 'Pago' : 'Não pago'} 
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
            title={isCurrentCategoryType() ? category.name : otherCategory[transactionType].name}
            setOpenModal={setCategoryModalVisible}
            icon="folder"
          />
          <InputModal
            title={!!account.id ? account.name : defaultAccount.name}
            setOpenModal={setAccountModalVisible}
            icon="credit-card"
          />
          <InputText
            title="Descrição"
            state={description}
            setState={setDescription}
            icon="align-left"
          />
        </Form>

        <Form>
          <InputToggle
            title={transactionConfirmed ? 'Recebido' : 'Não recebido'} 
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
            title={isCurrentCategoryType() ? category.name : otherCategory[transactionType].name}
            setOpenModal={setCategoryModalVisible}
            icon="folder"
          />
          <InputModal
            title={!!account.id ? account.name : defaultAccount.name}
            setOpenModal={setAccountModalVisible}
            icon="credit-card"
          />
          <InputText
            title="Descrição"
            state={description}
            setState={setDescription}
            icon="align-left"
          />
        </Form>

        <Form>
          <InputToggle
            title={transactionConfirmed ? 'Confirmado' : 'Não confirmado'} 
            color="secondary"
            state={transactionConfirmed}
            setState={setTransactionConfirmed}
            icon="check-square"
          />
          <InputModal
            title={date.toDateString()} 
            setOpenModal={setDateModalVisible}
            icon="calendar"
          />
          <InputText
            title="Descrição"
            state={description}
            setState={setDescription}
            icon="align-left"
          />
        </Form>
      </Forms>

      <Footer>
        <UIButton
          title="Confirmar"
          press={!amount}
          color="main"
          onPress={handleCreateTransaction}
        />
      </Footer>
      
      <CalculatorModal
        visible={calculatorModalVisible}
        setVisible={setCalculatorModalVisible}
        setAmount={setAmount}
      />

      <AccountModal
        visible={accountModalVisible}
        setVisible={setAccountModalVisible}
        setAccount={setAccount}
      />

      <CategoryModal
        visible={categoryModalVisible}
        setVisible={setCategoryModalVisible}
        setCategory={setCategory}
        type={transactionType}
      />

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
    </Container>
  );
}
