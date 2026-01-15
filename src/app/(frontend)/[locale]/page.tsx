'use client'

import React from 'react'
import { useUserInfo } from '@/hooks/useUserInfo'
import { LandingPage } from '@/components/pages/LandingPage'
import { Loader2 } from 'lucide-react'

export default function HomePage() {
  const { user, loading } = useUserInfo()

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return <LandingPage />
}
