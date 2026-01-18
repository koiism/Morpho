import { collection2Zod } from '../../../lib/payload2Zod'
import type { Plugin, CollectionSlug } from 'payload'
import { z } from 'zod'

export const deleteSchema = z.object({
  id: z.string().describe('要删除的记录 ID'),
})

export const findSchema = z.object({
  limit: z
    .string()
    .transform((val) => parseInt(val || ''))
    .optional()
    .default(10)
    .describe('每页数量'),
  page: z
    .string()
    .transform((val) => parseInt(val || ''))
    .optional()
    .default(1)
    .describe('页码'),
  sort: z.string().optional().describe('排序字段'),
  depth: z
    .string()
    .transform((val) => parseInt(val || ''))
    .optional()
    .describe('查询深度'),
})

export type FindQuery = z.infer<typeof findSchema>

export const collectionSlugs: CollectionSlug[] = ['worlds'] as const

export const payloadSchemas: {
  create: {
    [key in CollectionSlug]?: z.ZodObject
  }
  update: {
    [key in CollectionSlug]?: z.ZodOptional<z.ZodObject>
  }
  read: {
    [key in CollectionSlug]?: z.ZodObject
  }
} = {
  create: {},
  update: {},
  read: {},
}

export const payloadJSONSchemas: {
  create: {
    [key in CollectionSlug]?: Record<string, unknown>
  }
  update: {
    [key in CollectionSlug]?: Record<string, unknown>
  }
  read: {
    [key in CollectionSlug]?: Record<string, unknown>
  }
} = {
  create: {},
  update: {},
  read: {},
}

export function zodSchemaPlugin(): Plugin {
  return (config) => {
    config.collections?.forEach((collection) => {
      collectionSlugs.push(collection.slug as CollectionSlug)
      payloadSchemas.create[collection.slug as CollectionSlug] = collection2Zod(collection)
      payloadJSONSchemas.create[collection.slug as CollectionSlug] =
        collection2Zod(collection).toJSONSchema()
      payloadSchemas.update[collection.slug as CollectionSlug] =
        collection2Zod(collection).optional()
      payloadJSONSchemas.update[collection.slug as CollectionSlug] = collection2Zod(collection)
        .optional()
        .toJSONSchema()
      payloadSchemas.read[collection.slug as CollectionSlug] = collection2Zod(collection, {
        mode: 'read',
      })
      payloadJSONSchemas.read[collection.slug as CollectionSlug] = collection2Zod(collection, {
        mode: 'read',
      }).toJSONSchema()
    })
    return config
  }
}
