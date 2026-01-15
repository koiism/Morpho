import type { CollectionConfig } from 'payload'

export const MainAttributes: CollectionConfig = {
  slug: 'main-attributes',
  labels: {
    plural: '主属性',
    singular: '主属性',
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
