import type { FieldAdmin } from 'node_modules/payload/dist/fields/config/types'
import type { CollectionConfig, Field } from 'payload'
import { z } from 'zod'

// Helper to flatten fields from rows, collapsibles, etc.
function buildZodShape(fields: Field[]): Record<string, z.ZodTypeAny> {
  let shape: Record<string, z.ZodTypeAny> = {}

  fields.forEach((field) => {
    switch (field.type) {
      case 'row':
      case 'collapsible':
        if ('fields' in field) {
          shape = { ...shape, ...buildZodShape(field.fields) }
        }
        break
      case 'tabs':
        if ('tabs' in field) {
          field.tabs.forEach((tab) => {
            if ('fields' in tab) {
              shape = { ...shape, ...buildZodShape(tab.fields) }
            }
          })
        }
        break
      case 'group':
        if ('fields' in field && 'name' in field && field.name) {
          shape[field.name] = z.object({
            ...buildZodShape(field.fields),
          })
        } else {
          shape = { ...shape, ...buildZodShape(field.fields) }
        }
        break
      case 'join':
        break
      case 'ui':
        break
      default:
        if ('name' in field && field.name) {
          const zodField = field2Zod(field)
          if (zodField) {
            shape[field.name] = zodField
          }
        }
    }
  })

  return shape
}

type RealField = Field & {
  type: Exclude<Field['type'], 'row' | 'collapsible' | 'tabs' | 'join' | 'group' | 'ui'>
}

export function field2Zod(field: RealField): z.ZodTypeAny | null {
  if (field.admin?.readOnly || field.virtual) {
    return null
  }

  let schema: z.ZodTypeAny = z.any()
  const description = (field.admin as FieldAdmin)?.description || ''
  const label = field.label || field.name
  let desc = `${label}${description ? ' - ' : ''}${description}`

  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'email':
    case 'code':
    case 'date': // Payload dates are usually strings (ISO)
      schema = z.string()
      break

    case 'number':
      schema = z.number()
      break

    case 'checkbox':
      schema = z.boolean()
      break

    case 'select':
    case 'radio':
      if (field.options && field.options.length > 0) {
        const values = field.options.map((o) => (typeof o === 'string' ? o : o.value))
        if (values.every((v) => typeof v === 'string')) {
          schema = z.enum(values as [string, ...string[]])
        } else {
          // Cast to tuple for z.union
          schema = z.union(
            values.map((v) => z.literal(v as any)) as unknown as [
              z.ZodTypeAny,
              z.ZodTypeAny,
              ...z.ZodTypeAny[],
            ],
          )
        }
      } else {
        schema = z.string()
      }
      break

    case 'relationship':
    case 'upload': {
      const hasMany = 'hasMany' in field ? field.hasMany : false
      const relationTo = 'relationTo' in field ? field.relationTo : null

      if (Array.isArray(relationTo)) {
        // Polymorphic: { relationTo: 'collection', value: 'id' }
        const polymorphicSchema = z.object({
          relationTo: z.enum(relationTo as [string, ...string[]]).describe('关联集合的 slug'),
          value: z.string().describe('关联数据的 ID'),
        })

        if (hasMany) {
          schema = z.array(polymorphicSchema)
        } else {
          schema = polymorphicSchema
        }
      } else {
        // Single: ID string
        if (hasMany) {
          schema = z.array(z.string().describe('关联数据的 ID'))
          desc = `${label}(${relationTo})关联数据的 ID 数组${description ? ' - ' : ''}${description}`
        } else {
          schema = z.string()
          desc = `${label}(${relationTo})关联数据的 ID${description ? ' - ' : ''}${description}`
        }
      }
      break
    }

    case 'array':
      if ('fields' in field && field.fields) {
        schema = z.array(z.object(buildZodShape(field.fields)))
      } else {
        schema = z.array(z.any())
      }
      break

    case 'blocks':
      schema = z.array(z.record(z.string(), z.unknown()))
      break

    case 'json':
    case 'richText':
      schema = z.any()
      break
  }

  // Add description if available (string only)
  if (desc) {
    if (typeof desc === 'string') {
      schema = schema.describe(desc)
    }
  }

  // Handle required
  if ('required' in field && field.required === true) {
    return schema
  }

  return schema.optional()
}

export function collection2Zod(collection: CollectionConfig) {
  return z.object(buildZodShape(collection.fields))
}
