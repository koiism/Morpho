'use client'

import { useSession } from '@/lib/auth-client'
import React, { createContext, useContext } from 'react'
import type { User as UserCollection } from '@/payload-types'

// type User = typeof useSession extends () => { data: infer D }
//   ? D extends { user: infer U }
//     ? U
//     : never
//   : never
type User = UserCollection

type Session = typeof useSession extends () => { data: infer D }
  ? D extends { session: infer S }
    ? S
    : never
  : never

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
  const { data, isPending, error } = useSession()

  return (
    <UserInfoContext.Provider
      value={{
        user: (data?.user as unknown as User) ?? null,
        session: data?.session ?? null,
        loading: isPending,
        error: error ?? null,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  )
}

export const useUserInfoContext = () => useContext(UserInfoContext)
