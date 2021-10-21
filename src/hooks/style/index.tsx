import React, { createContext, ReactNode, useContext } from 'react'
import { StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';

interface IStyle {
  money: {
    hide: any;
  };
}

const StyleContext = createContext<IStyle>({} as IStyle);

function StyleProvider({children}: {children: ReactNode}) {
  const theme = useTheme()
	const money = StyleSheet.create({
		hide: {
			color: theme.colors.line,
			backgroundColor: theme.colors.line,
			borderRadius: theme.display.border_radius
		}
	})
  const style = {
    money
  }
  return (
    <StyleContext.Provider value={style}>
      {children}
    </StyleContext.Provider>
  )
}

function useStyle() {
  const context = useContext(StyleContext)
  return context
}

export {
  StyleProvider,
  useStyle
}