import { Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'
import { payloadService } from '../service'
import { BatchCreateSchema, BatchUpdateSchema, BatchDeleteSchema, QuerySchema } from '../model'

const app = new Elysia({ prefix: '/api/payload' })
  .use(openapi())
  // Batch Create
  .post(
    '/batch-create',
    async ({ body }) => {
      return await payloadService.batchCreate(body)
    },
    {
      body: BatchCreateSchema,
      detail: {
        summary: '批量创建项目',
        tags: ['Payload'],
      },
    },
  )

  // Batch Update
  .post(
    '/batch-update',
    async ({ body }) => {
      return await payloadService.batchUpdate(body)
    },
    {
      body: BatchUpdateSchema,
      detail: {
        summary: '批量更新项目',
        tags: ['Payload'],
      },
    },
  )

  // Batch Delete
  .post(
    '/batch-delete',
    async ({ body }) => {
      return await payloadService.batchDelete(body)
    },
    {
      body: BatchDeleteSchema,
      detail: {
        summary: '批量删除项目',
        tags: ['Payload'],
      },
    },
  )

  // Find (Read)
  // We use POST for find to easily support complex JSON 'where' queries in body
  // Alternatively could use GET with query params but JSON structure is harder to pass
  .post(
    '/find',
    async ({ body }) => {
      return await payloadService.find(body)
    },
    {
      body: QuerySchema,
      detail: {
        summary: '查询项目',
        tags: ['Payload'],
      },
    },
  )

  .get('', async () => {
    return {
      message: 'Hello, World!',
    }
  })

export type APP = typeof app

export const GET = app.handle
export const POST = app.handle
