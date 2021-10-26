import { IUser } from "../global/interfaces";

interface Props {
  language: IUser['language'];
  theme: IUser['theme'];
  currency: IUser['currency'];
}

const UserDefaultData: Props = {
  language: 'auto',
  theme: 'auto',
  currency: 'auto',
}

export default UserDefaultData;