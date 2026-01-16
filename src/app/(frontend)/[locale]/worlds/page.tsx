'use client'

import React from 'react'
import { useUserInfo } from '@/hooks/useUserInfo'
import { Loader2 } from 'lucide-react'
import { DashboardWorld } from '@/components/pages/DashboardWorld'
import { useRouter } from '@/i18n/routing'

export default function WorldPage() {
  const { user, loading } = useUserInfo()
  const router = useRouter()

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <DashboardWorld />
}
