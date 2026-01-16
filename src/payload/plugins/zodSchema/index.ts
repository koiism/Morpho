import { collection2Zod } from '../../../lib/payload2Zod'
import type { Plugin, CollectionSlug } from 'payload'
import { z } from 'zod'

export const payloadSchemas: {
  [key in CollectionSlug]?: z.ZodObject
} = {}

export const payloadJSONSchemas: {
  [key in CollectionSlug]?: Record<string, unknown>
} = {}

export function zodSchemaPlugin(): Plugin {
  return (config) => {
    config.collections?.forEach((collection) => {
      payloadSchemas[collection.slug as CollectionSlug] = collection2Zod(collection)
      payloadJSONSchemas[collection.slug as CollectionSlug] =
        collection2Zod(collection).toJSONSchema()
    })
    return config
  }
}
