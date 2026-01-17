import type { CollectionConfig } from 'payload'
import { acts } from '../fields/acts'
import { actTransitions } from '../fields/actTransitions'
import { characterRelationships } from '../fields/characterRelationships'
import { derivedAttributes } from '../fields/derivedAttributes'
import { npcs } from '../fields/npcs'
import { creator } from '../fields/creator'
import { commonFields } from '../fields/commonFields'

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
    ...commonFields(),
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
    creator(),
  ],
}
