import React from 'react';
import { Button } from 'react-native';
import { GoBackButton } from '../../components/GoBackButton';
import { useAuth } from '../../hooks/auth';

import {
  Container
} from './styles';

export function Settings() {
  const { signOut, cleanStorage } = useAuth();
  return (
    <Container>
      <GoBackButton color="title" />
      <Button title="Sair da conta" onPress={signOut} />
      <Button title="Limpar Dados" onPress={cleanStorage} />
    </Container>
  );
}
