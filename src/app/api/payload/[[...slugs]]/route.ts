import { Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'
import { payloadAuth } from '@/elysia/plugin/payloadAuth'
import { serverTiming } from '@elysiajs/server-timing'
import { PayloadModel } from '../model'

const app = new Elysia({ prefix: '/api/payload' })
  .use(openapi())
  .use(serverTiming())
  .use(payloadAuth())
  // 查找记录
  .get(
    '/:slugs',
    async ({ params: { slugs }, query, getPayload, getSession, request }) => {
      const { user } = await getSession({ request })
      const payload = await getPayload()
      const limit = query.limit ? query.limit : 10
      const page = query.page ? query.page : 1
      const depth = query?.depth ? query.depth : undefined
      return await payload.find({
        collection: slugs,
        limit,
        page,
        sort: query?.sort,
        depth,
        overrideAccess: false,
        user,
      })
    },
    {
      params: PayloadModel.findParams,
      query: PayloadModel.findQuery,
    },
  )
  // 查找记录详情
  .get(
    '/:slugs/:id',
    async ({ params: { slugs, id }, getPayload, getSession, request }) => {
      const { user } = await getSession({ request })
      const payload = await getPayload()
      return await payload.findByID({
        collection: slugs,
        id,
        overrideAccess: false,
        user,
      })
    },
    {
      params: PayloadModel.findByIdParams,
    },
  )
  // 查找我的记录
  .get(
    '/my/:slugs',
    async ({ params: { slugs }, query, getPayload, getSession, request }) => {
      const { user } = await getSession({ request })
      const payload = await getPayload()
      const limit = query.limit ? query.limit : 10
      const page = query.page ? query.page : 1
      const depth = query?.depth ? query.depth : undefined
      return await payload.find({
        collection: slugs,
        limit,
        page,
        sort: query?.sort,
        depth,
        overrideAccess: false,
        user,
        where: {
          creator: {
            equals: user?.id,
          },
        },
      })
    },
    {
      params: PayloadModel.findParams,
      query: PayloadModel.findQuery,
    },
  )

export type APP = typeof app

export const GET = app.handle
