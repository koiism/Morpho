import { useState, useEffect, useCallback } from 'react'

export interface UseSearchListResult<T> {
  searchQuery: string
  setSearchQuery: (query: string) => void
  data: T[]
  page: number
  setPage: (page: number | ((prev: number) => number)) => void
  totalPages: number
  loading: boolean
  error: any
  refresh: () => void
}

export interface UseSearchListOptions<T> {
  fetcher: (params: { page: number; limit: number; query?: string }) => Promise<{
    data?: {
      docs: T[]
      totalPages: number
    }
    error?: any
  }>
  initialPage?: number
  limit?: number
  debounceMs?: number
}

export function useSearchList<T>({
  fetcher,
  initialPage = 1,
  limit = 10,
  debounceMs = 500,
}: UseSearchListOptions<T>): UseSearchListResult<T> {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
      if (searchQuery !== debouncedSearchQuery) {
        setPage(1)
      }
    }, debounceMs)
    return () => clearTimeout(timer)
  }, [searchQuery, debounceMs, debouncedSearchQuery])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: responseData, error: responseError } = await fetcher({
        page,
        limit,
        query: debouncedSearchQuery,
      })

      if (responseData) {
        setData(responseData.docs)
        setTotalPages(responseData.totalPages)
      } else if (responseError) {
        setError(responseError)
        console.error('Error fetching list:', responseError)
      }
    } catch (e) {
      setError(e)
      console.error('Exception fetching list:', e)
    } finally {
      setLoading(false)
    }
  }, [fetcher, page, limit, debouncedSearchQuery])

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    searchQuery,
    setSearchQuery,
    data,
    page,
    setPage,
    totalPages,
    loading,
    error,
    refresh: loadData,
  }
}
