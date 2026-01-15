'use client'

import { useCachedSession } from '@/hooks/useCachedSession'
import React, { createContext, useContext } from 'react'
import type { User } from '@/payload-types'

type SessionData = NonNullable<ReturnType<typeof useCachedSession>['data']>
type Session = SessionData['session']

interface UserInfoContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: Error | null
}

const UserInfoContext = createContext<UserInfoContextType>({
  user: null,
  session: null,
  loading: true,
  error: null,
})

export const UserInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isPending, error } = useCachedSession()

  return (
    <UserInfoContext.Provider
      value={{
        user: data?.user ?? null,
        session: data?.session ?? null,
        loading: isPending,
        error: error,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  )
}

export const useUserInfoContext = () => useContext(UserInfoContext)
