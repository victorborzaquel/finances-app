import { IUser } from "../global/interfaces";

interface Props {
  language: IUser['language'];
  theme: IUser['theme'];
  currency: IUser['currency'];
}

const AccountDefaultData: Props = {
  language: 'pt-BR',
  theme: 'auto',
  currency: 'BRL',
}

export default AccountDefaultData;