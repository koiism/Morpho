import { create } from 'zustand'
import { World } from '@/payload-types'

export type ViewMode = 'detail' | 'create' | 'edit'

interface WorldState {
  selectedWorldId: string | null
  currentWorld: World | null
  viewMode: ViewMode
  refreshKey: number

  // Actions
  setSelectedWorldId: (id: string | null) => void
  setCurrentWorld: (world: World | null) => void
  setViewMode: (mode: ViewMode) => void
  refreshList: () => void
  
  // Unified actions
  selectWorld: (worldId: string | null, worldData?: World | null) => void
  startCreate: () => void
  startEdit: (world: World) => void
  handleSuccess: (world: World) => void
  handleCancel: () => void
}

export const useWorldStore = create<WorldState>((set) => ({
  selectedWorldId: null,
  currentWorld: null,
  viewMode: 'detail',
  refreshKey: 0,

  setSelectedWorldId: (id) => set({ selectedWorldId: id }),
  setCurrentWorld: (world) => set({ currentWorld: world }),
  setViewMode: (viewMode) => set({ viewMode }),
  refreshList: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),

  selectWorld: (worldId, worldData = null) => {
    set((state) => {
      // 如果点击的是当前已选中的世界，且已经有完整数据，则只需切换到详情视图，不清除数据
      if (state.selectedWorldId === worldId && state.currentWorld && !worldData) {
        return { viewMode: 'detail' }
      }
      return {
        selectedWorldId: worldId,
        currentWorld: worldData,
        viewMode: 'detail'
      }
    })
  },

  startCreate: () => set({
    viewMode: 'create',
    selectedWorldId: null,
    currentWorld: null
  }),

  startEdit: (world) => set({
    viewMode: 'edit',
    currentWorld: world,
    selectedWorldId: world.id
  }),

  handleSuccess: (world) => set((state) => ({
    viewMode: 'detail',
    currentWorld: world,
    selectedWorldId: world.id,
    refreshKey: state.refreshKey + 1
  })),

  handleCancel: () => set({ viewMode: 'detail' })
}))
