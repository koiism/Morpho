import type { Field } from 'payload'

export const acts = (): Field => {
  return {
    name: 'acts',
    type: 'array',
    label: '幕次',
    fields: [
      {
        name: 'name',
        type: 'text',
        label: '幕次名',
        required: true,
      },
      {
        name: 'background',
        type: 'textarea',
        label: '背景',
      },
    ],
  }
}
