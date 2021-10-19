import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import theme from '../../global/theme'
import { AuthProvider } from '../auth'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}