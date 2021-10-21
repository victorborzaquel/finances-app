import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import theme from '../../global/themes'
import { AuthProvider } from '../auth'
import { CachedProvider } from '../cached'
import { StyleProvider } from '../style'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CachedProvider>
          <StyleProvider>
            {children}
          </StyleProvider>
        </CachedProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}