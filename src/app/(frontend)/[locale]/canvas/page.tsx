'use client'

import React, { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  useDroppable,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Sidebar } from '@/components/canvas/Sidebar'
import { PropertiesPanel } from '@/components/canvas/PropertiesPanel'
import { CanvasItem } from '@/components/canvas/CanvasItem'
import { CanvasComponent, ComponentType } from '@/components/canvas/types'
import { Type, Image as ImageIcon, QrCode, Square } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CanvasPage() {
  const [components, setComponents] = useState<CanvasComponent[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<ComponentType | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  // Canvas Droppable Area
  const { setNodeRef: setCanvasRef, isOver } = useDroppable({
    id: 'canvas-area',
  })

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)

    if (active.data.current?.isSidebar) {
      setActiveType(active.data.current.type)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event
    setActiveId(null)
    setActiveType(null)

    if (!over) return

    // Handle dropping new item from sidebar
    if (active.data.current?.isSidebar && over.id === 'canvas-area') {
      const type = active.data.current.type as ComponentType
      const newId = `comp-${Date.now()}`

      // For a real app, we would calculate the relative position using the mouse coordinates
      // For this prototype, we'll place it somewhat centrally or with an offset

      const newComponent: CanvasComponent = {
        id: newId,
        type,
        x: 50 + components.length * 10, // Slight offset so they don't stack perfectly
        y: 50 + components.length * 10,
        width: type === 'text' ? 200 : 150,
        height: type === 'text' ? 60 : 150,
        content: type === 'text' ? 'New Text Layer' : undefined,
        color: type === 'shape' ? '#3b82f6' : '#000000',
        isDynamic: false,
      }

      setComponents([...components, newComponent])
      setSelectedId(newId)
    }
    // Handle moving existing item
    else if (active.data.current?.isCanvasItem) {
      const id = active.id as string
      const component = components.find((c) => c.id === id)
      if (component) {
        setComponents(
          components.map((c) => {
            if (c.id === id) {
              return {
                ...c,
                x: c.x + delta.x,
                y: c.y + delta.y,
              }
            }
            return c
          }),
        )
      }
    }
  }

  const handleUpdateComponent = (id: string, updates: Partial<CanvasComponent>) => {
    setComponents(components.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const selectedComponent = components.find((c) => c.id === selectedId) || null

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans text-gray-900">
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Sidebar />

        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-100 relative overflow-hidden">
          {/* Canvas Board */}
          <div
            ref={setCanvasRef}
            className={cn(
              'bg-white shadow-2xl relative transition-colors border border-gray-200',
              isOver ? 'ring-2 ring-blue-300 bg-blue-50' : '',
            )}
            style={{
              width: '500px',
              height: '700px',
              backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
            onClick={() => setSelectedId(null)}
          >
            {components.map((comp) => (
              <CanvasItem
                key={comp.id}
                component={comp}
                isSelected={selectedId === comp.id}
                onSelect={setSelectedId}
              />
            ))}

            {components.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-gray-300 font-medium text-lg">Drop components here</p>
              </div>
            )}
          </div>
        </div>

        <PropertiesPanel component={selectedComponent} onUpdate={handleUpdateComponent} />

        <DragOverlay>
          {activeId ? (
            activeType ? (
              // Sidebar item drag preview
              <div className="flex items-center justify-center w-16 h-16 bg-white border-2 border-blue-500 rounded-lg shadow-xl opacity-90 text-blue-500">
                {activeType === 'text' && <Type />}
                {activeType === 'image' && <ImageIcon />}
                {activeType === 'qr' && <QrCode />}
                {activeType === 'shape' && <Square />}
              </div>
            ) : null
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
