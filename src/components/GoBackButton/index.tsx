import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme, DefaultTheme } from 'styled-components/native';

import {
  Container
} from './styles';

export function GoBackButton({color, navigation}: { 
  color: keyof DefaultTheme['colors'];
  navigation: any;
}) {
  const theme = useTheme();

  function handlePress() {
    navigation.goBack();
  }
  return (
    <Container onPress={handlePress}>
      <Feather
        name="chevron-left"
        color={theme.colors[color]}
        size={RFValue(30)}
      />
    </Container>
  );
}
