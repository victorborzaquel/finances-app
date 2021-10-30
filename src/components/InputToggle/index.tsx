import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ButtonType, IconInterfaceNameType } from '../../global/interfaces';
import { UIIcon } from '../UIIcon';

import {
  Container, 
  Content, 
  Title
} from './styles';

export function InputToggle({ color='main', icon, title, state, setState }: {
  title: string;
  color?: ButtonType; 
  icon: IconInterfaceNameType;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme()
  return (
    <Container onPress={() => setState(prev => !prev)}>
      <Content>
        <UIIcon
          color="subtitle" 
          icon_interface={icon}
          size={26}
        />
        <Title>{title}</Title>
      </Content>

      <Switch
        trackColor={{ true: theme.colors[`${color}_light`], false: theme.colors.text_light }}
        thumbColor={state ? theme.colors[color] : theme.colors.text_details}
        ios_backgroundColor={theme.colors.text_details}
        onValueChange={setState}
        value={state}
      />
    </Container>
  );
}
