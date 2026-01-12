import { openapiPlugin } from './openapi'
import type { Plugin } from 'payload'
import { s3StoragePlugin } from './s3Storage'
import { authPlugin } from './auth'

export const plugins: Plugin[] = [...openapiPlugin, ...s3StoragePlugin, ...authPlugin]
