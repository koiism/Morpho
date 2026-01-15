'use client'

import React from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { DashboardHeader } from './DashboardHeader'
import { DashboardStats } from './DashboardStats'
import { DashboardTabs } from './DashboardTabs'

export function DashboardEntry() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <DashboardHeader />
        <DashboardStats />
        <DashboardTabs />
      </div>
    </DashboardLayout>
  )
}
