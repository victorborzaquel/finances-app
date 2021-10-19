import React, { useState } from 'react';
import { Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import {
  Button,
  ButtonLogo,
  ButtonLogoWrapper,
  Buttons,
  ButtonTitle,
  Container,
  Header,
  Loader,
  LogoTitle
} from './styles';

export function Login() {
  const theme = useTheme();
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      Alert.alert('Ops', 'Não foi possivel entrar com a conta google.')
      console.log('Erro ao entrar com a conta google: ' + error.message)
    } 
  }
  return (
    <Container>
      <Header>
        <LogoSvg width={100} height={90} fill={theme.colors.main} />
        <LogoTitle>My Finances</LogoTitle>
      </Header>

      <Buttons>
        <Button
          loading={loading}
          style={styles.shadow} 
          onPress={handleSignInWithGoogle}
          enabled={!loading}
        >
          <ButtonLogoWrapper>
            <ButtonLogo source={require('../../assets/googleLogo.png')} />
          </ButtonLogoWrapper>

          <ButtonTitle>Entrar com Google</ButtonTitle>

          <Loader loading={loading}>
            <ActivityIndicator
              size="small" 
              color={theme.colors.main} 
            />
          </Loader>
        </Button>
      </Buttons>
    </Container>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  }
})