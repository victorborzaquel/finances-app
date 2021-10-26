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

type UserData = ITransaction | ITransfer | ICreditCard | ICreditCardTransaction | ICategory | IAccount | IExpenseLimit;
type UserDataType = 'transaction' | 'transfer' | 'creditCard' | 'creditCardTransaction' | 'category' | 'account' | 'expenseLimit';

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

const AuthContext = createContext({} as {
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  user: IUser;
  transactions: ITransaction[];
  transfers: ITransfer[];
  creditCards: ICreditCard[];
  creditCardTransactions: ICreditCardTransaction[];
  categories: ICategory[];
  accounts: IAccount[];
  defaultAccount: IAccount;
  expensesLimit: IExpenseLimit[];
  authStorageLoaded: boolean;
  addData(type: UserDataType, newData: UserData): Promise<void>;
  removeData(type: UserDataType, id: string): Promise<void>;
  cleanStorage(): Promise<void>;
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [transactions, setTransactions] = useState<ITransaction[]>([] as ITransaction[])
  const [transfers, setTransfers] = useState<ITransfer[]>([] as ITransfer[])
  const [creditCards, setCreditCards] = useState<ICreditCard[]>([] as ICreditCard[])
  const [creditCardTransactions, setCreditCardTransactions] = useState<ICreditCardTransaction[]>([] as ICreditCardTransaction[])
  const [categories, setCategories] = useState<ICategory[]>([] as ICategory[])
  const [accounts, setAccounts] = useState<IAccount[]>([] as IAccount[])
  const [expensesLimit, setExpensesLimit] = useState<IExpenseLimit[]>([] as IExpenseLimit[])

  const [defaultAccount, setDefaultAccount] = useState({} as IAccount)

  const [authStorageLoaded, setAuthStorageLoaded] = useState(false);

  function selectData(type: UserDataType) {
    switch (type) {
      case 'transaction': return {
        key: TRANSACTIONS_KEY! + user.id, 
        state: transactions, 
        setState: setTransactions
      }
      case 'transfer': return {
        key: TRANSFERS_KEY! + user.id, 
        state: transfers, 
        setState: setTransfers
      }
      case 'creditCard': return {
        key: CREDIT_CARDS_KEY! + user.id, 
        state: creditCards, 
        setState: setCreditCards
      }
      case 'creditCardTransaction': return {
        key: CREDIT_CARDS_TRANSACTIONS_KEY! + user.id, 
        state: creditCardTransactions, 
        setState: setCreditCardTransactions
      }
      case 'category': return {
        key: CATEGORIES_KEY! + user.id, 
        state: categories, 
        setState: setCategories
      }
      case 'account':  return {
        key: ACCOUNTS_KEY! + user.id, 
        state: accounts, 
        setState: setAccounts
      }
      case 'expenseLimit': return {
        key: EXPENSES_LIMIT_KEY! + user.id, 
        state: expensesLimit, 
        setState: setExpensesLimit
      }
      default: throw new Error("Invalid Type")
    }
  }

  async function addData(type: UserDataType, newData: UserData) {
    try {
      const { key, state, setState } = selectData(type)
      const updated = [...state, newData]

      setState(updated as any)
      await AsyncStorage.setItem(key, JSON.stringify(updated))
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function removeData(
    type: UserDataType, 
    id: string
  ) {
    try {
      const { key, state, setState } = selectData(type) as any
      const updated = state.filter((curr: any) => curr.id !== id)

      setState(updated)
      await AsyncStorage.setItem(key, JSON.stringify(updated))
    } catch (error: any) {
      throw new Error(error)
    }
    
  }

  async function signInWithGoogle() {
    setAuthStorageLoaded(false)
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

      if (type !== 'success') return setAuthStorageLoaded(true)

      const endpoint = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
      const response = await fetch(endpoint)
      const userResponse: IUserGoogleResponse = await response.json()
      const allUserStorage = await AsyncStorage.getItem(USER_KEY!)

      if (allUserStorage) {
        const allUsers = JSON.parse(allUserStorage) as IUser[];
        const userExist = allUsers.find(user => user.google_id === String(userResponse.id))

        if (userExist) return signIn(userExist.id)
        else return setAuthStorageLoaded(true)

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
        return createAccount(userFormatted)
      } 
    } catch (error: any) {
      setAuthStorageLoaded(true)
      throw new Error(error)
    } 
  }

  async function createAccount(user: INewUser) {
    const newUser: IUser = {
      ...user,
      ...UserDefaultData,
      created_at: new Date(),
      id: String(UUID.v4()),
      default_account_id: '1'
    };
    const userIdCategoryDefaultData: ICategory[] = CategoryDefaultData.map(category => ({...category, user_id: newUser.id}));
    const userIdAccountDefaultData: IAccount[] = AccountDefaultData.map(account => ({...account, user_id: newUser.id}));

    try {
      await AsyncStorage.setItem(USER_KEY! + newUser.id, JSON.stringify(newUser));
      await AsyncStorage.setItem(CATEGORIES_KEY! + newUser.id, JSON.stringify(userIdCategoryDefaultData));
      await AsyncStorage.setItem(ACCOUNTS_KEY! + newUser.id, JSON.stringify(userIdAccountDefaultData));
    } catch (error: any) {
      throw new Error(error)
    } finally {
      return signIn(newUser.id)
    }
  }

  async function signIn(userId: IUser['id']) {
    setAuthStorageLoaded(false)
    try {
      const userStorage = await AsyncStorage.getItem(USER_KEY! + userId)
      
      if (userStorage) {
        const ALL_KEYS = await AsyncStorage.getAllKeys()
        const MY_KEYS = ALL_KEYS.filter(key => key.includes(userId))
        const MY_DATA = await AsyncStorage.multiGet(MY_KEYS)

        MY_DATA.forEach(data => {
          const key = data[0].split(':')[0] + ':'
          const set = JSON.parse(data[1] || '[]')

          switch (key) {
            case USER_KEY:                      return setUser(set)
            case TRANSACTIONS_KEY:              return setTransactions(set)
            case TRANSFERS_KEY:                 return setTransfers(set)
            case CREDIT_CARDS_KEY:              return setCreditCards(set)
            case CREDIT_CARDS_TRANSACTIONS_KEY: return setCreditCardTransactions(set)
            case CATEGORIES_KEY:                return setCategories(set)
            case ACCOUNTS_KEY:                  return setAccounts(set)
            case EXPENSES_LIMIT_KEY:            return setExpensesLimit(set)
            default:                            return console.log('KEY NOT EXIST: ', key)
          }
        })

        await AsyncStorage.setItem(CURRENT_USER_ID_KEY!, userId)
      }
      return setAuthStorageLoaded(true)
    } catch (error: any) {
      setAuthStorageLoaded(true)
      throw new Error(error)
    }
  }

  async function loadAuthStorageData() {
    setAuthStorageLoaded(false)
    try {
      const currentUserIdStorage = await AsyncStorage.getItem(CURRENT_USER_ID_KEY!)

      if (currentUserIdStorage) {
        return signIn(currentUserIdStorage)
      } else {
        return setAuthStorageLoaded(true)
      }
    } catch (error) {
      await AsyncStorage.removeItem(CURRENT_USER_ID_KEY!)
      console.log('loadUserStorageData: ' + error)
      return setAuthStorageLoaded(true)
    }
  }

  function clearData() {
    setUser({} as IUser)
    setTransactions([] as ITransaction[])
    setTransfers([] as ITransfer[])
    setCreditCards([] as ICreditCard[])
    setCreditCardTransactions([] as ICreditCardTransaction[])
    setCategories([] as ICategory[])
    setAccounts([] as IAccount[])
    setExpensesLimit([] as IExpenseLimit[])
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_ID_KEY!)
      clearData()
    } catch (error: any) {
      throw new Error(error)
    }
  }
  
  async function cleanStorage() {
    try {
      await AsyncStorage.clear()
      clearData()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    // cleanStorage()
    loadAuthStorageData()
    // setAuthStorageLoaded(true)
  }, [user.id])

  useEffect(() => {
    setDefaultAccount(accounts.find(account => account.id === user.default_account_id) as IAccount)
  }, [user.default_account_id])

  return (
    <AuthContext.Provider value={{
      signInWithGoogle,
      signOut,
      user,
      transactions,
      defaultAccount,
      addData,
      removeData,
      transfers,
      creditCards,
      creditCardTransactions,
      categories,
      accounts,
      expensesLimit,
      authStorageLoaded,
      cleanStorage
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