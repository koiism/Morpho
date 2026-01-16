'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { WorldList } from './WorldList'
import { WorldDetail } from './WorldDetail'
import { mockWorlds } from './mockData'
import { World } from '@/payload-types'

export function DashboardWorld() {
  const [selectedWorld, setSelectedWorld] = React.useState<World | null>(mockWorlds[0] || null)

  return (
    <DashboardLayout
      overviewSlot={
        <WorldList
          worlds={mockWorlds}
          selectedWorldId={selectedWorld?.id}
          onSelectWorld={setSelectedWorld}
        />
      }
    >
      <WorldDetail world={selectedWorld} />
    </DashboardLayout>
  )
}
