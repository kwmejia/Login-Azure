import { useContext } from 'react';
import { Login } from './Components/Login';
import { AuthContext } from './context/AuthContext';
import { Welcome } from './Components/Welcome';

export const App = () => {

  const { logged } = useContext(AuthContext);

  return (
    <>
      {logged ? <Welcome /> : <Login />}
    </>
  );
}
