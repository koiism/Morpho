'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import { DashboardWorld } from '@/components/pages/DashboardWorld'
import { useEnsureLogin } from '@/hooks/useEnsureLogin'

export default function WorldPage() {
  const { loading, user } = useEnsureLogin()

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
