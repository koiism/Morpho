'use client'

import * as React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Sidebar } from './Sidebar'
import { cn } from '@/lib/utils'
import { LimelightNav } from '@/components/ui/shadcn-io/limelight-nav'
import { usePathname, useRouter } from '@/i18n/routing'
import { useNavItems } from './useNavItems'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { UserNav } from './UserNav'
import { OverviewPanel, SearchListConfig } from './OverviewPanel'

export type { SearchListConfig }

interface DashboardLayoutProps<T = any> {
  children: React.ReactNode
  enableOverviewPanel?: boolean
  overviewConfig?: SearchListConfig<T>
}

export function DashboardLayout({
  children,
  enableOverviewPanel = false,
  overviewConfig,
}: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const items = useNavItems()

  const activeIndex = items.findIndex((item) => {
    if (item.href === '/') return pathname === '/'
    return pathname?.startsWith(item.href)
  })

  const showOverview = enableOverviewPanel && !!overviewConfig

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
            defaultSize={15}
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

          {showOverview && (
            <>
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <div className="h-full w-full overflow-y-auto border-r bg-background/50 backdrop-blur-sm">
                  <OverviewPanel config={overviewConfig!} />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}

          <ResizablePanel defaultSize={showOverview ? 65 : 85} minSize={30}>
            <div className="h-full w-full overflow-y-auto bg-background/50 backdrop-blur-sm">
              {children}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col h-full w-full">
        <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 bg-background/50 backdrop-blur-sm">
          {showOverview ? (
            <>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Sidebar</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[80%] max-w-[300px]">
                  <OverviewPanel config={overviewConfig!} />
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <div />
          )}

          <UserNav />
        </header>

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
