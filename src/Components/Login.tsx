import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {

  const { signIn } = useContext(AuthContext);

  return (
    <div className='app'>
      <button className='btn btn-primary' onClick={signIn}>INGRESAR CON SU CORREO INSTITUCIONAL</button>
    </div>
  )
}
