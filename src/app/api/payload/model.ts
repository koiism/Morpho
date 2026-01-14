import { t } from 'elysia'

// Batch Create Schema
export const BatchCreateSchema = t.Object({
  collection: t.String({ description: '集合的 Slug 标识符' }),
  items: t.Array(t.Any(), { description: '要创建的项目数组' }),
})

export type TBatchCreateSchema = typeof BatchCreateSchema.static

// Batch Update Schema
export const BatchUpdateSchema = t.Object({
  collection: t.String({ description: '集合的 Slug 标识符' }),
  updates: t.Array(
    t.Object({
      id: t.String({ description: '要更新的项目的 ID' }),
      data: t.Any({ description: '要更新的数据' }),
    }),
    { description: '包含 ID 和数据的更新数组' },
  ),
})

export type TBatchUpdateSchema = typeof BatchUpdateSchema.static

// Batch Delete Schema
export const BatchDeleteSchema = t.Object({
  collection: t.String({ description: '集合的 Slug 标识符' }),
  ids: t.Array(t.String(), { description: '要删除的 ID 数组' }),
})

export type TBatchDeleteSchema = typeof BatchDeleteSchema.static

// Query Schema (Read)
export const QuerySchema = t.Object({
  collection: t.String({ description: '集合的 Slug 标识符' }),
  limit: t.Optional(t.Number({ default: 10, description: '限制数量' })),
  page: t.Optional(t.Number({ default: 1, description: '页码' })),
  sort: t.Optional(t.String({ description: '排序字段' })),
  depth: t.Optional(t.Number({ default: 1, description: '嵌套深度' })),
})

export type TQuerySchema = typeof QuerySchema.static
