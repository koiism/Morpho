'use client'

import React from 'react'

import { ThemeModeProvider } from './themeModeProvider'
import { UserInfoProvider } from './userInfoProvider'
import { CopilotKit } from '@copilotkit/react-core'

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <ThemeModeProvider>
        <UserInfoProvider>{children}</UserInfoProvider>
      </ThemeModeProvider>
    </CopilotKit>
  )
}
