import React from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Play, Clock, Edit2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface GameCardProps {
  title: string
  description?: string
  image?: string
  status?: 'active' | 'archived' | 'draft'
  type: 'game' | 'character' | 'world' | 'script'
  lastPlayed?: string
  className?: string
}

export function GameCard({
  title,
  description,
  image,
  status,
  type,
  lastPlayed,
  className,
}: GameCardProps) {
  const t = useTranslations('Dashboard.entry.actions')

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all hover:shadow-lg hover:border-primary/50',
        className,
      )}
    >
      <div className="relative h-32 w-full bg-muted/20 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted/50 to-muted text-muted-foreground/20">
            <div className="text-4xl font-bold uppercase tracking-widest opacity-20">{type}</div>
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 backdrop-blur-md bg-background/50"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        {status && (
          <div className="absolute top-2 left-2">
            <Badge
              variant={status === 'active' ? 'default' : 'secondary'}
              className="backdrop-blur-md"
            >
              {status}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
        {description && <p className="line-clamp-2 text-xs text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardFooter className="flex items-center justify-between p-4 pt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{lastPlayed || 'Just now'}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
          {type === 'game' ? (
            <>
              <Play className="h-3 w-3" /> {t('play')}
            </>
          ) : (
            <>
              <Edit2 className="h-3 w-3" /> {t('edit')}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
