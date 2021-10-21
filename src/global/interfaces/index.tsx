type TransactionType = 'income' | 'expense';
type WalletType = 'checking' | 'wallet' | 'saving' | 'investment' | 'others';
type IconType = 'credit-card' | 'category' | 'wallet';
type IconNameType = 'home';
type ColorNameType = 'blue' | 'green' | 'yellow' | 'white' | 'black' | 'orange' | 'purple';

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
  account_origin_id: IAcount['id'];
  account_destination_id: IAcount['id'];
  description: string;
  amount: number;
  note: string;
  date: Date;
  recurring: boolean;
}

interface ICreditCard {
  id: string;
  user_id: IUser['id'];
  icon_name: IIcon['icon_name'];
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
  id: string;
  user_id: IUser['id'];
  icon_name: IIcon['icon_name'];
  color_name: IColor['color_name'];
  type: TransactionType;
}

interface IAcount {
  id: string;
  user_id: IUser['id'];
  icon_name: IIcon['icon_name'];
  color_name: IColor['color_name'];
  name: string;
  type: WalletType;
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
  color: string;
}

interface IIcon {
  icon_name: IconNameType;
  color_name: ColorNameType;
  type: IconType;
}

export {
  IUser,
  ITransaction,
  ITransfer,
  ICreditCard,
  ICreditCardTransaction,
  ICategory,
  IAcount,
  IExpenseLimit,
  IColor,
  IIcon
}