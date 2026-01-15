import React from 'react'
import { useTranslations } from 'next-intl'

export function DashboardStats() {
  const t = useTranslations('Dashboard.entry.stats')

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
        <div className="text-2xl font-bold">12</div>
        <div className="text-xs text-muted-foreground">{t('activeGames')}</div>
      </div>
      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
        <div className="text-2xl font-bold">5</div>
        <div className="text-xs text-muted-foreground">{t('characters')}</div>
      </div>
      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
        <div className="text-2xl font-bold">3</div>
        <div className="text-xs text-muted-foreground">{t('worldsCreated')}</div>
      </div>
      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
        <div className="text-2xl font-bold">24h</div>
        <div className="text-xs text-muted-foreground">{t('playTime')}</div>
      </div>
    </div>
  )
}
