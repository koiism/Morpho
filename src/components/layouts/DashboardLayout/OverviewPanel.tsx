'use client'

import * as React from 'react'
import { Search, Loader2, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { useSearchList, UseSearchListOptions } from '@/hooks/useSearchList'

export interface SearchListConfig<T> extends UseSearchListOptions<T> {
  renderItem: (item: T) => React.ReactNode
  searchPlaceholder?: string
  emptyText?: string
  pageInfoText?: (current: number, total: number) => string
  prevPageText?: string
  nextPageText?: string
  onAddClick?: () => void
  addText?: string
}

interface OverviewPanelProps<T> {
  config: SearchListConfig<T>
}

export const OverviewPanel = React.memo(<T,>({ config }: OverviewPanelProps<T>) => {
  const { searchQuery, setSearchQuery, data, page, setPage, totalPages, loading } =
    useSearchList(config)

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={config.searchPlaceholder || 'Search...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        {config.onAddClick && (
          <Button onClick={config.onAddClick} size="icon" aria-label={config.addText || 'Add'}>
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 -mx-4 px-4 min-h-0">
        <div className="flex flex-col gap-2 pb-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {data.map((item, i) => (
                <React.Fragment key={i}>{config.renderItem(item)}</React.Fragment>
              ))}
              {data.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-8">
                  {config.emptyText || 'No results found.'}
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="text-sm text-muted-foreground">
          {config.pageInfoText ? config.pageInfoText(page, totalPages) : `${page} / ${totalPages}`}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            aria-label={config.prevPageText || 'Previous page'}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || loading}
            aria-label={config.nextPageText || 'Next page'}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
})
OverviewPanel.displayName = 'OverviewPanel'
