'use client'

import { useState, useEffect, useCallback } from 'react'
import { getSession } from '@/lib/auth-client'
import type { useSession } from '@/lib/auth-client'
import type { User } from '@/payload-types'

type GetSessionResult = ReturnType<typeof useSession> & {
  data: {
    user: User | null
  }
}
type SessionData = NonNullable<GetSessionResult['data']>
type ErrorType = GetSessionResult['error']

const CACHE_KEY = 'morpho_session_cache'

export function useCachedSession() {
  const [data, setData] = useState<SessionData | null>(() => {
    if (typeof window === 'undefined') return null
    // 1. Try to get from localStorage immediately during initialization
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        const expiresAt = new Date(parsed.session.expiresAt)
        if (expiresAt > new Date()) {
          return {
            ...parsed,
            session: {
              ...parsed.session,
              expiresAt,
            },
          }
        }
      }
    } catch (e) {
      console.warn('Failed to parse cached session during init', e)
    }
    return null
  })
  const [isPending, setIsPending] = useState(() => !data)
  const [error, setError] = useState<ErrorType | null>(null)

  const fetchSession = useCallback(async (force = false) => {
    try {
      if (!force && data) {
        setIsPending(false)
        return
      }

      // 2. If no cache, expired, or forced, fetch from server
      setIsPending(true)
      const res = (await getSession()) as GetSessionResult

      if (res.data) {
        setData(res.data)
        localStorage.setItem(CACHE_KEY, JSON.stringify(res.data))
      } else {
        localStorage.removeItem(CACHE_KEY)
        setData(null)
      }

      if (res.error) {
        setError({
          ...res.error,
          message: res.error.message || 'Unknown error',
          error: res.error,
          name: res.error.statusText,
        })
      } else {
        setError(null)
      }
    } catch (err) {
      console.error('Session fetch error', err)
      // We can cast error generically or handle it
      // setError({ message: 'Unknown error', code: 'UNKNOWN' }) // Simplified
    } finally {
      setIsPending(false)
    }
  }, [])

  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  return {
    data,
    isPending,
    error,
    refetch: () => fetchSession(true),
  }
}
