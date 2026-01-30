'use client'

import * as React from 'react'
import { World } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, Globe, Edit, Trash2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslations } from 'next-intl'
import { Markdown } from '@/components/ui/markdown'
import { getWorldById } from '@/lib/api/payload'
import { Button } from '@/components/ui/button'
import { WorldDetailSkeleton } from './components/WorldDetailSkeleton'
import { AttributeList } from './components/AttributeList'
import { useWorldStore } from './store'

interface WorldDetailProps {
  worldId: string | null
  data?: World | null
  onEditClick?: (world: World) => void
  onDeleteClick?: (world: World) => void
}

export function WorldDetail({ worldId, data, onEditClick, onDeleteClick }: WorldDetailProps) {
  const t = useTranslations('WorldDetail')
  const { setCurrentWorld } = useWorldStore()
  const [loading, setLoading] = React.useState(false)

  // 使用传入的 data 作为展示数据，如果 data 与 worldId 匹配
  // 否则在 useEffect 中根据 worldId 获取数据
  const world = data && data.id === worldId ? data : null

  React.useEffect(() => {
    // 如果已经有匹配的数据，或者没有 worldId，则不需要请求
    if (!worldId || (data && data.id === worldId)) {
      return
    }

    const fetchWorld = async () => {
      setLoading(true)
      try {
        const { data: fetchedData } = await getWorldById(worldId)
        if (fetchedData) {
          setCurrentWorld(fetchedData)
        }
      } catch (error) {
        console.error('Error fetching world:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorld()
  }, [worldId, data, setCurrentWorld])

  if (!worldId) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <div className="text-center space-y-2">
          <Globe className="h-12 w-12 mx-auto opacity-20" />
          <p>{t('selectPrompt')}</p>
        </div>
      </div>
    )
  }

  if (loading && !world) {
    return <WorldDetailSkeleton />
  }

  if (!world) {
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-6 pb-0 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{world.name}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {t('createdOn', { date: new Date(world.createdAt).toLocaleDateString() })}
                </span>
              </div>
              {world.updatedAt && (
                <div className="flex items-center gap-1">
                  <span>
                    {t('updatedOn', { date: new Date(world.updatedAt).toLocaleDateString() })}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {onEditClick && (
              <Button variant="outline" size="icon" onClick={() => onEditClick(world)}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDeleteClick && (
              <Button variant="outline" size="icon" onClick={() => onDeleteClick(world)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        </div>
        <Separator />
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Rules Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">{t('rules')}</h2>
            <Card>
              <CardContent className="pt-6">
                {world.description ? (
                  <Markdown content={world.description} />
                ) : (
                  <p className="text-muted-foreground italic">{t('noRules')}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Attributes Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <AttributeList
              title={t('mainAttributes')}
              attributes={world.mainAttributes}
              emptyText={t('noAttributes')}
            />
            <AttributeList
              title={t('statusAttributes')}
              attributes={world.statusAttributes}
              emptyText={t('noStatus')}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
