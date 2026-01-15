'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { GameCardGrid } from './GameCardGrid'
import { mockData } from './mockData'

type TabValue = 'games' | 'characters' | 'worlds' | 'scripts'

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<TabValue>('games')
  const t = useTranslations('Dashboard.entry')

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1">
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            {(['games', 'characters', 'worlds', 'scripts'] as TabValue[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                  activeTab === tab && 'bg-background text-foreground shadow-sm',
                )}
              >
                {t(`tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('searchPlaceholder')} className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {activeTab === 'games' && (
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold tracking-tight">{t('sections.activeGames')}</h2>
              <GameCardGrid items={mockData.games.active} />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold tracking-tight">
                {t('sections.archivedGames')}
              </h2>
              <GameCardGrid items={mockData.games.archived} />
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <GameCardGrid
            items={mockData.characters}
            className="animate-in fade-in-50 duration-300"
          />
        )}

        {activeTab === 'worlds' && (
          <GameCardGrid items={mockData.worlds} className="animate-in fade-in-50 duration-300" />
        )}

        {activeTab === 'scripts' && (
          <GameCardGrid items={mockData.scripts} className="animate-in fade-in-50 duration-300" />
        )}
      </div>
    </div>
  )
}
