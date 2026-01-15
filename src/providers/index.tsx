'use client'

import React from 'react'

import { ThemeModeProvider } from './themeModeProvider'
import { UserInfoProvider } from './userInfoProvider'

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeModeProvider>
      <UserInfoProvider>{children}</UserInfoProvider>
    </ThemeModeProvider>
  )
}
