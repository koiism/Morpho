'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { WorldListItem } from './WorldList'
import { WorldDetail } from './WorldDetail'
import { WorldForm } from './WorldForm'
import { Search, World } from '@/payload-types'
import { getMyWorldSearchList, getCollectionApi } from '@/lib/api/payload'
import { useTranslations } from 'next-intl'

export function DashboardWorld() {
  const [selectedWorld, setSelectedWorld] = React.useState<Search | null>(null)
  const [viewMode, setViewMode] = React.useState<'detail' | 'create' | 'edit'>('detail')
  const [editingWorld, setEditingWorld] = React.useState<World | null>(null)
  const [refreshKey, setRefreshKey] = React.useState(0)

  const t = useTranslations('WorldList')
  const tCommon = useTranslations('Common')

  const fetcher = React.useCallback(
    async ({ page, limit, query }: { page: number; limit: number; query?: string }) => {
      return getMyWorldSearchList({
        page,
        limit,
        query,
      })
    },
    [refreshKey],
  )

  const handleAdd = () => {
    setViewMode('create')
    setEditingWorld(null)
  }

  const handleEdit = (world: World) => {
    setEditingWorld(world)
    setViewMode('edit')
  }

  const handleDelete = async (world: World) => {
    if (confirm(tCommon('confirmDelete'))) {
      try {
        await getCollectionApi('worlds').delete(world.id)
        if (selectedWorld?.id === world.id) {
          setSelectedWorld(null)
        }
        setRefreshKey((k) => k + 1)
      } catch (error) {
        console.error('Failed to delete world', error)
      }
    }
  }

  const handleFormSuccess = () => {
    setViewMode('detail')
    setRefreshKey((k) => k + 1)
  }

  const handleFormCancel = () => {
    setViewMode('detail')
  }

  const renderWorldItem = React.useCallback(
    (world: Search) => (
      <WorldListItem
        world={world}
        isSelected={selectedWorld?.id === world.id}
        onClick={() => {
          setSelectedWorld(world)
          setViewMode('detail')
        }}
      />
    ),
    [selectedWorld?.id],
  )

  const overviewConfig = React.useMemo(
    () => ({
      fetcher,
      renderItem: renderWorldItem,
      searchPlaceholder: t('searchPlaceholder'),
      emptyText: t('noResults'),
      pageInfoText: (current: number, total: number) => t('pageInfo', { current, total }),
      prevPageText: t('prevPage'),
      nextPageText: t('nextPage'),
      onAddClick: handleAdd,
      addText: tCommon('add'),
    }),
    [fetcher, renderWorldItem, t, tCommon],
  )

  return (
    <DashboardLayout enableOverviewPanel={true} overviewConfig={overviewConfig}>
      {viewMode === 'create' || viewMode === 'edit' ? (
        <WorldForm
          initialData={editingWorld}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <WorldDetail
          worldId={(selectedWorld?.doc.value as string) || null}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
        />
      )}
    </DashboardLayout>
  )
}
