import { t } from 'i18n-js';
import React from 'react';
import { Header } from '../../components/Header';

import {
  Container, 
  Content, 
  Title
} from './styles';

export function Goals() {
  return (
    <Container>
      <Header
        title={t('Goals')}
      />

      <Content>
        <Title>{t('Coming soon')}</Title>
      </Content>
    </Container>
  );
}
