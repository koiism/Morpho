'use client';

import React from 'react';
import { CanvasComponent } from './types';

interface PropertiesPanelProps {
  component: CanvasComponent | null;
  onUpdate: (id: string, updates: Partial<CanvasComponent>) => void;
}

export function PropertiesPanel({ component, onUpdate }: PropertiesPanelProps) {
  if (!component) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col items-center justify-center text-center h-full">
        <p className="text-gray-400 text-sm">Select a component to edit properties</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 flex flex-col gap-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Properties</h2>
        <p className="text-xs text-gray-500 font-mono">ID: {component.id}</p>
      </div>

      {/* Common Properties */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <label className="text-sm font-medium text-gray-700">Dynamic</label>
           <button 
             type="button"
             className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors border-none flex items-center ${component.isDynamic ? 'bg-green-500' : 'bg-gray-300'}`}
             onClick={() => onUpdate(component.id, { isDynamic: !component.isDynamic })}
           >
             <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${component.isDynamic ? 'translate-x-4' : 'translate-x-0'}`} />
           </button>
        </div>

        {component.isDynamic && (
           <div className="space-y-1">
             <label className="text-xs font-medium text-gray-500">Parameter Key</label>
             <input
               type="text"
               className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
               value={component.dynamicKey || ''}
               onChange={(e) => onUpdate(component.id, { dynamicKey: e.target.value })}
               placeholder="e.g. user_name"
             />
           </div>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Type Specific Properties */}
      <div className="space-y-4">
        {component.type === 'text' && (
          <div className="space-y-3">
             <div className="space-y-1">
               <label className="text-xs font-medium text-gray-500">Content</label>
               <textarea
                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                 value={component.content || ''}
                 onChange={(e) => onUpdate(component.id, { content: e.target.value })}
                 placeholder="Enter text..."
               />
             </div>
             <div className="space-y-1">
               <label className="text-xs font-medium text-gray-500">Color</label>
               <input
                 type="color"
                 className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                 value={component.color || '#000000'}
                 onChange={(e) => onUpdate(component.id, { color: e.target.value })}
               />
             </div>
          </div>
        )}

        {(component.type === 'shape') && (
           <div className="space-y-1">
             <label className="text-xs font-medium text-gray-500">Color</label>
             <input
               type="color"
               className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
               value={component.color || '#3b82f6'}
               onChange={(e) => onUpdate(component.id, { color: e.target.value })}
             />
           </div>
        )}
        
        {/* Dimensions */}
         <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
               <label className="text-xs font-medium text-gray-500">Width</label>
               <input
                 type="number"
                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                 value={component.width}
                 onChange={(e) => onUpdate(component.id, { width: parseInt(e.target.value) || 0 })}
               />
            </div>
            <div className="space-y-1">
               <label className="text-xs font-medium text-gray-500">Height</label>
               <input
                 type="number"
                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                 value={component.height}
                 onChange={(e) => onUpdate(component.id, { height: parseInt(e.target.value) || 0 })}
               />
            </div>
         </div>
      </div>
    </div>
  );
}
