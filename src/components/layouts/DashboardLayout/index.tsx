'use client'

import * as React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Sidebar } from './Sidebar'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <div className="h-screen w-full bg-background overflow-hidden">
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
  )
}
