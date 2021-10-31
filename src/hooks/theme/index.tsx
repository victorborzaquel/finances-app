import React from 'react'
import { useColorScheme } from 'react-native'
import { ThemeProvider as StyledProvider } from 'styled-components/native'
import themes from '../../global/themes'
import { useAuth } from '../auth'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  const deviceTheme = useColorScheme() === 'dark' ? 'dark' : 'light'
  const appTheme = user.theme === 'auto' ? deviceTheme : user.theme || deviceTheme

  const theme = themes[appTheme]

  return (
    <StyledProvider theme={theme}>
      {children}
    </StyledProvider>
  )
}