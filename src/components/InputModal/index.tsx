import React from 'react';
import { IconInterfaceNameType, ThemeColorType } from '../../global/interfaces';
import { UIIcon } from '../UIIcon';

import {
  Container, 
  Content, 
  Title
} from './styles';

export function InputModal({ title, setOpenModal, icon, color="text" }: {
  title: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  icon: IconInterfaceNameType;
  color?: ThemeColorType;
}) {
  return (
    <Container onPress={() => setOpenModal(prev => !prev)}>
      <Content>
        <UIIcon
          color="subtitle"
          icon_interface={icon}
          size={26}
        />
        <Title color={color}>{title}</Title>
      </Content>

      <UIIcon
          color="text"
          icon_interface="chevron-right" 
          size={26}
        />
    </Container>
  );
}
