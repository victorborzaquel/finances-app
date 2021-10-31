import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native'

import {
  Buttons,
  Container, Content, GoBackHeader, GoBackTitle, UserName
} from './styles';
import { UIButton } from '../../components/UIButton';
import { AvatarImage } from '../../components/AvatarImage';
import { t } from 'i18n-js';
import { UIIcon } from '../../components/UIIcon';
import { Header } from '../../components/Header';

export function UserDetails() {
  const { signOut, cleanStorage, user } = useAuth()
  const navigation = useNavigation()

  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) navigation.goBack()
  }, [isFocused])

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
        <UIButton
          title={t('Delete account')}
          color='attention'
          onPress={cleanStorage}
        />
      </Buttons>
    </Container>
  );
}
