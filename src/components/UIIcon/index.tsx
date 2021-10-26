import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  IconAccountNameType,
  IconCategoryNameType,
  IconInterfaceNameType,
  ThemeColorType
} from '../../global/interfaces';
import { useTheme } from 'styled-components/native';
import { getIconName } from '../../utils/getIconName';
import IconData from '../../data/IconData';

export function UIIcon({
  icon_category,
  icon_account,
  icon_interface,
  color = 'title',
  size = 40
}: {
  icon_category?: IconCategoryNameType,
  icon_account?: IconAccountNameType,
  icon_interface?: IconInterfaceNameType,
  color?: ThemeColorType,
  size?: number
}) {
  const theme = useTheme()

  function featherIconName() {
    if (icon_interface) return IconData.interface[icon_interface]
  }

  function IoniconsIconName() {
    if (icon_category) return IconData.category[icon_category]
    else if (icon_account) return IconData.account[icon_account]
  }

  return (
    <>
      {!!icon_interface
        ? (
          <Feather
            name={featherIconName() || 'user'}
            size={RFValue(size)}
            color={theme.colors[color]}
          />
        ) : (
          <Ionicons
            name={IoniconsIconName() || 'people'}
            size={RFValue(size)}
            color={theme.colors[color]}
          />
        )
      }
    </>
  )
}