'use client'

import * as React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Sidebar } from './Sidebar'
import { cn } from '@/lib/utils'
import { LimelightNav } from '@/components/ui/shadcn-io/limelight-nav'
import { usePathname, useRouter } from '@/i18n/routing'
import { useNavItems } from './useNavItems'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const items = useNavItems()

  const activeIndex = items.findIndex((item) => {
    if (item.href === '/') return pathname === '/'
    return pathname?.startsWith(item.href)
  })

  return (
    <div className="h-screen w-full bg-background overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden md:block h-full w-full">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            if (sizes[0] < 10) {
              setIsCollapsed(true)
            } else {
              setIsCollapsed(false)
            }
          }}
          className="h-full w-full items-stretch"
        >
          <ResizablePanel
            defaultSize={10}
            collapsedSize={4}
            collapsible={true}
            minSize={10}
            maxSize={20}
            onCollapse={() => setIsCollapsed(true)}
            onExpand={() => setIsCollapsed(false)}
            className={cn(
              'flex flex-col border-r transition-[width] duration-300 ease-in-out',
              isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out',
            )}
          >
            <Sidebar isCollapsed={isCollapsed} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={80} minSize={30}>
            <div className="h-full w-full overflow-y-auto bg-background/50 backdrop-blur-sm">
              {children}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col h-full w-full">
        <div className="flex-1 overflow-y-auto bg-background/50 backdrop-blur-sm">{children}</div>
        <div className="shrink-0">
          <LimelightNav
            items={items.map((item) => ({
              id: item.id,
              icon: <item.icon />,
              label: item.title,
              onClick: () => router.push(item.href),
            }))}
            activeIndex={activeIndex === -1 ? 0 : activeIndex}
            className="w-full rounded-none border-t border-x-0 border-b-0 justify-between px-4"
            iconContainerClassName="flex-1"
          />
        </div>
      </div>
    </div>
  )
}
