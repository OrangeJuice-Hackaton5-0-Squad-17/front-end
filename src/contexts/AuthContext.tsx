'use client'

import { createContext, useCallback, useState } from 'react'

import { api } from '@/services/api'

import { User } from '@/models/user'

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthState {
  token: string
}

interface SignInCredentials {
  email: string
  password: string
}

export interface AuthContextData {
  getUser: () => Promise<void>
  updateUser: (user: Omit<User, 'id'>) => Promise<void>
  user: User | null
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@OrangePortfolios:token')

      if (token) {
        return { token }
      }
    }
    return {} as AuthState
  })
  const [user, setUser] = useState<User | null>(null)

  const getUser = useCallback(async () => {
    const token = localStorage.getItem('@OrangePortfolios:token')

    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const userData = {
      id: response.data.user.id,
      name: response.data.user.name,
      email: response.data.user.email,
    }

    setUser(userData)
  }, [])

  const updateUser = useCallback(
    async (data: User) => {
      const token = localStorage.getItem('@OrangePortfolios:token')

      const response = await api.patch(`/user/${user?.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const userData = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
      }

      setUser(userData)
    },
    [user],
  )

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/login', {
      email,
      password,
    })

    const { access_token: token } = response.data

    localStorage.setItem('@OrangePortfolios:token', token)

    setData({ token })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@OrangePortfolios:token')

    setData({} as AuthState)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ getUser, updateUser, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
