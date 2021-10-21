import { IUser } from "../global/interfaces";

interface Props {
  language: IUser['language'];
  theme: IUser['theme'];
  currency: IUser['currency'];
}

const UserDefaultData: Props = {
  language: 'pt-BR',
  theme: 'auto',
  currency: 'BRL',
}

export default UserDefaultData;