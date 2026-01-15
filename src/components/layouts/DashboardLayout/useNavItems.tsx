import { LayoutDashboard, Gamepad2, ScrollText, Users, Globe, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

export interface NavItemConfig {
  id: string
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export function useNavItems() {
  const t = useTranslations('Dashboard.nav')

  const navItems: NavItemConfig[] = [
    {
      id: 'dashboard',
      title: t('dashboard'),
      href: '/',
      icon: LayoutDashboard,
    },
    {
      id: 'games',
      title: t('myGames'),
      href: '/games',
      icon: Gamepad2,
    },
    {
      id: 'scripts',
      title: t('scripts'),
      href: '/scripts',
      icon: ScrollText,
    },
    {
      id: 'characters',
      title: t('characters'),
      href: '/characters',
      icon: Users,
    },
    {
      id: 'worlds',
      title: t('worlds'),
      href: '/worlds',
      icon: Globe,
    },
    {
      id: 'settings',
      title: t('settings'),
      href: '/settings',
      icon: Settings,
    },
  ]

  return navItems
}
