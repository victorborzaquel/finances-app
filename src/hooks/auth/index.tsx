import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import * as AuthSession from 'expo-auth-session'
import {
  IAccount,
  ICategory,
  ICreditCard,
  ICreditCardTransaction,
  IExpenseLimit,
  ITransaction,
  ITransfer,
  IUser,
  IUserUpdate,
} from '../../global/interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UUID from 'react-native-uuid'
import UserDefaultData from '../../data/UserDefaultData'
import CategoryDefaultData, { othersCategories } from '../../data/CategoryDefaultData'
import AccountDefaultData from '../../data/AccountDefaultData'
import { t } from 'i18n-js'

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

interface ILoginResponse {
  type: 'success' | 'fail';
  params: {
    userId?: string;
    user?: IFormatUser;
  }
}
interface IFormatUser {
  login_social?: {
    google_id?: string;
  };
  email_verified?: boolean;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  email: string;
  name: string;
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

type ILoginType = 'google';

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
  signIn(type: ILoginType): Promise<void>;
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
  updateUser(userUpdated: IUserUpdate): Promise<void>;
  translateDefaultData(): void;
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
      case 'account': return {
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

  async function updateUser(userUpdated: IUserUpdate) {
    try {
      const allUserStorage = await AsyncStorage.getItem(USER_KEY!) || '[]'
      const allUsers = JSON.parse(allUserStorage) as IUser[]
      const allUsersUpdated = allUsers.map(curr => curr.id !== user.id ? curr : { ...user, ...userUpdated })

      await AsyncStorage.setItem(USER_KEY!, JSON.stringify(allUsersUpdated))
      setUser({ ...user, ...userUpdated })
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

  async function signInWithGoogle(): Promise<ILoginResponse> {
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
        const userExist = allUsers.find(user => user.login_social?.google_id === String(userResponse.id))

        if (!!userExist) return {
          type: 'success',
          params: { userId: userExist.id }
        }
      }

      const user = formatUser('google', userResponse)
      return {
        type: 'fail',
        params: { user }
      }
    } catch (error: any) {
      setAuthStorageLoaded(true)
      throw new Error(error)
    }
  }

  function formatUser(type: ILoginType, user: IUserGoogleResponse): IFormatUser {
    switch (type) {
      case 'google': return ({
        login_social: {
          google_id: String(user.id),
        },
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

  async function selectLoginMethod(type: ILoginType) {
    switch (type) {
      case 'google': return await signInWithGoogle()
      default: throw new Error('Invalid Type')
    }
  }

  async function createAccount(user: INewUser): Promise<ILoginResponse> {
    const newUser: IUser = {
      ...user,
      ...UserDefaultData,
      created_at: new Date(),
      id: String(UUID.v4()),
      default_account_id: '1'
    };

    try {
      const allUserStorage = await AsyncStorage.getItem(USER_KEY!) || '[]'

      const allUsers = JSON.parse(allUserStorage) as IUser[]
      allUsers.push(newUser)

      await AsyncStorage.setItem(USER_KEY!, JSON.stringify(allUsers));

      return {
        type: 'success',
        params: { userId: newUser.id }
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  function translateDefaultData(): void {
    const translate = (items: any[]) => items.map(item => ({ ...item, name: t(item.name) }))

    const replace = (current: any[], formatted: any[]) => {
      if (current.length === 0) return formatted

      return (
        current.map(curr => {
          const updated = formatted.find(format => format.id === curr.id)
          return !!updated ? updated : curr
        })
      )
    }

    const categoryFormatted = translate([...CategoryDefaultData, ...othersCategories]) as ICategory[]
    const AccountFormatted = translate(AccountDefaultData) as IAccount[]

    setCategories(replace(categories, categoryFormatted))
    setAccounts(replace(accounts, AccountFormatted))
  }

  async function loadUserData(userId: string) {
    try {
      const allUserStorage = await AsyncStorage.getItem(USER_KEY!) || '[]'
      const allUsers = JSON.parse(allUserStorage) as IUser[]

      const userStorage = allUsers.find(user => user.id === userId)

      if (userStorage) {
        const ALL_KEYS = await AsyncStorage.getAllKeys()
        const MY_KEYS = ALL_KEYS.filter(key => key.includes(userId))
        const MY_DATA = await AsyncStorage.multiGet(MY_KEYS)

        MY_DATA.forEach(data => {
          const key = data[0].split(':')[0] + ':'
          const set = JSON.parse(data[1] || '[]')

          switch (key) {
            case TRANSACTIONS_KEY: return setTransactions(set)
            case TRANSFERS_KEY: return setTransfers(set)
            case CREDIT_CARDS_KEY: return setCreditCards(set)
            case CREDIT_CARDS_TRANSACTIONS_KEY: return setCreditCardTransactions(set)
            case ACCOUNTS_KEY: return setAccounts(curr => [...curr, ...set])
            case EXPENSES_LIMIT_KEY: return setExpensesLimit(set)
            case CATEGORIES_KEY: return setCategories(curr => [...curr, ...set])
            default: throw new Error('Key não existe')
          }
        })

        await AsyncStorage.setItem(CURRENT_USER_ID_KEY!, userId)

        return userStorage
      } else {
        throw new Error('User not found')
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signIn(type: 'google') {
    setAuthStorageLoaded(false)

    try {
      const loginResponse = await selectLoginMethod(type)

      let userId: string
      if (loginResponse.type === 'success') {
        userId = loginResponse.params.userId!
      } else {
        const user = loginResponse.params.user!
        const createAccountResponse = await createAccount(user)
        userId = createAccountResponse.params.userId!
      }

      const user = await loadUserData(userId)

      setAuthStorageLoaded(true)
      return setUser(user)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function loadAuthStorageData() {
    setAuthStorageLoaded(false)
    // console.log(CURRENT_USER_ID_KEY)
    try {
      const currentUserIdStorage = await AsyncStorage.getItem(CURRENT_USER_ID_KEY!)

      if (currentUserIdStorage) {
        const user = await loadUserData(currentUserIdStorage)
        setAuthStorageLoaded(true)
        return setUser(user)
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
    // cleanStorage()
    loadAuthStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn,
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
      translateDefaultData
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