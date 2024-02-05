'use client'

import { useState, useEffect, createContext, ReactNode } from 'react'

import { auth, firebase } from '@/services/firebase'

type User = {
  id: string
  name: string
  avatar: string
}

export type OAuthContextType = {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
}

type OAuthContextProviderProps = {
  children: ReactNode
}

export const OAuthContext = createContext({} as OAuthContextType)

export function OAuthContextProvider(props: OAuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account!')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <OAuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </OAuthContext.Provider>
  )
}
