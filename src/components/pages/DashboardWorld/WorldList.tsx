'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { World } from '@/payload-types'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

interface WorldListProps {
  worlds: World[]
  selectedWorldId?: string
  onSelectWorld: (world: World) => void
}

export function WorldList({ worlds, selectedWorldId, onSelectWorld }: WorldListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredWorlds = useMemo(() => {
    return worlds.filter((world) => world.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [worlds, searchQuery])

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索世界..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="flex flex-col gap-2 pb-4">
          {filteredWorlds.map((world) => (
            <Card
              key={world.id}
              className={cn(
                'cursor-pointer transition-colors hover:bg-accent/50',
                selectedWorldId === world.id && 'bg-accent border-primary',
              )}
              onClick={() => onSelectWorld(world)}
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
          ))}
          {filteredWorlds.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-8">没有找到相关世界</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
