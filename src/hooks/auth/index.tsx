import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import * as AuthSession from 'expo-auth-session';
import { 
  IAccount,
  ICategory,
  ICreditCard, 
  ICreditCardTransaction, 
  IExpenseLimit, 
  ITransaction, 
  ITransfer, 
  IUser, 
} from '../../global/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UUID from 'react-native-uuid'
import UserDefaultData from '../../data/UserDefaultData';
import CategoryDefaultData from '../../data/CategoryDefaultData';
import AccountDefaultData from '../../data/AccountDefaultData';

interface IAuthContext {
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  user: IUser;
  transactions: ITransaction[];
  transfers: ITransfer[];
  creditCards: ICreditCard[];
  creditCardTransactions: ICreditCardTransaction[];
  categories: ICategory[];
  accounts: IAccount[];
  expensesLimit: IExpenseLimit[];
  authStorageLoaded: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface IUserGoogleResponse {
  email: string;
  family_name: string;
  given_name: string;
  id: number;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

interface INewUser {
  name: string;
  email: string;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  email_verified?: boolean;
  google_id?: string;
}

// Google Sign In
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

// Async Storage
const { CURRENT_USER_ID_KEY } = process.env;
const { USER_KEY } = process.env;
const { TRANSACTIONS_KEY } = process.env;
const { TRANSFERS_KEY } = process.env;
const { CREDIT_CARDS_KEY } = process.env;
const { CREDIT_CARDS_TRANSACTIONS_KEY } = process.env;
const { CATEGORIES_KEY } = process.env;
const { ACCOUNTS_KEY } = process.env;
const { EXPENSES_LIMIT_KEY } = process.env;

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [transactions, setTransactions] = useState<ITransaction[]>([] as ITransaction[]);
  const [transfers, setTransfers] = useState<ITransfer[]>([] as ITransfer[]);
  const [creditCards, setCreditCards] = useState<ICreditCard[]>([] as ICreditCard[]);
  const [creditCardTransactions, setCreditCardTransactions] = useState<ICreditCardTransaction[]>([] as ICreditCardTransaction[]);
  const [categories, setCategories] = useState<ICategory[]>([] as ICategory[]);
  const [accounts, setAccounts] = useState<IAccount[]>([] as IAccount[]);
  const [expensesLimit, setExpensesLimit] = useState<IExpenseLimit[]>([] as IExpenseLimit[]);

  const [authStorageLoaded, setAuthStorageLoaded] = useState(false);

  async function signInWithGoogle() {
    setAuthStorageLoaded(false);
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email')
      const URL = 'https://accounts.google.com/o/oauth2/v2/auth'

      const authUrl = (
        URL +
        `?client_id=${CLIENT_ID}` +
        `&redirect_uri=${REDIRECT_URI}` +
        `&response_type=${RESPONSE_TYPE}` +
        `&scope=${SCOPE}`
      );

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (type === 'success') {
        const endpoint = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        const response = await fetch(endpoint)
        const userResponse: IUserGoogleResponse = await response.json()


        const allUserStorage = await AsyncStorage.getItem(USER_KEY!)
        if (allUserStorage) {
          const allUsers = JSON.parse(allUserStorage) as IUser[];
          const userExist = allUsers.find(user => user.google_id === String(userResponse.id))
          if (userExist) return signIn(userExist.id);
        } else {
          const { 
            id, 
            email, 
            verified_email, 
            given_name, 
            family_name, 
            name, 
            picture 
          } = userResponse;

          const userFormatted = {
            google_id:      String(id),
            email_verified: verified_email,
            first_name:     given_name,
            last_name:      family_name,
            avatar:         picture,
            email,
            name,
          };
          return createAccount(userFormatted);
        } 
      } else {
        setAuthStorageLoaded(true);
      }
    } catch (error: any) {
      throw new Error(error);
    } 
  }

  async function createAccount(user: INewUser) {
    try {
      const newUser: IUser = {
        ...user,
        ...UserDefaultData,
        created_at: new Date(),
        id: String(UUID.v4()),
      };
      const userIdCategoryDefaultData: ICategory[] = CategoryDefaultData.map(category => ({...category, user_id: newUser.id}));
      const userIdAccountDefaultData: IAccount[] = AccountDefaultData.map(account => ({...account, user_id: newUser.id}));

      await AsyncStorage.setItem(USER_KEY! + newUser.id, JSON.stringify(newUser));
      await AsyncStorage.setItem(CATEGORIES_KEY! + newUser.id, JSON.stringify(userIdCategoryDefaultData));
      await AsyncStorage.setItem(ACCOUNTS_KEY! + newUser.id, JSON.stringify(userIdAccountDefaultData));
      
      signIn(newUser.id);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signIn(userId: IUser['id']) {
    setAuthStorageLoaded(false);
    try {
      const userStorage = await AsyncStorage.getItem(USER_KEY! + userId)
      const transactionsStorage = await AsyncStorage.getItem(TRANSACTIONS_KEY! + userId)
      const transfersStorage = await AsyncStorage.getItem(TRANSFERS_KEY! + userId)
      const creditCardStorage = await AsyncStorage.getItem(CREDIT_CARDS_KEY! + userId)
      const creditCardTransactionsStorage = await AsyncStorage.getItem(CREDIT_CARDS_TRANSACTIONS_KEY! + userId)
      const categoriesStorage = await AsyncStorage.getItem(CATEGORIES_KEY! + userId)
      const accountsStorage = await AsyncStorage.getItem(ACCOUNTS_KEY! + userId)
      const expensesLimitKeyStorage = await AsyncStorage.getItem(EXPENSES_LIMIT_KEY! + userId)

      if (userStorage) setUser(JSON.parse(userStorage));
      if (transactionsStorage) setTransactions(JSON.parse(transactionsStorage))
      if (transfersStorage) setTransfers(JSON.parse(transfersStorage))
      if (creditCardStorage) setCreditCards(JSON.parse(creditCardStorage))
      if (creditCardTransactionsStorage) setCreditCardTransactions(JSON.parse(creditCardTransactionsStorage))
      if (categoriesStorage) setCategories(JSON.parse(categoriesStorage))
      if (accountsStorage) setAccounts(JSON.parse(accountsStorage))
      if (expensesLimitKeyStorage) setExpensesLimit(JSON.parse(expensesLimitKeyStorage))

      await AsyncStorage.setItem(CURRENT_USER_ID_KEY!, userId);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setAuthStorageLoaded(true);
    }
  }

  async function loadAuthStorageData() {
    setAuthStorageLoaded(false);
    try {
      const currentUserIdStorage = await AsyncStorage.getItem(CURRENT_USER_ID_KEY!);

      if (currentUserIdStorage) {
        signIn(currentUserIdStorage);
      }
    } catch (error) {
      await AsyncStorage.removeItem(CURRENT_USER_ID_KEY!);
      console.log('loadUserStorageData: ' + error);
    } finally {
      setAuthStorageLoaded(true);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(CURRENT_USER_ID_KEY!);
    setUser({} as IUser);
  }

  async function cleanStorage() {
      await AsyncStorage.clear()
  }

  useEffect(() => {
    // cleanStorage();
    loadAuthStorageData();
  }, [user.id])

  return (
    <AuthContext.Provider value={{
      signInWithGoogle,
      signOut,
      user,
      transactions,
      transfers,
      creditCards,
      creditCardTransactions,
      categories,
      accounts,
      expensesLimit,
      authStorageLoaded
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export {
  AuthProvider,
  useAuth
}