import type { Field } from 'payload'

export const characterRelationships = (): Field => {
  return {
    name: 'characterRelationships',
    type: 'array',
    label: '人物关系',
    fields: [
      {
        name: 'from',
        type: 'text',
        label: '源人物姓名',
        required: true,
        admin: {
          description: '请输入 NPC 名称',
        },
      },
      {
        name: 'to',
        type: 'text',
        label: '目标人物姓名',
        required: true,
        admin: {
          description: '请输入 NPC 名称',
        },
      },
      {
        name: 'isBidirectional',
        type: 'checkbox',
        label: '是否双向',
        defaultValue: false,
      },
      {
        name: 'relation',
        type: 'text',
        label: '关系',
        required: true,
        localized: true,
      },
    ],
  }
}
