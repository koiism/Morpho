import { createTool, Tool } from '@mastra/core/tools'
import { Agent } from '@mastra/core/agent'
import { Memory } from '@mastra/memory'
import { LibSQLStore } from '@mastra/libsql'
import { treaty } from '@elysiajs/eden'
import type { APP } from '../../app/api/payload/[[...slugs]]/route'
import { getServerSideURL } from '../../lib/getURL'
import { collection2Zod } from '../../lib/payload2Zod'
import { deleteSchema, findSchema } from '../schemas'
import type { CollectionConfig, CollectionSlug } from 'payload'
import z from 'zod'

export interface CollectionAgentConfig {
  collectionSlug: CollectionSlug
  collectionConfig: CollectionConfig | CollectionConfig[]
  agentName: string
  agentInstructions: string
  model?: string
}

export const creatTools = ({
  collectionSlug,
  collectionConfig,
}: {
  collectionSlug: CollectionSlug
  collectionConfig: CollectionConfig
}) => {
  const createSchema = collection2Zod(collectionConfig)
  const updateSchema = z.object({
    id: z.string(),
    // Partial data to update
    data: createSchema.partial(),
  })

  const createItem = createTool({
    id: `create-${collectionSlug}`,
    description: `Create new item in ${collectionSlug}`,
    inputSchema: createSchema,
    execute: async ({ context }) => {
      const eden = treaty<APP>(getServerSideURL())
      const response = await eden.api.payload['batch-create'].post({
        collection: collectionSlug as any,
        items: [context],
      })

      if (response.error) {
        throw new Error(JSON.stringify(response.error))
      }

      return response.data
    },
  })

  const updateItem = createTool({
    id: `update-${collectionSlug}`,
    description: `Update existing item in ${collectionSlug}`,
    inputSchema: updateSchema,
    execute: async ({ context }) => {
      const { id, data } = context
      const eden = treaty<APP>(getServerSideURL())
      const response = await eden.api.payload['batch-update'].post({
        collection: collectionSlug as any,
        updates: [{ id, data }],
      })

      if (response.error) {
        throw new Error(JSON.stringify(response.error))
      }

      return response.data
    },
  })

  const deleteItem = createTool({
    id: `delete-${collectionSlug}`,
    description: `Delete item from ${collectionSlug} by ID`,
    inputSchema: deleteSchema,
    execute: async ({ context }) => {
      const eden = treaty<APP>(getServerSideURL())
      const response = await eden.api.payload['batch-delete'].post({
        collection: collectionSlug as any,
        ids: [context.id],
      })

      if (response.error) {
        throw new Error(JSON.stringify(response.error))
      }

      return response.data
    },
  })

  const findItems = createTool({
    id: `find-${collectionSlug}`,
    description: `Query items from ${collectionSlug}`,
    inputSchema: findSchema,
    execute: async ({ context }) => {
      const eden = treaty<APP>(getServerSideURL())
      const response = await eden.api.payload.find.post({
        collection: collectionSlug as any,
        ...context,
      })

      if (response.error) {
        throw new Error(JSON.stringify(response.error))
      }

      return response.data
    },
  })

  return {
    createItem,
    updateItem,
    deleteItem,
    findItems,
  }
}

export const createCollectionAgent = ({
  collectionSlug,
  collectionConfig,
  agentName,
  agentInstructions,
  model = 'modelscope/Qwen/Qwen3-Coder-30B-A3B-Instruct',
}: CollectionAgentConfig) => {
  const tools: Record<string, Tool<z.ZodTypeAny>> = {}
  if (Array.isArray(collectionConfig)) {
    for (const config of collectionConfig) {
      const { createItem, updateItem, deleteItem, findItems } = creatTools({
        collectionSlug: config.slug as CollectionSlug,
        collectionConfig: config,
      })
      tools[createItem.id] = createItem
      tools[updateItem.id] = updateItem
      tools[deleteItem.id] = deleteItem
      tools[findItems.id] = findItems
    }
  } else {
    const { createItem, updateItem, deleteItem, findItems } = creatTools({
      collectionSlug,
      collectionConfig,
    })
    tools[createItem.id] = createItem
    tools[updateItem.id] = updateItem
    tools[deleteItem.id] = deleteItem
    tools[findItems.id] = findItems
  }
  return new Agent({
    name: agentName,
    instructions: `Morpho 的目标是构建一款高度自由、AI 驱动的沉浸式跑团（TRPG）应用，利用大语言模型降低门槛，提供从世界观生成到多人实时游玩的一站式解决方案。
${agentInstructions}`,
    model: model,
    memory: new Memory({
      storage: new LibSQLStore({
        url: 'file:../mastra.db',
      }),
    }),
    tools,
  })
}
