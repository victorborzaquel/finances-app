import { ICategory } from "../global/interfaces";
import IconData from '../data/IconData'

interface Props {
  id: string;
  name: string;
  icon_name: keyof typeof IconData['category'];
  color_name: ICategory['color_name'];
  type: ICategory['type'];
}

const CategoryDefaultData: Props[] = [
  {id: '1', type: 'expense', name: 'Clothing', icon_name: 'shirt', color_name: 'blue'},
  {id: '2', type: 'expense', name: 'Education', icon_name: 'book', color_name: 'purple'},
  {id: '3', type: 'expense', name: 'Electronics', icon_name: 'tv', color_name: 'grey'},
  {id: '4', type: 'expense', name: 'Heath', icon_name: 'medkit', color_name: 'green'},
  {id: '5', type: 'expense', name: 'Home', icon_name: 'home', color_name: 'grey_light'},
  {id: '6', type: 'expense', name: 'Leisure', icon_name: 'umbrella', color_name: 'yellow_dark'},
  {id: '8', type: 'expense', name: 'Restaurant', icon_name: 'fast-food', color_name: 'orange'},
  {id: '9', type: 'expense', name: 'Services', icon_name: 'build', color_name: 'yellow'},
  {id: '10', type: 'expense', name: 'Supermarket', icon_name: 'cart', color_name: 'blue_dark'},
  {id: '11', type: 'expense', name: 'Transportation', icon_name: 'bus', color_name: 'orange_dark'},
  {id: '12', type: 'expense', name: 'Travel', icon_name: 'airplane', color_name: 'green_light'},

  {id: '101', type: 'income', name: 'Awards', icon_name: 'star', color_name: 'red'},
  {id: '102', type: 'income', name: 'Gift', icon_name: 'gift', color_name: 'yellow'},
  {id: '103', type: 'income', name: 'Investments', icon_name: 'trending-up', color_name: 'grey'},
  {id: '105', type: 'income', name: 'Salary', icon_name: 'cash', color_name: 'orange'},
  {id: '106', type: 'income', name: 'Business', icon_name: 'business', color_name: 'grey_dark'},
  {id: '107', type: 'income', name: 'Passive', icon_name: 'reload', color_name: 'pink'},
  {id: '108', type: 'transfer', name: 'Extra', icon_name: 'add', color_name: 'purple'},
]
export const otherCategory: {
  income: Props;
  expense: Props;
  transfer: Props;
  'credit-card': Props;
} = {
  income: {id: 'incomeOthers', type: 'income', name: 'Others', icon_name: 'ellipsis-horizontal', color_name: 'black'},
  expense: {id: 'expenseOthers', type: 'expense', name: 'Others', icon_name: 'ellipsis-horizontal', color_name: 'black'},
  transfer: {id: 'transferOthers', type: 'transfer', name: 'Others', icon_name: 'ellipsis-horizontal', color_name: 'black'},
  'credit-card': {id: 'creditCardOthers', type: 'credit-card', name: 'Others', icon_name: 'ellipsis-horizontal', color_name: 'black'},
}


export default CategoryDefaultData;