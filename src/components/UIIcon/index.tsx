import React from 'react'
import {Ionicons} from '@expo/vector-icons';
import { Container } from './styles';
import { IIcon } from '../../global/interfaces';
import { useTheme } from 'styled-components/native';
import ColorsData from '../../data/ColorsData';

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
  ColorsData
	return (
    <Container
      color={ColorsData[color_name]}
      size={size}
    >
      <Ionicons
        name={icon_name}
        size={size / 2}
        color={theme.colors.background}
      />
    </Container>
  )
}
