'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useUserInfo } from '@/hooks/useUserInfo'
import { Loader2 } from 'lucide-react'

const LandingPage = dynamic(() => import('@/components/pages/LandingPage').then((mod) => mod.LandingPage), {
  loading: () => <PageLoader />,
})

const DashboardEntry = dynamic(
  () => import('@/components/pages/DashboardEntry').then((mod) => mod.DashboardEntry),
  {
    loading: () => <PageLoader />,
  },
)

function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export default function HomePage() {
  const { user, loading } = useUserInfo()

  if (loading) {
    return <PageLoader />
  }

  if (user) {
    return (
      <Suspense fallback={<PageLoader />}>
        <DashboardEntry />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  )
}
