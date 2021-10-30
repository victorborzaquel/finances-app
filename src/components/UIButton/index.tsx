import React from 'react';
import { ButtonType } from '../../global/interfaces';

import {
  Container, Title
} from './styles';

export function UIButton({press=false, title='Button', color='main', onPress=() => {}, heightDivider = 1, ...rest}: {
  press?: boolean;
  title?: string;
  color?: ButtonType;
  heightDivider?: number;
  onPress?: () => void;
}) {
  return (
    <Container
      press={press} 
      color={color} 
      disabled={press} 
      onPress={onPress}
      heightDivider={heightDivider}
      {...rest}
    >
      <Title
        color={color} 
        press={press}
      >
        {title}
      </Title>
    </Container>
  );
}
