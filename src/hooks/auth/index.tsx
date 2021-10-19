import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import * as AuthSession from 'expo-auth-session';
import { IUser } from '../../global/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthContext {
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  user: IUser;
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

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { USER_KEY } = process.env;

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>({} as IUser);

  async function signInWithGoogle() {
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

        const { id, email, verified_email, given_name, family_name, name, picture } = userResponse;

        const userFormatted = {
          id: String(id),
          created_at: new Date(),
          email_verified: verified_email,
          first_name: given_name,
          last_name: family_name,
          avatar: picture,
          email,
          name,
        };

        setUser(userFormatted);
        await AsyncStorage.setItem(USER_KEY!, JSON.stringify(userFormatted));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(USER_KEY!)
    setUser({} as IUser);
  }

  return (
    <AuthContext.Provider value={{
      signInWithGoogle,
      signOut,
      user
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