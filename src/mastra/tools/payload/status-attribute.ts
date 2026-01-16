import { createTool } from '@mastra/core/tools'
import { treaty } from '@elysiajs/eden'
import type { APP } from '../../../app/api/payload/[[...slugs]]/route'
import { getServerSideURL } from '../../../lib/getURL'
import { collection2Zod } from '../../../lib/payload2Zod'
import { StatusAttributes } from '../../../payload/collections/StatusAttributes'
import { deleteSchema, findSchema } from '../../schemas'

export const createStatusAttribute = createTool({
  id: 'create-status-attribute',
  description: '创建新的状态属性',
  inputSchema: collection2Zod(StatusAttributes),
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
  inputSchema: collection2Zod(StatusAttributes),
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
  inputSchema: deleteSchema,
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
  inputSchema: findSchema,
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
