import React from 'react'
import {Ionicons} from '@expo/vector-icons';
import { Container } from './styles';
import { IconAccountNameType, IconCategoryNameType, IIcon } from '../../global/interfaces';
import { useTheme } from 'styled-components/native';
import ColorsData from '../../data/ColorsData';
import IconData from '../../data/IconData';
import { RFValue } from 'react-native-responsive-fontsize';

export function UIIconCircle({
  icon_category, 
  icon_account,
  color_name,
  size=40
}: {
  icon_category?: IconCategoryNameType,
  icon_account?: IconAccountNameType,
  color_name?: IIcon['color_name'],
  size?: number
}) {
	const theme = useTheme()

  function IoniconsIconName() {
    if (icon_category) return IconData.category[icon_category]
    else if (icon_account) return IconData.account[icon_account]
  }
	return (
    <Container
      color={ColorsData[color_name || 'black']}
      size={RFValue(size)}
    >
      <Ionicons
        name={IoniconsIconName()}
        size={RFValue(size / 2)}
        color={theme.colors.background}
      />
    </Container>
  )
}
