import ColorsData from '../../data/ColorsData';
import IconData from '../../data/IconData';

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;


type TransactionType = 'income' | 'expense';
type AccountType = 'checking' | 'wallet' | 'saving' | 'investment' | 'bank' | 'others';
type IconType = 'credit-card' | 'category' | 'wallet';
type IconCategoryNameType = typeof IconData['category'][number];
type IconAccountNameType = typeof IconData['account'][number];
type IconInterfaceNameType = typeof IconData['interface'][number];
type ColorNameType = keyof typeof ColorsData;

type ThemeType = 'light' | 'dark' | 'auto';
type LanguageType = 'pt-BR' | 'us';
type CurrencyType = 'USD' | 'EUR' | 'BRL';

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
}

interface ITransaction {
  id: string;
  user_id: IUser['id'];
  type: TransactionType;
  amount: number;
  date: Date;
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
  amount: number;
  date: Date;
  installments: number;
  confirmed: boolean;
  note: string;
  favorite: boolean;
}

interface ICategory {
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
  category_name: ICategory['name'];
  amount: number;
}

// UI
interface IColor {
  color_name: ColorNameType;
}

interface IIcon {
  icon_name: IconInterfaceNameType;
  color_name: ColorNameType;
}

export {
  ElementType,
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