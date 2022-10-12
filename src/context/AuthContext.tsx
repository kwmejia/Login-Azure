import { useState, createContext, useEffect } from 'react';
import GraphService from '../config/GraphService';

interface AppUser {
  displayName: string;
  email: string;
  rol: string;
  avatar: any;
}

interface AuthContextProps {
  user: AppUser | undefined;
  logged: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  const [user, setUser] = useState<AppUser | undefined>(undefined);
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    checkToken();
  }, [])

  const checkToken = () => {
    const token = localStorage.getItem('accessToken');
    (token) && loadInfo();

  }

  const loadInfo = async () => {
    setLogged(true);
    try {
      const userRest = await GraphService.getUser();
      const photoUser = await GraphService.getPhoto();
      setUser({
        displayName: userRest.displayName || '',
        email: userRest.mail || userRest.userPrincipalName || '',
        rol: userRest.jobTitle || '',
        avatar: photoUser
      })
    } catch (e) {
      console.error(e);
    }
  }

  const signIn = async () => {
    try {

      const token = await GraphService.getAccestToken();
      localStorage.setItem('accessToken', token);
      loadInfo();

    } catch (error) {
      setLogged(false);
    }
  };

  const signOut = async () => {
    // await msal.instance.logoutPopup();
    setLogged(false);
    setUser(undefined);
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logged,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
