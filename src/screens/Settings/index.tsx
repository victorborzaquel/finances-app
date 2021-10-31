import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native'

import {
  Container,
  Footer,
  GoBackHeader,
  GoBackTitle,
  Inputs
} from './styles';
import { InputModal } from '../../components/InputModal';
import { Header } from '../../components/Header';
import { UIIcon } from '../../components/UIIcon';
import { ListSelect } from '../../components/ListSelect';
import { Modalize } from 'react-native-modalize';
import { useModalize } from '../../hooks/modalize';
import { UIButton } from '../../components/UIButton';
import { t } from 'i18n-js';

export function Settings() {
  const { user, accounts, signOut } = useAuth()
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const { createModalize } = useModalize()

  const languageModal = createModalize()
  const currencyModal = createModalize()
  const accountModal = createModalize()
  const themeModal = createModalize()

  const languages = [
    { id: 'pt-BR', name: 'Portugues' },
    { id: 'us', name: 'English' },
    { id: 'auto', name: 'Auto' },
  ]

  const currencys = [
    { id: 'pt-BR', name: 'Real' },
    { id: 'us', name: 'Dolar' },
    { id: 'auto', name: 'Auto' },
  ]

  const themes = [
    { id: 'dark', name: 'Dark' },
    { id: 'light', name: 'Light' },
    { id: 'auto', name: 'Auto' },
  ]

  function handleConfirm() {

  }

  useEffect(() => {
    if (!isFocused) navigation.goBack()
  }, [isFocused])

  return (
    <>
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
        <InputModal
          title={'Tema: ' + themes.find(theme => theme.id === user.theme)?.name}
          color="title"
          setOpenModal={themeModal.open}
          icon="check-square"
        />
        <InputModal
          title={'Lingua: ' + languages.find(language => language.id === user.language)?.name}
          color="title"
          setOpenModal={languageModal.open}
          icon="check-square"
        />
        <InputModal
          title={'Moeda: ' + currencys.find(currency => currency.id === user.currency)?.name}
          color="title"
          setOpenModal={currencyModal.open}
          icon="check-square"
        />
        <InputModal
          title={'Conta principal: ' + accounts.find(account => account.id === user.default_account_id)?.name}
          color="title"
          setOpenModal={accountModal.open}
          icon="check-square"
        />
      </Inputs>

      <Footer>
        <UIButton
          title={t('Logout')}
          color='attention'
          onPress={signOut}
        />
      </Footer>
      
    </Container>

          <Modalize // Theme
        ref={themeModal.ref}
        adjustToContentHeight
      >
        <ListSelect
          userUpdate='theme'
          close={themeModal.close}
          data={themes}
        />
      </Modalize>

      <Modalize // Currency
        ref={currencyModal.ref}
        adjustToContentHeight
      >
        <ListSelect
          userUpdate='currency'
          close={currencyModal.close}
          data={currencys}
        />
      </Modalize>

      <Modalize // Language
        ref={languageModal.ref}
        adjustToContentHeight
      >
        <ListSelect
          userUpdate='language'
          close={languageModal.close}
          data={languages}
        />
      </Modalize>

      <Modalize // Account
        ref={accountModal.ref}
        adjustToContentHeight
      >
        <ListSelect
          userUpdate='default_account_id'
          close={accountModal.close}
          data={accounts}
          type="account"
        />
      </Modalize>
    </>
  );
}
