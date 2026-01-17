import { getPayload } from '@/lib/payload'
import Elysia from 'elysia'

export const payloadAuth = () =>
  new Elysia()
    .decorate('getSession', async ({ request }: { request: Request }) => {
      const { headers } = request
      const payload = await getPayload()
      const { session, user } = (await payload.betterAuth.api.getSession({ headers })) || {}
      console.log('Hello Elysia', session, user)
      return { session, user }
    })
    .decorate('getPayload', getPayload)
