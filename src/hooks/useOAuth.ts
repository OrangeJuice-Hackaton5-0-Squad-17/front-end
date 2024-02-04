import { useContext } from 'react'

import { OAuthContext, OAuthContextType } from '@/contexts/OAuthContext'

export function useAuth(): OAuthContextType {
  const context = useContext(OAuthContext)

  if (!context) {
    throw new Error('useAuth hook must be used within an AuthProvider!')
  }

  return context
}
