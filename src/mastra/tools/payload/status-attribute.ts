import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { treaty } from '@elysiajs/eden'
import type { APP } from '../../../app/api/payload/[[...slugs]]/route'
import { getServerSideURL } from '../../../lib/getURL'

export const createStatusAttribute = createTool({
  id: 'create-status-attribute',
  description: '创建新的状态属性',
  inputSchema: z.object({
    name: z.string().describe('属性名称'),
    emoji: z.string().optional().describe('属性的 Emoji 图标'),
    guidelines: z.string().max(40).optional().describe('属性指南（最多 40 个字符）'),
  }),
  execute: async ({ context }) => {
    const eden = treaty<APP>(getServerSideURL())
    const response = await eden.api.payload['batch-create'].post({
      collection: 'status-attributes',
      items: [context],
    })

    if (response.error) {
      throw new Error(JSON.stringify(response.error))
    }

    return response.data
  },
})

export const updateStatusAttribute = createTool({
  id: 'update-status-attribute',
  description: '更新现有的状态属性',
  inputSchema: z.object({
    id: z.string().describe('要更新的属性 ID'),
    name: z.string().optional().describe('属性名称'),
    emoji: z.string().optional().describe('属性的 Emoji 图标'),
    guidelines: z.string().max(40).optional().describe('属性指南（最多 40 个字符）'),
  }),
  execute: async ({ context }) => {
    const { id, ...data } = context
    const eden = treaty<APP>(getServerSideURL())
    const response = await eden.api.payload['batch-update'].post({
      collection: 'status-attributes',
      updates: [{ id, data }],
    })

    if (response.error) {
      throw new Error(JSON.stringify(response.error))
    }

    return response.data
  },
})

export const deleteStatusAttribute = createTool({
  id: 'delete-status-attribute',
  description: '通过 ID 删除状态属性',
  inputSchema: z.object({
    id: z.string().describe('要删除的属性 ID'),
  }),
  execute: async ({ context }) => {
    const eden = treaty<APP>(getServerSideURL())
    const response = await eden.api.payload['batch-delete'].post({
      collection: 'status-attributes',
      ids: [context.id],
    })

    if (response.error) {
      throw new Error(JSON.stringify(response.error))
    }

    return response.data
  },
})

export const findStatusAttributes = createTool({
  id: 'find-status-attributes',
  description: '查询状态属性',
  inputSchema: z.object({
    limit: z.number().optional().default(10).describe('每页数量'),
    page: z.number().optional().default(1).describe('页码'),
    sort: z.string().optional().describe('排序字段'),
    depth: z.number().optional().describe('查询深度'),
  }),
  execute: async ({ context }) => {
    const eden = treaty<APP>(getServerSideURL())
    const response = await eden.api.payload.find.post({
      collection: 'status-attributes',
      ...context,
    })

    if (response.error) {
      throw new Error(JSON.stringify(response.error))
    }

    return response.data
  },
})
