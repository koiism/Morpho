'use client'

import * as React from 'react'
import { World } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, Globe, Loader2, Edit, Trash2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslations } from 'next-intl'
import { FluentEmoji } from '@lobehub/fluent-emoji'
import { Markdown } from '@/components/ui/markdown'
import { getWorldById } from '@/lib/api/payload'
import { Button } from '@/components/ui/button'

interface WorldDetailProps {
  worldId: string | null
  onEditClick?: (world: World) => void
  onDeleteClick?: (world: World) => void
}

export function WorldDetail({ worldId, onEditClick, onDeleteClick }: WorldDetailProps) {
  const t = useTranslations('WorldDetail')
  const [world, setWorld] = React.useState<World | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!worldId) {
      setWorld(null)
      return
    }

    const fetchWorld = async () => {
      setLoading(true)
      try {
        const { data } = await getWorldById(worldId)
        if (data) {
          setWorld(data)
        }
      } catch (error) {
        console.error('Error fetching world:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorld()
  }, [worldId])

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

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
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
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {t('rules')}
            </h2>
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {t('mainAttributes')}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  {world.mainAttributes && world.mainAttributes.length > 0 ? (
                    <div className="grid gap-2">
                      {world.mainAttributes.map((attr: any) => (
                        <div key={attr.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{attr.emoji}</span>
                            <span className="font-medium">{attr.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic text-sm">No attributes configured.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {t('statusAttributes')}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  {world.statusAttributes && world.statusAttributes.length > 0 ? (
                    <div className="grid gap-2">
                      {world.statusAttributes.map((attr: any) => (
                        <div key={attr.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{attr.emoji}</span>
                            <span className="font-medium">{attr.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic text-sm">No status configured.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
