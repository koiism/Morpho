import type { CollectionConfig } from 'payload'

export const GameSaves: CollectionConfig = {
  slug: 'game-saves',
  labels: {
    plural: '游戏存档',
    singular: '游戏存档',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['script', 'lastInteractionTime', 'isGameOver'],
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          return {
            ...data,
            lastInteractionTime: new Date().toISOString(),
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'lastInteractionTime',
      type: 'date',
      label: '上次交互时间',
      admin: {
        readOnly: true,
        description: '每次更新存档时自动更新',
      },
    },
    {
      name: 'script',
      type: 'relationship',
      relationTo: 'scripts',
      label: '所属剧本',
      required: true,
    },
    {
      name: 'isGameOver',
      type: 'checkbox',
      label: '游戏是否结束',
      defaultValue: false,
    },
    {
      name: 'aiMemoryId',
      type: 'text',
      label: 'AI Memory Id',
    },
    {
      name: 'characterStates',
      type: 'array',
      label: '角色状态',
      admin: {
        description: '适配多人游戏',
      },
      fields: [
        {
          name: 'characterSnapshot',
          type: 'json',
          label: '角色快照',
        },
        {
          name: 'inventory',
          type: 'array',
          label: '携带物品',
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
            },
          ],
        },
      ],
    },
    {
      name: 'scriptSnapshot',
      type: 'json',
      label: '剧本快照',
    },
  ],
}
