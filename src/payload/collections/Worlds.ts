import type { CollectionConfig } from 'payload'
import { derivedAttributes } from '@/payload/fields/derivedAttributes'

export const Worlds: CollectionConfig = {
  slug: 'worlds',
  labels: {
    plural: '世界',
    singular: '世界',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '名称',
      required: true,
    },
    {
      name: 'rules',
      type: 'textarea',
      label: '法则',
      admin: {
        description: '世界的运行法则',
      },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: '封面',
    },
    {
      name: 'statusAttributes',
      type: 'relationship',
      relationTo: 'status-attributes',
      hasMany: true,
      label: '状态',
      admin: {
        description: '状态 Relationship 数组，比如 HP、MP 等',
      },
    },
    {
      name: 'mainAttributes',
      type: 'relationship',
      relationTo: 'main-attributes',
      hasMany: true,
      label: '主属性',
      admin: {
        description: '五维到八维，主属性 Relationship 数组',
      },
    },
    ...derivedAttributes(),
  ],
}
