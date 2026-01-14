import { getPayload } from '@/lib/payload'
import { CollectionSlug } from 'payload'
import { TBatchCreateSchema, TBatchDeleteSchema, TBatchUpdateSchema, TQuerySchema } from './model'

export class PayloadService {
  /**
   * Batch create items in a collection
   */
  async batchCreate(body: TBatchCreateSchema) {
    const { collection, items } = body

    const payload = await getPayload()
    const results = []
    const errors = []

    // Payload Local API create is singular, so we loop
    // In a real production env, we might want to limit concurrency
    for (const item of items) {
      try {
        const result = await payload.create({
          collection: collection as CollectionSlug,
          data: item,
        })
        results.push(result)
      } catch (error: any) {
        errors.push({ item, error: error.message })
      }
    }

    return {
      success: true,
      count: results.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    }
  }

  /**
   * Batch update items in a collection
   * Since each item might have different updates, we loop.
   * If all items had SAME update, we could use update({ where: ... })
   */
  async batchUpdate(body: TBatchUpdateSchema) {
    const { collection, updates } = body

    const payload = await getPayload()
    const results = []
    const errors = []

    for (const update of updates) {
      try {
        const result = await payload.update({
          collection: collection as CollectionSlug,
          id: update.id,
          data: update.data,
        })
        results.push(result)
      } catch (error: any) {
        errors.push({ id: update.id, error: error.message })
      }
    }

    return {
      success: true,
      count: results.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    }
  }

  /**
   * Batch delete items in a collection
   * We can use the `where` clause with `in` operator for better performance if supported,
   * but strictly speaking `delete` with `where` deletes all matching.
   */
  async batchDelete(body: TBatchDeleteSchema) {
    const { collection, ids } = body

    const payload = await getPayload()

    try {
      const result = await payload.delete({
        collection: collection as CollectionSlug,
        where: {
          id: {
            in: ids,
          },
        },
      })

      return {
        success: true,
        // result.docs contains the deleted documents
        count: result.docs.length,
        deletedIds: result.docs.map((doc: any) => doc.id),
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Query items
   */
  async find(body: TQuerySchema) {
    const { collection, ...query } = body

    const payload = await getPayload()

    const result = await payload.find({
      collection: collection as CollectionSlug,
      limit: query.limit,
      page: query.page,
      sort: query.sort,
      depth: query.depth,
    })

    return result
  }
}

export const payloadService = new PayloadService()
