import type { CollectionConfig } from 'payload'
import { derivedAttributes } from '../fields/derivedAttributes'
import { creator } from '../fields/creator'

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
      name: 'description',
      type: 'textarea',
      label: '描述',
      admin: {
        description: '对跑团世界的描述，比如这个世界的历史、人文环境等，使用 Markdown 格式',
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
    creator(),
  ],
}
