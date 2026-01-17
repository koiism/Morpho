import deepMerge from '../../lib/deepMerge'
import type { Field } from 'payload'

export function creator({ override }: { override?: Partial<Field> } = {}): Field {
  const defaultConfig: Field = {
    name: 'creator',
    type: 'relationship',
    relationTo: 'users',
    label: '创建者',
    index: true,
    admin: {
      position: 'sidebar',
      readOnly: true,
    },
    hooks: {
      beforeChange: [
        async ({ req, value }) => {
          if (!value && req.user) {
            return req.user.id
          }
          return value
        },
      ],
    },
  }
  return deepMerge(defaultConfig, override)
}
