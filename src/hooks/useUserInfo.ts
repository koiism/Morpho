'use client'

import { useUserInfoContext } from '@/providers/userInfoProvider'

export const useUserInfo = () => {
  return useUserInfoContext()
}
