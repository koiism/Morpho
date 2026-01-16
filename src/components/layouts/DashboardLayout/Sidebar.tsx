'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Link, usePathname } from '@/i18n/routing'
import { useNavItems } from './useNavItems'
import { UserNav } from './UserNav'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean
}

export function Sidebar({ className, isCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const items = useNavItems()

  const mainNavItems = items.filter((item) => item.id !== 'settings')
  const settingsItem = items.find((item) => item.id === 'settings')

  return (
    <div className={cn('flex h-full flex-col gap-2 bg-muted/10', className)}>
      <div
        className={cn(
          'flex h-[52px] items-center px-4',
          isCollapsed ? 'justify-center' : 'justify-start',
        )}
      >
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            M
          </div>
          {!isCollapsed && (
            <span className="bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              Morpho
            </span>
          )}
        </div>
      </div>

      <div className="px-2 py-2">
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-accent text-accent-foreground',
                  isCollapsed && 'justify-center px-2',
                )}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mt-auto px-2 py-4">
        <div className="space-y-1">
          {settingsItem && (
            <Link
              href={settingsItem.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                isCollapsed && 'justify-center px-2',
              )}
            >
              <settingsItem.icon className="h-4 w-4" />
              {!isCollapsed && <span>{settingsItem.title}</span>}
            </Link>
          )}

          <UserNav
            isCollapsed={isCollapsed}
            showDetails={true}
            className={cn(
              'mt-4 rounded-lg border bg-card p-3 text-card-foreground shadow-sm transition-all duration-300',
              isCollapsed && 'justify-center p-2',
            )}
          />
        </div>
      </div>
    </div>
  )
}
