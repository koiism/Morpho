import { searchPlugin as payloadSearchPlugin } from '@payloadcms/plugin-search'

export const searchPlugin = [
  payloadSearchPlugin({
    collections: ['worlds', 'scripts', 'characters', 'game-saves'],
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [
          ...defaultFields,
          {
            name: 'name',
            type: 'text',
            label: '名称',
            admin: {
              readOnly: true,
            },
          },
          {
            name: 'description',
            type: 'textarea',
            label: '描述',
            admin: {
              readOnly: true,
            },
          },
          {
            name: 'cover',
            type: 'upload',
            label: '封面',
            relationTo: 'media',
            admin: {
              readOnly: true,
            },
          },
          {
            name: 'creator',
            type: 'relationship',
            relationTo: 'users',
            label: '创建者',
            admin: {
              position: 'sidebar',
              readOnly: true,
            },
          },
        ]
      },
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'creator', 'cover', 'description'],
      },
    },
    beforeSync: async ({ originalDoc, searchDoc }) => {
      console.log('originalDoc', originalDoc?.creator)
      return {
        ...searchDoc,
        title: originalDoc?.name,
        name: originalDoc?.name,
        description: originalDoc?.description,
        cover: originalDoc?.cover,
        creator: originalDoc?.creator,
      }
    },
  }),
]
