'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Gamepad2, ScrollText, Users, Globe, Settings } from 'lucide-react'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean
}

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  variant: 'default' | 'ghost'
}

export function Sidebar({ className, isCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useUserInfo()
  const t = useTranslations('Dashboard.nav')

  // TODO: Update hrefs when routes are available
  const navItems: NavItem[] = [
    {
      title: t('dashboard'),
      href: '/',
      icon: LayoutDashboard,
      variant: pathname === '/' ? 'default' : 'ghost',
    },
    {
      title: t('myGames'),
      href: '/games',
      icon: Gamepad2,
      variant: pathname?.startsWith('/games') ? 'default' : 'ghost',
    },
    {
      title: t('scripts'),
      href: '/scripts',
      icon: ScrollText,
      variant: pathname?.startsWith('/scripts') ? 'default' : 'ghost',
    },
    {
      title: t('characters'),
      href: '/characters',
      icon: Users,
      variant: pathname?.startsWith('/characters') ? 'default' : 'ghost',
    },
    {
      title: t('worlds'),
      href: '/worlds',
      icon: Globe,
      variant: pathname?.startsWith('/worlds') ? 'default' : 'ghost',
    },
  ]

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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                item.variant === 'default' && 'bg-accent text-accent-foreground',
                isCollapsed && 'justify-center px-2',
              )}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto px-2 py-4">
        <div className="space-y-1">
          <Link
            href="/settings"
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
              isCollapsed && 'justify-center px-2',
            )}
          >
            <Settings className="h-4 w-4" />
            {!isCollapsed && <span>{t('settings')}</span>}
          </Link>

          {user && (
            <div
              className={cn(
                'mt-4 flex items-center gap-3 rounded-lg border bg-card p-3 text-card-foreground shadow-sm',
                isCollapsed && 'justify-center p-2',
              )}
            >
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                {user.email?.[0].toUpperCase()}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-xs font-medium">{user.email}</span>
                  <span className="truncate text-[10px] text-muted-foreground">User</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
