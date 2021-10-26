import ColorsData from '../../data/ColorsData';
import IconData from '../../data/IconData';
import themes from '../themes';

type ButtonType = 'main' | 'secondary' | 'attention' | 'success';

type TransactionType = 'income' | 'expense' | 'transfer' | 'credit-card';
type AccountType = 'checking' | 'wallet' | 'saving' | 'investment' | 'bank' | 'others';
type IconType = 'credit-card' | 'category' | 'wallet';
type IconCategoryNameType = keyof typeof IconData['category'];
type IconAccountNameType = keyof typeof IconData['account'];
type IconInterfaceNameType =  keyof typeof IconData['interface'];
type ColorNameType = keyof typeof ColorsData;
type ThemeColorType = keyof typeof themes.colors;

type ThemeType =    'auto' | 'light' | 'dark';
type LanguageType = 'auto' | 'pt-BR' | 'us';
type CurrencyType = 'auto' | 'BRL'   | 'USD';

// DATA
interface IUser {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  email_verified?: boolean;
  google_id?: string;

  language: LanguageType;
  theme: ThemeType;
  currency: CurrencyType;

  default_account_id: string;
}

interface ITransaction {
  id: string;
  user_id: IUser['id'];
  category_id: ICategory['id'];
  account_id: IAccount['id'];
  type: TransactionType;
  amount: number;
  date: Date;
  ignore: boolean;
  description: string;
  confirmed: boolean;
  recurring: boolean;
  repeat_quant: number;
  repeat_period: number;
  note: string;
  favorite: boolean;
}

interface ITransfer {
  id: string;
  user_id: IUser['id'];
  account_origin_id: IAccount['id'];
  account_destination_id: IAccount['id'];
  description: string;
  amount: number;
  note: string;
  date: Date;
  recurring: boolean;
}

interface ICreditCard {
  id: string;
  user_id: IUser['id'];
  icon_name: IconAccountNameType;
  color_name: IColor['color_name'];
  name: string;
  limit: number;
}

interface ICreditCardTransaction {
  id: string;
  user_id: IUser['id'];
  category_id: ICategory['id'];
  amount: number;
  date: Date;
  installments: number;
  confirmed: boolean;
  note: string;
  favorite: boolean;
}

interface ICategory {
  id: string;
  name: string;
  user_id: IUser['id'];
  icon_name: IconCategoryNameType;
  color_name: IColor['color_name'];
  type: TransactionType;
}

interface IAccount {
  id: string;
  user_id: IUser['id'];
  icon_name: IconAccountNameType;
  color_name: IColor['color_name'];
  name: string;
  type: AccountType;
}

interface IExpenseLimit {
  id: string;
  user_id: IUser['id'];
  category_id: ICategory['id'];
  amount: number;
}

// UI
interface IColor {
  color_name: ColorNameType;
}

interface IIcon {
  icon_name: IconCategoryNameType | IconAccountNameType;
  color_name: ColorNameType;
}
export {
  ButtonType,
  TransactionType,
  IconCategoryNameType,
  IconAccountNameType,
  IconInterfaceNameType,
  LanguageType,
  ThemeColorType,
  IUser,
  ITransaction,
  ITransfer,
  ICreditCard,
  ICreditCardTransaction,
  ICategory,
  IAccount,
  IExpenseLimit,
  IColor,
  IIcon
}