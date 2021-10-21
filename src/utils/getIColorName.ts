import { IIcon } from '../global/interfaces';

export function getColorName(name: IIcon['color_name']): string {
  switch (name) {
    case 'orange':
      return '#454243';
    default:
      return '#546721';
  }
}