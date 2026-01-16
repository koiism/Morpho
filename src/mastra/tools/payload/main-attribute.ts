import { createTool } from '@mastra/core/tools'
import { treaty } from '@elysiajs/eden'
import type { APP } from '../../../app/api/payload/[[...slugs]]/route'
import { getServerSideURL } from '../../../lib/getURL'
import { collection2Zod } from '../../../lib/payload2Zod'
import { MainAttributes } from '../../../payload/collections/MainAttributes'
import { deleteSchema, findSchema } from '../../schemas'

export const createMainAttribute = createTool({
  id: 'create-main-attribute',
  description: '创建新的主要属性',
  inputSchema: collection2Zod(MainAttributes),
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
  inputSchema: collection2Zod(MainAttributes),
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
  inputSchema: deleteSchema,
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
  inputSchema: findSchema,
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
