import React from 'react';
import { ButtonType } from '../../global/interfaces';

import {
  Container, Title
} from './styles';

export function UIButton({press=false, title, color, onPress, ...rest}: {
  press?: boolean;
  title: string;
  color: ButtonType;
  onPress: any;
}) {
  return (
    <Container
      press={press} 
      color={color} 
      disabled={press} 
      onPress={onPress}
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
