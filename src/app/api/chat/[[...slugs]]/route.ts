import { mastra } from '@/mastra'
import { toAISdkFormat } from '@mastra/ai-sdk'
import { convertMessages } from '@mastra/core/agent'
import { createUIMessageStreamResponse } from 'ai'
import { Elysia, t } from 'elysia'
import { openapi } from '@elysiajs/openapi'

const weatherAgent = mastra.getAgent('weatherAgent')

const app = new Elysia({
  prefix: '/api/chat',
})
  .use(openapi())
  .post(
    '',
    async ({ body }) => {
      const { messages } = body

      const stream = await weatherAgent.stream(messages, {
        memory: {
          thread: 'example-user-id',
          resource: 'weather-chat',
        },
      })

      return createUIMessageStreamResponse({
        stream: toAISdkFormat(stream, { from: 'agent' }) as ReadableStream,
      })
    },
    {
      body: t.Object({
        messages: t.Any(),
      }),
    },
  )
  .get('', async () => {
    const memory = await weatherAgent.getMemory()
    const response = await memory?.query({
      threadId: 'example-user-id',
      resourceId: 'weather-chat',
    })

    const uiMessages = convertMessages(response?.uiMessages ?? []).to('AIV5.UI')
    return uiMessages
  })

export const GET = app.handle
export const POST = app.handle
