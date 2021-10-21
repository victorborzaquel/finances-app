import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { IIcon } from '../global/interfaces';

export function getIconName(name: IIcon['icon_name']): ComponentProps<typeof Ionicons>['name'] {
  switch (name) {
    case 'home':
      return 'home';
    default:
      return 'person';
  }
}