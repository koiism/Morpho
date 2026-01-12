import { openapi, scalar } from 'payload-oapi'

export const openapiPlugin = [
  openapi({
    openapiVersion: '3.0',
    metadata: {
      title: 'Dev API',
      version: '0.0.1',
    },
  }),
  scalar({}),
]
