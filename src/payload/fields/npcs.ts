import type { Field } from 'payload'

export const npcs = (): Field => {
  return {
    name: 'npcs',
    type: 'array',
    label: 'NPCs',
    fields: [
      {
        name: 'name',
        type: 'text',
        label: '名称',
        required: true,
        localized: true,
      },
      {
        name: 'gender',
        type: 'select',
        label: '性别',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
          { label: '其他', value: 'other' },
        ],
      },
      {
        name: 'age',
        type: 'number',
        label: '年龄',
      },
      {
        name: 'avatar',
        type: 'upload',
        relationTo: 'media',
        label: '头像',
        admin: {
          description: '从预设的头像中，根据性别、年龄随机选择头像',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        label: '描述',
        localized: true,
        admin: {
          description: '人设、背景故事',
        },
      },
      {
        name: 'hasMetPlayer',
        type: 'checkbox',
        label: '是否与玩家相遇',
        defaultValue: false,
      },
    ],
  }
}
