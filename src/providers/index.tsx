'use client'

import React from 'react'

import { ThemeModeProvider } from './themeModeProvider'

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeModeProvider>{children}</ThemeModeProvider>
}
