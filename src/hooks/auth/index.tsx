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
import CategoryDefaultData, { othersCategories } from '../../data/CategoryDefaultData';
import AccountDefaultData from '../../data/AccountDefaultData';
import { isSameMonth } from '../../utils/dateUtils';
import { t } from 'i18n-js';

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
  expensesLimit: IExpenseLimit[];
  authStorageLoaded: boolean;
  addData(type: UserDataType, newData: UserData): Promise<void>;
  updateData(type: UserDataType, newData: UserData): Promise<void>;
  removeData(type: UserDataType, id: string): Promise<void>;
  cleanStorage(): Promise<void>;
  useDefaultAccount(): IAccount;
  updateUser(userUpdated: IUser): Promise<void>;
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

  function useDefaultAccount() {
    return accounts.find(account => account.id === user.default_account_id) as IAccount
  }

  async function updateUser(userUpdated: IUser) {
    try {
      const allUserStorage = await AsyncStorage.getItem(USER_KEY!) || '[]'
      const allUsers = JSON.parse(allUserStorage) as IUser[]
      const allUsersUpdated = allUsers.map(curr => curr.id !== user.id ? curr : userUpdated)
      
      await AsyncStorage.setItem(USER_KEY!, JSON.stringify(allUsersUpdated))
      setUser(userUpdated)
    } catch (error: any) {
      throw new Error(error)
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

  async function updateData(type: UserDataType, newData: UserData) {
    try {
      const { key, state, setState } = selectData(type)
      const updated = state.map(curr => curr.id !== newData.id ? curr : newData)
      
      setState(updated as any)
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
        
        if (type !== 'success') throw new Error('Erro ao se conectar com conta Google!')
        
        const endpoint = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        const response = await fetch(endpoint)
        const userResponse: IUserGoogleResponse = await response.json()
        const allUserStorage = await AsyncStorage.getItem(USER_KEY!)
        
        if (allUserStorage) {
          const allUsers = JSON.parse(allUserStorage) as IUser[];
          const userExist = allUsers.find(user => user.google_id === String(userResponse.id))

          if (!!userExist) return signIn(userExist.id)
        }

        return createAccount(formatUser('google', userResponse))
    } catch (error: any) {
      setAuthStorageLoaded(true)
      throw new Error(error)
    } 
  }

  function formatUser(type: 'google', user: IUserGoogleResponse) {
    switch (type) {
      case 'google': return ({
        google_id: String(user.id),
        email_verified: user.verified_email,
        first_name: user.given_name,
        last_name: user.family_name,
        avatar: user.picture,
        email: user.email,
        name: user.name,
      })
      default: throw new Error('Invalid Type formatted User')
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
    // const userIdCategoryDefaultData: ICategory[] = CategoryDefaultData.map(category => ({...category, user_id: newUser.id}));
    // const userIdAccountDefaultData: IAccount[] = AccountDefaultData.map(account => ({...account, user_id: newUser.id})); 

    try {
      const allUserStorage = await AsyncStorage.getItem(USER_KEY!) || '[]'

      const allUsers = JSON.parse(allUserStorage) as IUser[]
      allUsers.push(newUser)

      await AsyncStorage.setItem(USER_KEY!, JSON.stringify(allUsers));
      // await AsyncStorage.setItem(CATEGORIES_KEY! + newUser.id, JSON.stringify(userIdCategoryDefaultData));
      // await AsyncStorage.setItem(ACCOUNTS_KEY! + newUser.id, JSON.stringify(userIdAccountDefaultData));

      return signIn(newUser.id)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signIn(userId: IUser['id']) {
    try {
      const allUserStorage = await AsyncStorage.getItem(USER_KEY!) || '[]'
      const allUsers = JSON.parse(allUserStorage) as IUser[]

      const userStorage = allUsers.find(user => user.id === userId)
      
      if (userStorage) {
        const ALL_KEYS = await AsyncStorage.getAllKeys()
        const MY_KEYS = ALL_KEYS.filter(key => key.includes(userId))
        const MY_DATA = await AsyncStorage.multiGet(MY_KEYS)

        const categoryFormatted = CategoryDefaultData.map(category => ({...category, name: t(category.name)}))
        const othersCategoriesFormatted = othersCategories.map(category => ({...category, name: t(category.name)}))

        const AccountDefaultDataFormatted = AccountDefaultData.map(category => ({...category, name: t(category.name)}))

        setAccounts(AccountDefaultDataFormatted)
        setCategories([...categoryFormatted, ...othersCategoriesFormatted])

        MY_DATA.forEach(data => {
          const key = data[0].split(':')[0] + ':'
          const set = JSON.parse(data[1] || '[]')

          switch (key) {
            case TRANSACTIONS_KEY: 
              setTransactions(set)
              break
            case TRANSFERS_KEY: 
              setTransfers(set)
              break
            case CREDIT_CARDS_KEY: 
              setCreditCards(set)
              break
            case CREDIT_CARDS_TRANSACTIONS_KEY: 
              setCreditCardTransactions(set)
              break
            case ACCOUNTS_KEY: 
              setAccounts(curr => [...curr, ...set])
              break
            case EXPENSES_LIMIT_KEY: 
              setExpensesLimit(set)
              break
            case CATEGORIES_KEY:          
              setCategories(curr => [...curr, ...set])
              break
            default: 
              throw new Error('Key não existe')
          }
        })
        
        await AsyncStorage.setItem(CURRENT_USER_ID_KEY!, userId)
        setUser(userStorage)
      }
      return setAuthStorageLoaded(true)
    } catch (error: any) {
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
      throw new Error('loadUserStorageData: ' + error)
    }
  }

  function clearData() {
    setTransactions([] as ITransaction[])
    setTransfers([] as ITransfer[])
    setCreditCards([] as ICreditCard[])
    setCreditCardTransactions([] as ICreditCardTransaction[])
    setCategories([] as ICategory[])
    setAccounts([] as IAccount[])
    setExpensesLimit([] as IExpenseLimit[])
    setUser({} as IUser)
  }

  async function signOut() {
    setAuthStorageLoaded(false)
    try {
      clearData()
      await AsyncStorage.removeItem(CURRENT_USER_ID_KEY!)
    } catch (error: any) {
      throw new Error(error)
    } finally {
      setAuthStorageLoaded(true)
    }
  }
  
  async function cleanStorage() {
    setAuthStorageLoaded(false)
    try {
      await AsyncStorage.clear()
      clearData()
    } catch (error: any) {
      throw new Error(error)
    } finally {
      setAuthStorageLoaded(true)
    }
  }

  useEffect(() => {
    loadAuthStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{
      signInWithGoogle,
      signOut,
      user,
      transactions,
      useDefaultAccount,
      updateUser,
      addData,
      updateData,
      removeData,
      transfers,
      creditCards,
      creditCardTransactions,
      categories,
      accounts,
      expensesLimit,
      authStorageLoaded,
      cleanStorage,
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