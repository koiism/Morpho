'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { World } from '@/payload-types'
import { cn } from '@/lib/utils'

interface WorldListItemProps {
  world: World
  isSelected: boolean
  onClick: () => void
}

export function WorldListItem({ world, isSelected, onClick }: WorldListItemProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-colors hover:bg-accent/50',
        isSelected && 'bg-accent border-primary',
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-base font-medium leading-none">{world.name}</CardTitle>
      </CardHeader>
      {world.description && (
        <CardContent className="p-4 pt-0">
          <p className="text-xs text-muted-foreground line-clamp-2">{world.description}</p>
        </CardContent>
      )}
    </Card>
  )
}
