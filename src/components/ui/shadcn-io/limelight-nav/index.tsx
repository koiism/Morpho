'use client'

import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react'
import { cn } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...(props as any)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...(props as any)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
)
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...(props as any)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

export type NavItem = {
  id: string | number
  icon: React.ReactElement
  label?: string
  onClick?: () => void
}

const defaultNavItems: NavItem[] = [
  { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
  { id: 'default-explore', icon: <DefaultCompassIcon />, label: 'Explore' },
  { id: 'default-notifications', icon: <DefaultBellIcon />, label: 'Notifications' },
]

export type LimelightNavProps = {
  items?: NavItem[]
  defaultActiveIndex?: number
  activeIndex?: number
  onTabChange?: (index: number) => void
  className?: string
  limelightClassName?: string
  iconContainerClassName?: string
  iconClassName?: string
}

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex)
  const activeIndex =
    controlledActiveIndex !== undefined ? controlledActiveIndex : internalActiveIndex

  const [isReady, setIsReady] = useState(false)
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const limelightRef = useRef<HTMLDivElement | null>(null)

  const maxVisibleItems = 4
  const hasOverflow = items.length > maxVisibleItems
  const visibleItems = hasOverflow ? items.slice(0, maxVisibleItems - 1) : items
  const overflowItems = hasOverflow ? items.slice(maxVisibleItems - 1) : []

  // Determine which visual item is active
  const visualActiveIndex = hasOverflow
    ? activeIndex >= maxVisibleItems - 1
      ? maxVisibleItems - 1 // The "More" button is active
      : activeIndex
    : activeIndex

  useLayoutEffect(() => {
    if (items.length === 0) return

    const limelight = limelightRef.current
    const activeItem = navItemRefs.current[visualActiveIndex]

    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2
      limelight.style.left = `${newLeft}px`

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50)
      }
    }
  }, [visualActiveIndex, isReady, items])

  if (items.length === 0) {
    return null
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(index)
    }
    onTabChange?.(index)
    itemOnClick?.()
  }

  return (
    <nav
      className={cn(
        'relative inline-flex items-center h-16 rounded-lg bg-card text-foreground border px-2',
        className,
      )}
    >
      {visibleItems.map(({ id, icon, label, onClick }, index) => (
        <a
          key={id}
          ref={(el) => {
            navItemRefs.current[index] = el
          }}
          className={cn(
            'relative z-20 flex h-full cursor-pointer items-center justify-center p-5',
            iconContainerClassName,
          )}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
        >
          {cloneElement(icon as React.ReactElement<any>, {
            className: cn(
              'w-6 h-6 transition-opacity duration-100 ease-in-out',
              activeIndex === index ? 'opacity-100' : 'opacity-40',
              (icon.props as any)?.className || '',
              iconClassName || '',
            ),
          })}
        </a>
      ))}

      {hasOverflow && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <a
              ref={(el) => {
                navItemRefs.current[maxVisibleItems - 1] = el
              }}
              className={cn(
                'relative z-20 flex h-full cursor-pointer items-center justify-center p-5',
                iconContainerClassName,
              )}
              aria-label="More"
            >
              <MoreHorizontal
                className={cn(
                  'w-6 h-6 transition-opacity duration-100 ease-in-out',
                  activeIndex >= maxVisibleItems - 1 ? 'opacity-100' : 'opacity-40',
                  iconClassName || '',
                )}
              />
            </a>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top">
            {overflowItems.map(({ id, icon, label, onClick }, index) => {
              const originalIndex = index + maxVisibleItems - 1
              return (
                <DropdownMenuItem
                  key={id}
                  onClick={() => handleItemClick(originalIndex, onClick)}
                  className={cn(
                    'flex items-center gap-2',
                    activeIndex === originalIndex && 'bg-accent',
                  )}
                >
                  {cloneElement(icon as React.ReactElement<any>, {
                    className: 'w-4 h-4',
                  })}
                  <span>{label}</span>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <div
        ref={limelightRef}
        className={cn(
          'absolute top-0 z-10 w-11 h-[5px] rounded-full bg-primary shadow-[0_50px_15px_var(--primary)]',
          isReady ? 'transition-[left] duration-400 ease-in-out' : '',
          limelightClassName,
        )}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-30%] top-[5px] w-[160%] h-14 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" />
      </div>
    </nav>
  )
}
