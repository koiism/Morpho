import type { CollectionConfig } from 'payload'
import { creator } from '../fields/creator'
import { commonFields } from '../fields/commonFields'

export const Characters: CollectionConfig = {
  slug: 'characters',
  labels: {
    plural: '角色卡',
    singular: '角色卡',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    ...commonFields({
      name: {
        label: '姓名',
      },
      description: {
        admin: {
          description: '人设、背景故事等',
        },
      },
    }),
    {
      name: 'gender',
      type: 'text',
      label: '性别',
      required: true,
    },
    {
      name: 'species',
      type: 'text',
      label: '物种',
      required: true,
    },
    {
      name: 'mainAttributes',
      type: 'array',
      label: '主属性',
      fields: [
        {
          name: 'attribute',
          type: 'relationship',
          relationTo: 'main-attributes',
          label: '属性',
          required: true,
        },
        {
          name: 'value',
          type: 'number',
          label: '属性值',
          required: true,
        },
      ],
    },
    {
      name: 'otherAttributes',
      type: 'array',
      label: '其他属性',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: '属性名称',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: '属性值',
          required: true,
        },
      ],
    },
    {
      name: 'buffs',
      type: 'array',
      label: 'Buff',
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
            description: '效用和代价',
          },
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      label: '技能',
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
            description: '效用和代价',
          },
        },
      ],
    },
    creator(),
  ],
}
