import React from 'react';
import { DefaultTheme } from 'styled-components/native';

import {
  Container
} from './styles';

export function StatusBarBackground({ color }: { color: keyof DefaultTheme['colors'] }) {
  return (
    <Container color={color} />
  );
}
