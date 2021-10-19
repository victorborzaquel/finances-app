import React from 'react';
import { Button } from 'react-native';
import { useAuth } from '../../hooks/auth';

import {
  Container
} from './styles';

export function Dashboard() {
  const {signOut} = useAuth();
  return (
    <Container>
      <Button onPress={signOut} title="Dashboard" />
    </Container>
  );
}
