'use client'

import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserInfo } from '@/hooks/useUserInfo'
import { cn } from '@/lib/utils'

interface UserNavProps {
  className?: string
  isCollapsed?: boolean
  showDetails?: boolean
}

export function UserNav({ className, isCollapsed, showDetails }: UserNavProps) {
  const { user } = useUserInfo()

  if (!user) return null

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar className="h-8 w-8 bg-primary/20">
        <AvatarImage src="" />
        <AvatarFallback className="bg-transparent text-xs font-bold">
          {user.email?.[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showDetails && !isCollapsed && (
        <div className="flex flex-col overflow-hidden text-left">
          <span className="truncate text-xs font-medium">{user.email}</span>
          <span className="truncate text-[10px] text-muted-foreground">User</span>
        </div>
      )}
    </div>
  )
}
