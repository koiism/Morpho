import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { treaty } from '@elysiajs/eden'
import type { APP } from '../../../app/api/payload/[[...slugs]]/route'
import { getServerSideURL } from '../../../lib/getURL'

export const createMainAttribute = createTool({
  id: 'create-main-attribute',
  description: '创建新的主要属性',
  inputSchema: z.object({
    name: z.string().describe('属性名称'),
    emoji: z.string().optional().describe('属性的 Emoji 图标'),
    guidelines: z.string().max(40).optional().describe('属性指南（最多 40 个字符）'),
  }),
  execute: async ({ context }) => {
    const eden = treaty<APP>(getServerSideURL())
    const response = await eden.api.payload['batch-create'].post({
      collection: 'main-attributes',
      items: [context],
    })

    if (response.error) {
      throw new Error(JSON.stringify(response.error))
    }

    return response.data
  },
})

export const updateMainAttribute = createTool({
  id: 'update-main-attribute',
  description: '更新现有的主要属性',
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
      collection: 'main-attributes',
      updates: [{ id, data }],
    })

    if (response.error) {
      throw new Error(JSON.stringify(response.error))
    }

    return response.data
  },
})

export const deleteMainAttribute = createTool({
  id: 'delete-main-attribute',
  description: '通过 ID 删除主要属性',
  inputSchema: z.object({
    id: z.string().describe('要删除的属性 ID'),
  }),
  execute: async ({ context }) => {
    const eden = treaty<APP>(getServerSideURL())
    const response = await eden.api.payload['batch-delete'].post({
      collection: 'main-attributes',
      ids: [context.id],
    })

    if (response.error) {
      throw new Error(JSON.stringify(response.error))
    }

    return response.data
  },
})

export const findMainAttributes = createTool({
  id: 'find-main-attributes',
  description: '查询主要属性',
  inputSchema: z.object({
    limit: z.number().optional().default(10).describe('每页数量'),
    page: z.number().optional().default(1).describe('页码'),
    sort: z.string().optional().describe('排序字段'),
    depth: z.number().optional().describe('查询深度'),
  }),
  execute: async ({ context }) => {
    const eden = treaty<APP>(getServerSideURL())
    const response = await eden.api.payload.find.post({
      collection: 'main-attributes',
      ...context,
    })

    if (response.error) {
      throw new Error(JSON.stringify(response.error))
    }

    return response.data
  },
})
