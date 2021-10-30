import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import theme from '../../global/themes'
import { AuthProvider } from '../auth'
import { CachedProvider } from '../cached'
import { DataProvider } from '../data'
import { LocalizationProvider } from '../localization'
import { StyleProvider } from '../style'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LocalizationProvider>
          <DataProvider>
            <CachedProvider>
              <StyleProvider>
                {children}
              </StyleProvider>
            </CachedProvider>
          </DataProvider>
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}