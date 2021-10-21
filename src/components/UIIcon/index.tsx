import React from 'react'
import {Ionicons} from '@expo/vector-icons';
import { Container } from './styles';
import { IIcon } from '../../global/interfaces';
import { getIconName } from '../../utils/getIconName';
import { getColorName } from '../../utils/getIColorName';
import { useTheme } from 'styled-components/native';

export function UIIcon({
  icon_name, 
  color_name,
  size=40
}: {
  icon_name: IIcon['icon_name'], 
  color_name: IIcon['color_name'],
  size?: number
}) {
	const theme = useTheme()

	return (
    <Container
      color={getColorName(color_name)}
      size={size}
    >
      <Ionicons
        name={getIconName(icon_name)}
        size={size / 2}
        color={theme.colors.background}
      />
    </Container>
  )
}
