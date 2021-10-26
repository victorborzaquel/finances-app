import React from 'react';

import {
  Container,
  Icons,
  Title,
  Wrapper
} from './styles';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export function Header({title, children}: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      
      {!!children && (
        <Icons>
          {React.Children.map(children, child => (
            <Wrapper>{child}</Wrapper>
          ))}
        </Icons>
      )}
    </Container>
  );
}