import { Field } from 'payload'

export function derivedAttributes(): Field[] {
  return [
    {
      name: 'attributeTokenLimit',
      type: 'number',
      label: '自由分配属性上限',
    },
    {
      name: 'derivedAttributes',
      type: 'array',
      label: '衍生属性',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: '名称',
          required: true,
        },
        // Formula field skipped for first version as requested
      ],
    },
  ]
}
