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
}
