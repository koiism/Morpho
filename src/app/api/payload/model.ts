import { collectionSlugs, findSchema } from '@/payload/plugins/zodSchema'
import z from 'zod'

export const PayloadModel = {
  findQuery: findSchema,
  findByIdParams: z.object({
    slugs: z.enum(collectionSlugs),
    id: z.string(),
  }),
  findParams: z.object({
    slugs: z.enum(collectionSlugs),
  }),

  searchQuery: z.object({
    query: z.string().optional(),
    ...findSchema.shape,
  }),
  createBody: z.record(z.string(), z.any()),
  updateBody: z.record(z.string(), z.any()),
}
