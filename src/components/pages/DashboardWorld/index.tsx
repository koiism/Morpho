'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { WorldListItem } from './WorldList'
import { WorldDetail } from './WorldDetail'
import { WorldForm } from './WorldForm'
import { Search, World } from '@/payload-types'
import { getMyWorldSearchList, getCollectionApi } from '@/lib/api/payload'
import { useTranslations } from 'next-intl'
import { useWorldStore } from './store'

export function DashboardWorld() {
  const {
    selectedWorldId,
    currentWorld,
    viewMode,
    refreshKey,
    selectWorld,
    startCreate,
    startEdit,
    handleSuccess,
    handleCancel,
    refreshList,
  } = useWorldStore()

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

  const handleDelete = async (world: World) => {
    if (confirm(tCommon('confirmDelete'))) {
      try {
        await getCollectionApi('worlds').delete(world.id)
        if (selectedWorldId === world.id) {
          selectWorld(null)
        }
        refreshList()
      } catch (error) {
        console.error('Failed to delete world', error)
      }
    }
  }

  const renderWorldItem = React.useCallback(
    (world: Search) => {
      const worldId = world.doc.value as string
      return (
        <WorldListItem
          world={world}
          isSelected={selectedWorldId === worldId}
          onClick={() => selectWorld(worldId)}
        />
      )
    },
    [selectedWorldId, selectWorld],
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
      onAddClick: startCreate,
      addText: tCommon('add'),
    }),
    [fetcher, renderWorldItem, t, tCommon, startCreate],
  )

  return (
    <DashboardLayout enableOverviewPanel={true} overviewConfig={overviewConfig}>
      {viewMode === 'create' || viewMode === 'edit' ? (
        <WorldForm
          initialData={viewMode === 'edit' ? currentWorld : null}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <WorldDetail
          worldId={selectedWorldId}
          data={currentWorld}
          onEditClick={startEdit}
          onDeleteClick={handleDelete}
        />
      )}
    </DashboardLayout>
  )
}
