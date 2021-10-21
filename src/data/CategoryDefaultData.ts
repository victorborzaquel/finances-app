import { ICategory } from "../global/interfaces";
import IconData from '../data/IconData'

const CategoryDefaultData: {
  id: string;
  name: string;
  icon_name: typeof IconData['category'][number];
  color_name: ICategory['color_name'];
  type: ICategory['type'];
}[] = [
  {id: '1', type: 'expense', name: 'clothing', icon_name: 'shirt', color_name: 'blue'},
  {id: '2', type: 'expense', name: 'education', icon_name: 'book', color_name: 'purple'},
  {id: '3', type: 'expense', name: 'electronics', icon_name: 'tv', color_name: 'grey'},
  {id: '4', type: 'expense', name: 'heath', icon_name: 'medkit', color_name: 'green'},
  {id: '5', type: 'expense', name: 'home', icon_name: 'home', color_name: 'grey_light'},
  {id: '6', type: 'expense', name: 'leisure', icon_name: 'umbrella', color_name: 'yellow_dark'},
  {id: '7', type: 'expense', name: 'others', icon_name: 'ellipsis-horizontal', color_name: 'black'},
  {id: '8', type: 'expense', name: 'restaurant', icon_name: 'fast-food', color_name: 'orange'},
  {id: '9', type: 'expense', name: 'services', icon_name: 'build', color_name: 'yellow'},
  {id: '10', type: 'expense', name: 'supermarket', icon_name: 'cart', color_name: 'blue_dark'},
  {id: '11', type: 'expense', name: 'transportation', icon_name: 'bus', color_name: 'orange_dark'},
  {id: '12', type: 'expense', name: 'travel', icon_name: 'airplane', color_name: 'green_light'},


  {id: '101', type: 'income', name: 'awards', icon_name: 'star', color_name: 'red'},
  {id: '102', type: 'income', name: 'gift', icon_name: 'gift', color_name: 'yellow'},
  {id: '103', type: 'income', name: 'investments', icon_name: 'trending-up', color_name: 'grey'},
  {id: '104', type: 'income', name: 'others', icon_name: 'ellipsis-horizontal', color_name: 'black'},
  {id: '105', type: 'income', name: 'salary', icon_name: 'cash', color_name: 'orange'},
  {id: '106', type: 'income', name: 'business', icon_name: 'business', color_name: 'grey_dark'},
  {id: '107', type: 'income', name: 'passive', icon_name: 'reload', color_name: 'pink'},
  {id: '108', type: 'income', name: 'extra', icon_name: 'add', color_name: 'purple'},
]

export default CategoryDefaultData;