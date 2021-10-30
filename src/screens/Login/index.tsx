import { t } from 'i18n-js'
import React, { useState } from 'react'
import { Alert, StyleSheet, ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components/native'
import LogoSvg from '../../assets/logo.svg'
import { StatusBarBackground } from '../../components/StatusBarBackground'
import { useAuth } from '../../hooks/auth'

import {
  Button,
  ButtonLogo,
  ButtonLogoWrapper,
  Buttons,
  ButtonTitle,
  Container,
  Header,
  Loader,
  LogoTitle,
  Subtitle,
  Title,
  TitleWrapper
} from './styles'

export function Login() {
  const theme = useTheme()
  const { signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)

  async function handleSignInWithGoogle() {
    let isActive = true
    try {
      setLoading(true)
      return await signInWithGoogle()
    } catch (error: any) {
      Alert.alert('Ops', 'Não foi possivel entrar com a conta google.')
      console.log('Erro ao entrar com a conta google: ' + error.message)
    } finally {
      if (isActive) {
        setLoading(false)
      }
    }

    return () => {
      isActive = false
    }
  }
  return (
    <Container>
      <StatusBarBackground color="main" />
      <Header>
        <LogoSvg width={70} height={60} fill={theme.colors.main} />
        <LogoTitle>My Finances</LogoTitle>
      </Header>

      <TitleWrapper>
        <Title>
          {
            t('Take control') + '\n' +
            t('of your finances')
          }
        </Title>
      </TitleWrapper>

      <Buttons>
        <Subtitle>
          {
            t('Login with your') + '\n' +
            t('google account')
          }
        </Subtitle>

        <Button
          loading={loading}
          style={styles.shadow}
          onPress={handleSignInWithGoogle}
          enabled={!loading}
        >
          <ButtonLogoWrapper>
            <ButtonLogo source={require('../../assets/googleLogo.png')} />
          </ButtonLogoWrapper>

          <ButtonTitle>{t('Login with Google')}</ButtonTitle>

          <Loader loading={loading}>
            <ActivityIndicator
              size="small"
              color={theme.colors.main}
            />
          </Loader>
        </Button>
      </Buttons>

    </Container>
  )
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