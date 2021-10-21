import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme, DefaultTheme } from 'styled-components/native';

import {
  Container
} from './styles';

export function GoBackButton({color}: { color: keyof DefaultTheme['colors']}) {
  const navigation = useNavigation();
  const theme = useTheme();

  function handlePress() {
    navigation.goBack();
  }
  return (
    <Container onPress={handlePress}>
      <Feather
        name="chevron-left"
        color={theme.colors[color]}
        size={RFValue(24)}
      />
    </Container>
  );
}
