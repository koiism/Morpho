'use client'

import * as React from 'react'
import { World } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, Globe, Loader2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslations } from 'next-intl'
import { FluentEmoji } from '@lobehub/fluent-emoji'
import { Markdown } from '@/components/ui/markdown'
import { getWorldById } from '@/lib/api/payload'

interface WorldDetailProps {
  worldId: string | null
}

export function WorldDetail({ worldId }: WorldDetailProps) {
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
        <Separator />
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6 max-w-4xl min-w-full">
          {/* 属性体系 - 如果有的话 */}
          {(world.mainAttributes?.length || 0) > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">{t('mainAttributes')}</h2>
              <div className="flex flex-wrap gap-2">
                {world.mainAttributes?.map((attr, index) => {
                  const attrName = typeof attr === 'string' ? attr : attr.name
                  const emoji = typeof attr === 'string' ? '' : attr.emoji
                  return (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                      {emoji && <FluentEmoji emoji={emoji} type="anim" size={18} />}
                      {attrName}
                    </Badge>
                  )
                })}
              </div>
            </section>
          )}

          {(world.statusAttributes?.length || 0) > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">{t('statusAttributes')}</h2>
              <div className="flex flex-wrap gap-2">
                {world.statusAttributes?.map((attr, index) => {
                  const attrName = typeof attr === 'string' ? attr : attr.name
                  const emoji = typeof attr === 'string' ? '' : attr.emoji
                  return (
                    <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                      {emoji && <FluentEmoji emoji={emoji} type="anim" size={18} />}
                      {attrName}
                    </Badge>
                  )
                })}
              </div>
            </section>
          )}

          {/* 世界法则 */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">{t('rules')}</h2>
            <Card>
              <CardContent className="pt-6">
                {world.description ? (
                  <Markdown content={world.description} className="leading-relaxed" />
                ) : (
                  <p className="leading-relaxed whitespace-pre-wrap text-muted-foreground">
                    {t('noRules')}
                  </p>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </ScrollArea>
    </div>
  )
}
