'use client'

import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { CanvasComponent } from './types'
import { Type, Image as ImageIcon, QrCode, Square } from 'lucide-react'

interface CanvasItemProps {
  component: CanvasComponent
  isSelected: boolean
  onSelect: (id: string) => void
}

export function CanvasItem({ component, isSelected, onSelect }: CanvasItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    data: {
      type: component.type,
      isCanvasItem: true,
      id: component.id,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  // We wrap listeners to handle selection
  const handleMouseDown = (e: React.MouseEvent) => {
    // We want to select on mouse down, but we also want drag to work.
    // listeners.onMouseDown(e) handles the drag initiation.
    // We can call onSelect here.
    onSelect(component.id)
  }

  const renderContent = () => {
    switch (component.type) {
      case 'text':
        return (
          <div
            className="w-full h-full flex items-center justify-start overflow-hidden whitespace-pre-wrap p-2"
            style={{ color: component.color || '#000000' }}
          >
            {component.content || 'Text'}
          </div>
        )
      case 'image':
        return (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden border border-dashed border-gray-300">
            {component.src ? (
              <img src={component.src} alt="" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="text-gray-400 w-8 h-8" />
            )}
          </div>
        )
      case 'qr':
        return (
          <div className="w-full h-full bg-white border border-gray-200 flex items-center justify-center p-2">
            <QrCode className="text-black w-full h-full" />
          </div>
        )
      case 'shape':
        return (
          <div
            className="w-full h-full"
            style={{ backgroundColor: component.color || '#3b82f6' }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'absolute',
        left: component.x,
        top: component.y,
        width: component.width,
        height: component.height,
      }}
      className={cn(
        'cursor-move touch-none select-none',
        isSelected ? 'ring-2 ring-blue-500 z-10' : 'hover:ring-1 hover:ring-blue-300',
        isDragging && 'opacity-80 z-50 ring-2 ring-blue-500',
      )}
      {...listeners}
      {...attributes}
      onMouseDown={(e) => {
        handleMouseDown(e)
        listeners?.onMouseDown?.(e)
      }}
    >
      {renderContent()}

      {/* Dynamic Indicator */}
      {component.isDynamic && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm z-20">
          <span className="text-[10px] text-white font-bold">D</span>
        </div>
      )}
    </div>
  )
}
