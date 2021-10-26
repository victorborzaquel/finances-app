import IconData from '../data/IconData';
import { 
  IconAccountNameType, 
  IconCategoryNameType, 
  IconInterfaceNameType 
} from '../global/interfaces';

export function getIconName({
  icon_category,
  icon_account,
  icon_interface
}: {
  icon_category?: IconCategoryNameType,
  icon_account?: IconAccountNameType,
  icon_interface?: IconInterfaceNameType
}) {
  if (icon_account) return IconData.account[icon_account]
  else if (icon_category) return IconData.category[icon_category]
  else if (icon_interface) return IconData.interface[icon_interface]
}