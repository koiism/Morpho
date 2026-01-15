import type { CollectionConfig } from 'payload'
import { acts } from '@/payload/fields/acts'
import { actTransitions } from '@/payload/fields/actTransitions'
import { characterRelationships } from '@/payload/fields/characterRelationships'
import { derivedAttributes } from '@/payload/fields/derivedAttributes'
import { npcs } from '@/payload/fields/npcs'

export const Scripts: CollectionConfig = {
  slug: 'scripts',
  labels: {
    plural: '剧本',
    singular: '剧本',
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
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: '封面',
    },
    {
      name: 'world',
      type: 'relationship',
      relationTo: 'worlds',
      label: '所属世界',
    },
    npcs(),
    characterRelationships(),
    acts(),
    actTransitions(),
    {
      name: 'currentAct',
      type: 'text',
      label: '当前幕次',
      admin: {
        description: '标记当前处于哪个幕次',
      },
    },
    {
      name: 'mainObjectives',
      type: 'array',
      label: '主线任务',
      fields: [
        {
          name: 'objective',
          type: 'text',
          label: '任务目标',
          required: true,
        },
      ],
    },
    {
      name: 'failCondition',
      type: 'text',
      label: '失败条件',
    },
    ...derivedAttributes(),
  ],
}
