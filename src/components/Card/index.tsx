import React from 'react';
import { ViewProps } from 'react-native';

import {
  Container, 
  Title,
  Header
} from './styles';

export function Card({title, children, contentPadding=false, ...rest}: {
  title?: string;
  children?: React.ReactNode;
  contentPadding?: boolean;
} & ViewProps) {
  return (
    <Container contentPadding={contentPadding} {...rest}>
      {!!title && (
        <Header contentPadding={contentPadding}>
          <Title>{title}</Title>
        </Header>
      )}

      {children}
    </Container>
  );
}
