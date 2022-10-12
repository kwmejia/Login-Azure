import React from 'react'
import { AuthProvider } from './AuthContext'

interface TypeProps {
  childre: JSX.Element | JSX.Element[]
}

export const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
