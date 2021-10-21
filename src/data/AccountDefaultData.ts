import { IAccount } from "../global/interfaces";

const AccountDefaultData: {
  id: IAccount['id'],
  icon_name: IAccount['icon_name'],
  color_name: IAccount['color_name'],
  name: IAccount['name'],
  type: IAccount['type'],
}[] = [
  {id: '1',icon_name: 'wallet',color_name: 'green_dark',name: 'wallet',type: 'wallet'},
  {id: '2',icon_name: 'globe',color_name: 'blue',name: 'bank',type: 'bank'},
]

export default AccountDefaultData;