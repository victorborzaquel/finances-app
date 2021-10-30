import React, { useState } from 'react';
import { Button } from 'react-native';
import { GoBackButton } from '../../components/GoBackButton';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  GoBackHeader,
  GoBackTitle, 
  Inputs
} from './styles';
import { InputToggle } from '../../components/InputToggle';
import { UIButton } from '../../components/UIButton';
import { ListModal } from '../../components/ListModal';
import { InputModal } from '../../components/InputModal';
import { AccountModal } from '../../components/AccountModal';
import { IAccount } from '../../global/interfaces';
import * as Localization from 'expo-localization';
import { Header } from '../../components/Header';
import { UIIcon } from '../../components/UIIcon';

export function Settings() {
  const { signOut, cleanStorage, user, accounts } = useAuth()
  const navigation = useNavigation()

  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('')
  const [currency, setCurrency] = useState('')
  const [account, setAccount] = useState({} as IAccount)

  const [languageModalVisible, setLanguageModalVisible] = useState(false)
  const [accountModalVisible, setAccountModalVisible] = useState(false)
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false)

  const languages = [
    {id: 'pt-BR', title: 'Portugues'},
    {id: 'us', title: 'English'}
  ]

  const currencys = [
    {id: 'BRL', title: 'Real'},
    {id: 'USD', title: 'Dolar'}
  ]

  function handleConfirm() {

  }

  return (
    <Container>
      <Header
        title="Configuração"
      />

      <GoBackHeader onPress={() => navigation.goBack()}>
        <UIIcon
          icon_interface="chevron-left"
          size={30}
        />
        <GoBackTitle>Voltar</GoBackTitle>
      </GoBackHeader>


      <Inputs>
      <InputToggle
        title='Tema escuro' 
        color="main"
        state={darkMode}
        setState={setDarkMode}
        icon="check-square"
      />
      <InputModal
        title={'Lingua: ' + user.language}
        color="title"
        setOpenModal={setLanguageModalVisible}
        icon="check-square"
      />
      <InputModal
        title={'Moeda: ' + user.currency}
        color="title"
        setOpenModal={setCurrencyModalVisible}
        icon="check-square"
      />
      <InputModal
        title={'Conta principal: ' + accounts.find(account => account.id === user.default_account_id)?.name}
        color="title"
        setOpenModal={setAccountModalVisible}
        icon="check-square"
      />
      </Inputs>

      <ListModal
        visible={languageModalVisible}
        setVisible={setLanguageModalVisible}
        setState={setLanguage}
        data={languages}
      />

      <AccountModal
        visible={accountModalVisible}
        setVisible={setAccountModalVisible}
        setAccount={setAccount}
      />

      <ListModal
        visible={currencyModalVisible}
        setVisible={setCurrencyModalVisible}
        setState={setCurrency}
        data={currencys}
      />
    </Container>
  );
}
