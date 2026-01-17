import deepMerge from '../../lib/deepMerge'
import type { Field } from 'payload'

interface CommonFieldsOptions {
  name?: Partial<Field>
  description?: Partial<Field>
  cover?: Partial<Field>
}

export function commonFields({
  name = {},
  description = {},
  cover = {},
}: CommonFieldsOptions = {}): Field[] {
  const nameField: Field = deepMerge(
    {
      name: 'name',
      type: 'text',
      label: '名称',
      required: true,
    },
    name,
  )

  const descriptionField: Field = deepMerge(
    {
      name: 'description',
      type: 'textarea',
      label: '描述',
    },
    description,
  )

  const coverField: Field = deepMerge(
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: '封面',
    },
    cover,
  )

  return [nameField, descriptionField, coverField]
}
