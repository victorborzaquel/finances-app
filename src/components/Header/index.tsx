import React from 'react';
import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';
import { UIIcon } from '../../components/UIIcon';
import {
  IconAccountNameType,
  IconCategoryNameType,
  IconInterfaceNameType,
  ThemeColorType
} from '../../global/interfaces';

import {
  Container,
  IconButton,
  Icons,
  Title,
  Wrapper
} from './styles';

interface IIcon {
  iconName: IconInterfaceNameType;
  color?: ThemeColorType;
  size?: number;
  onPress?: () => void;
  hidden?: boolean;
}

interface Props {
  title: string;
  children?: React.ReactNode;
  icons?: IIcon[] | IIcon;
}

export function Header({ title, icons }: Props) {
  const isArray = Array.isArray(icons)
  const isObject = !Array.isArray(icons) && typeof icons === 'object'

  return (
    <Container>
      <Title>{title}</Title>

      {isObject && !icons.hidden && (
        <IconButton onPress={icons.onPress} key={icons.iconName}>
          <UIIcon
            icon_interface={icons.iconName}
            color={icons.color || "background_secondary"}
            size={icons.size || 20}
          />
        </IconButton>
      )}
      {isArray && (
        <Icons>
          {icons.map(icon => !icon.hidden && (
            <IconButton onPress={icon.onPress} key={icon.iconName}>
              <UIIcon
                icon_interface={icon.iconName}
                color={icon.color || "background_secondary"}
                size={icon.size || 20}
              />
            </IconButton>
          ))}
        </Icons>
      )}
    </Container>
  );
}