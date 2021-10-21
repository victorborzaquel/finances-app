import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { shadow } from '../../global/styles/shadow';
import { useAuth } from '../../hooks/auth';

import {
  Shadow,
  UserAvatar
} from './styles';

export function AvatarImage({ size = 70 }: { size?: number }) {
  const { user } = useAuth()
  const theme = useTheme()

  function colorFormattedForUrl(color: string) {
    return color.slice(1, color.length);
  }

  const UI_URL = (
    'https://ui-avatars.com/api/' +
    `?name=${user.first_name}+${user.last_name}` +
    `&size=${RFValue(size)}` +
    `&background=${colorFormattedForUrl(theme.colors.background)}` +
    `&color=${colorFormattedForUrl(theme.colors.main)}`
  );

  return (
    <Shadow
      style={shadow.eleven}
      size={RFValue(size)}
    >
      <UserAvatar
      source={{ uri: user.avatar || UI_URL }}
      size={RFValue(size)}
    />
    </Shadow>
    
  );
}
