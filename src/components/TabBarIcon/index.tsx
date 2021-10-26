import React, { ComponentProps } from 'react'
import {Feather} from '@expo/vector-icons';
import { ThemeColorType } from '../../global/interfaces';
import { useTheme } from 'styled-components/native';

type TabBarIconNameType = ComponentProps<typeof Feather>['name'];

function TabBarIcon({
  name,
  color='title',
  size=40
}: {
  name: TabBarIconNameType, 
  color?: ThemeColorType,
  size?: number
}) {
	const theme = useTheme()

	return (
    <Feather
      name={name || 'home'}
      size={size}
      color={theme.colors[color]}
    />
  )
}

export {
  TabBarIcon,
  TabBarIconNameType
}