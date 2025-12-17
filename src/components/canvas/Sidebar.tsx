'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, Image as ImageIcon, QrCode, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComponentType } from './types';

interface SidebarItemProps {
  type: ComponentType;
  label: string;
  icon: React.ElementType;
}

function SidebarItem({ type, label, icon: Icon }: SidebarItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${type}`,
    data: {
      type,
      isSidebar: true,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50 hover:border-blue-500 transition-all shadow-sm",
        isDragging && "opacity-50 border-blue-500 bg-blue-50"
      )}
    >
      <Icon className="w-6 h-6 mb-2 text-gray-700" />
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 border-r border-gray-200 p-4 flex flex-col gap-4 h-full overflow-y-auto">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800">Morpho</h1>
        <p className="text-xs text-gray-500">Canvas Editor</p>
      </div>
      
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Components</h2>
        <div className="grid grid-cols-2 gap-3">
          <SidebarItem type="text" label="Text" icon={Type} />
          <SidebarItem type="image" label="Image" icon={ImageIcon} />
          <SidebarItem type="qr" label="QR Code" icon={QrCode} />
          <SidebarItem type="shape" label="Shape" icon={Square} />
        </div>
      </div>
    </div>
  );
}
