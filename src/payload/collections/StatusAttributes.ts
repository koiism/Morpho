import type { CollectionConfig } from 'payload'

export const StatusAttributes: CollectionConfig = {
  slug: 'status-attributes',
  labels: {
    plural: '状态',
    singular: '状态',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'emoji',
      type: 'text',
      label: 'Emoji',
      admin: {
        description: 'AI 生成的 Emoji 图标',
      },
    },
    {
      name: 'name',
      type: 'text',
      label: '名称',
      required: true,
      localized: true,
    },
    {
      name: 'guidelines',
      type: 'textarea',
      label: 'Guidelines',
      maxLength: 40,
      admin: {
        description: '40 字以内，用于告诉智能体属性的作用',
      },
    },
  ],
}
