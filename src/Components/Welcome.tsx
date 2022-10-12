import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Welcome = () => {
  const { signOut, user } = useContext(AuthContext);
  return (
    <div className="text-center">
      <img src={user?.avatar} alt="Photo User" width={100} className="rounded-circle" />
      <h1>Está Autenticado</h1>
      <h4>Bienvenido: {user?.displayName}</h4>
      <p>{user?.email}</p>
      <p>{user?.rol}</p>
      <button className="btn btn-primary" onClick={signOut}>Cerrrar Sesión</button>
    </div>
  )
}
