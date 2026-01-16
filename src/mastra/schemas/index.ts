import { z } from 'zod'

export const deleteSchema = z.object({
  id: z.string().describe('要删除的记录 ID'),
})

export const findSchema = z.object({
  limit: z.number().optional().default(10).describe('每页数量'),
  page: z.number().optional().default(1).describe('页码'),
  sort: z.string().optional().describe('排序字段'),
  depth: z.number().optional().describe('查询深度'),
})
