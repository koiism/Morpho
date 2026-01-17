import { useRouter } from 'next/navigation'
import { useUserInfo } from './useUserInfo'
import { useEffect } from 'react'

export function useEnsureLogin() {
  const { user, loading } = useUserInfo()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])
  return { user, loading }
}
