'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { WorldListItem } from './WorldList'
import { WorldDetail } from './WorldDetail'
import { Search } from '@/payload-types'
import { getMyWorldSearchList } from '@/lib/api/payload'
import { useTranslations } from 'next-intl'

export function DashboardWorld() {
  const [selectedWorld, setSelectedWorld] = React.useState<Search | null>(null)
  const t = useTranslations('WorldList')

  const fetcher = React.useCallback(
    async ({ page, limit, query }: { page: number; limit: number; query?: string }) => {
      return getMyWorldSearchList({
        page,
        limit,
        query,
      })
    },
    [],
  )

  return (
    <DashboardLayout
      enableOverviewPanel={true}
      overviewConfig={{
        fetcher,
        renderItem: (world: Search) => (
          <WorldListItem
            world={world}
            isSelected={selectedWorld?.id === world.id}
            onClick={() => setSelectedWorld(world)}
          />
        ),
        searchPlaceholder: t('searchPlaceholder'),
        emptyText: t('noResults'),
        pageInfoText: (current, total) => t('pageInfo', { current, total }),
        prevPageText: t('prevPage'),
        nextPageText: t('nextPage'),
      }}
    >
      <WorldDetail worldId={(selectedWorld?.doc.value as string) || null} />
    </DashboardLayout>
  )
}
