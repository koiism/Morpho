import { openapiPlugin } from './openapi'
import type { Plugin } from 'payload'
import { s3StoragePlugin } from './s3Storage'
import { authPlugin } from './auth'
import { zodSchemaPlugin } from './zodSchema'

export const plugins: Plugin[] = [
  ...openapiPlugin,
  ...s3StoragePlugin,
  ...authPlugin,
  zodSchemaPlugin(),
]
