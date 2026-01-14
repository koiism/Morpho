import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { treaty } from '@elysiajs/eden'
import type { APP } from '../../app/api/payload/[[...slugs]]/route'
import { getServerSideURL } from '../../lib/getURL'

export const edenDemoTool = createTool({
  id: 'edenDemo',
  description: 'eden API 调用测试',
  inputSchema: z.object({}),
  outputSchema: z.object({
    message: z.string(),
  }),
  execute: async ({ context }) => {
    const eden = treaty<APP>(getServerSideURL())
    const response = await eden.api.payload.get()
    return {
      message: response.data?.message || 'No message',
    }
  },
})
