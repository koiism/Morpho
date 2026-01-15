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
  const [data, setData] = useState<SessionData | null>(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState<ErrorType | null>(null)

  const fetchSession = useCallback(async (force = false) => {
    try {
      if (!force) {
        // 1. Try to get from localStorage
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          try {
            const parsed = JSON.parse(cached)
            const expiresAt = new Date(parsed.session.expiresAt)

            // Check if expired
            if (expiresAt > new Date()) {
              setData({
                ...parsed,
                session: {
                  ...parsed.session,
                  expiresAt,
                },
              })
              setIsPending(false)
              return
            }
          } catch (e) {
            // Invalid cache, ignore
            console.warn('Failed to parse cached session', e)
            localStorage.removeItem(CACHE_KEY)
          }
        }
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
