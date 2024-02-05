import { ReactNode } from 'react'

import { AuthProvider } from './AuthContext'
import { OAuthContextProvider } from './OAuthContext'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <OAuthContextProvider>{children}</OAuthContextProvider>
    </AuthProvider>
  )
}
