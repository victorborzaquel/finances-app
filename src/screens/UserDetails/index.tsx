import React, { useState } from 'react';
import { Button } from 'react-native';
import { GoBackButton } from '../../components/GoBackButton';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native'

import {
  Buttons,
  Container, Content, GoBackHeader, GoBackTitle, UserName
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
import { UIAccountIcon } from '../../components/UIAccountIcon';
import { AvatarImage } from '../../components/AvatarImage';
import { t } from 'i18n-js';

export function UserDetails() {
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
    { id: 'pt-BR', title: 'Portugues' },
    { id: 'us', title: 'English' }
  ]

  const currencys = [
    { id: 'BRL', title: 'Real' },
    { id: 'USD', title: 'Dolar' }
  ]

  function handleConfirm() {

  }

  return (
    <Container>
      <Header
        title={t('Details')}
      />

      <GoBackHeader onPress={() => navigation.goBack()}>
        <UIIcon
          icon_interface="chevron-left"
          size={30}
        />
        <GoBackTitle>{t('Go back')}</GoBackTitle>
      </GoBackHeader>

      <Content>
        <AvatarImage
          size={120}
        />

        <UserName>{user.name}</UserName>

      </Content>

      <Buttons>
        <UIButton
          title={t('Logout')}
          color='attention'
          onPress={signOut}
        />
        {/* <UIButton
          title={t('Delete account')}
          color='attention'
          onPress={cleanStorage}
        /> */}
      </Buttons>
    </Container>
  );
}
