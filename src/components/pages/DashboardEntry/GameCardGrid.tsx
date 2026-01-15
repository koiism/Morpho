import React from 'react'
import { GameCard } from './GameCard'
import { GameItem } from './mockData'
import { cn } from '@/lib/utils'

interface GameCardGridProps {
  items: GameItem[]
  className?: string
}

export function GameCardGrid({ items, className }: GameCardGridProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {items.map((item, index) => (
        <GameCard
          key={`${item.type}-${index}`}
          {...item}
        />
      ))}
    </div>
  )
}
