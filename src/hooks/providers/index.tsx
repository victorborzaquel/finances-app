import React from 'react'
import { ThemeProvider } from '../theme'
import { AuthProvider } from '../auth'
import { CachedProvider } from '../cached'
import { DataProvider } from '../data'
import { LocalizationProvider } from '../localization'
import { StyleProvider } from '../style'
import { ModalizeProvider } from '../modalize'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LocalizationProvider>
          <DataProvider>
            <ModalizeProvider>
              <CachedProvider>
                <StyleProvider>
                  {children}
                </StyleProvider>
              </CachedProvider>
            </ModalizeProvider>
          </DataProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}