'use client'

import { createContext, useCallback, useState } from 'react'

import { api } from '@/services/api'

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthState {
  token: string
  user: object
}

interface SignInCredentials {
  email: string
  password: string
}

export interface AuthContextData {
  user: object
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@OrangePortfolios:token')

    const user = localStorage.getItem('@OrangePortfolios:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('[resource]', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@OrangePortfolios:token', token)
    localStorage.setItem('@OrangePortfolios:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@OrangePortfolios:token')
    localStorage.removeItem('@OrangePortfolios:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
