import React from 'react';
import { useTheme } from 'styled-components/native';
import { IconInterfaceNameType } from '../../global/interfaces';
import { UIIcon } from '../UIIcon';

import {
  Container, 
  Input
} from './styles';

export function InputText({ title, icon, state, setState }: {
  title: string;
  icon: IconInterfaceNameType;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) {
  const theme = useTheme()
  return (
    <Container>
      <UIIcon
        color="subtitle" 
        icon_interface={icon}
        size={26}
      />
      <Input  
        placeholder={title}
        placeholderTextColor={theme.colors.text_details}
        value={state}
        onChangeText={setState}
      />
    </Container>
  );
}
