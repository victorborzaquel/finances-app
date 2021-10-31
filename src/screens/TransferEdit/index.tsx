import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Platform, Alert } from 'react-native'
import { useTheme } from 'styled-components/native'
import { GoBackButton } from '../../components/GoBackButton'
import { InputModal } from '../../components/InputModal'
import { UIButton } from '../../components/UIButton'
import { ITransfer } from '../../global/interfaces'
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
  TransferIndicator,
} from './styles';
import { Calculator } from '../../components/Calculator';
import { RootTransactionsRouteProps } from '../../routes/TransactionsRoutes'
import { UIIcon } from '../../components/UIIcon'
import { TransferText } from '../AddTransaction/styles'
import { t } from 'i18n-js'
import { Modalize } from 'react-native-modalize'
import { ListSelect } from '../../components/ListSelect'
import { useModalize } from '../../hooks/modalize'

export function TransferEdit() {
  const scrollRef = useRef<ScrollView>()
  const { toCurrency, toDate } = useLocalization()
  const { user, accounts, removeData, updateData, transactions, transfers } = useAuth()
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const theme = useTheme()
  const route = useRoute<RootTransactionsRouteProps<'TransferEdit'>>()
  const { transferId } = route.params
  const transfer = transfers.find(transfer => transfer.id === transferId)

  if (!transfer) throw new Error('Transação não existe.')

  const [description, setDescription] = useState(transfer.description)
  const [date, setDate] = useState(new Date(transfer.date))
  const [amount, setAmount] = useState(transfer.amount)

  const account_origin_id = accounts.find(account => account.id === transfer.account_origin_id)
  const account_destination_id = accounts.find(account => account.id === transfer.account_destination_id)

  if (!account_origin_id || !account_destination_id) throw new Error('ID da Transferencia não existe.')

  const [transferAccountOrigin, setTransferAccountOrigin] = useState(account_origin_id)
  const [transferAccountDestination, setTransferAccountDestination] = useState(account_destination_id)

  const [dateModalVisible, setDateModalVisible] = useState(false)

  const { createModalize } = useModalize()

  const calculatorModal = createModalize()
  const transferAccountOriginModal = createModalize()
  const transferAccountDestinationModal = createModalize()


  function handleSelectDate(event: any, date?: Date | undefined) {
    setDateModalVisible(Platform.OS === 'ios')
    if (date) setDate(date)
  }

  function handleUpdateTransaction() {
    if (transferAccountOrigin === transferAccountDestination) {
      return Alert.alert('Ops', 'As contas da transferencia não podem ser iguais!')
    }
    if (amount === 0) return Alert.alert('Ops', 'Você precisa colocar um valor para a transferencia!')

    updateData('transfer', {
      id: transferId,
      user_id: user.id,
      account_origin_id: transferAccountOrigin!.id,
      account_destination_id: transferAccountDestination!.id,
      type: 'transfer',
      description,
      amount,
      note: '',
      date,
      recurring: false,
    } as ITransfer)
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
            removeData('transfer', transferId)
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

        <Header color='secondary'>
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

        <Form>
          <InputModal
            title={toDate(date, 'allDate', true)}
            setOpenModal={setDateModalVisible}
            icon="calendar"
          />
          <InputModal
            title={!!transferAccountOrigin.id ? transferAccountOrigin.name : 'Conta de origem'}
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
            title={!!transferAccountDestination.id ? transferAccountDestination.name : 'Conta de destino'}
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
