import { APP } from '@/app/api/payload/[[...slugs]]/route'
import { getServerSideURL } from '../getURL'
import { treaty } from '@elysiajs/eden/treaty2'
import { CollectionSlug } from 'payload'
import { FindQuery } from '@/payload/plugins/zodSchema'
import { PaginatedDocs } from '../payloadClientTypes'
import { Config } from '@/payload-types'

export const payloadGet = (slug: CollectionSlug) =>
  treaty<APP>(getServerSideURL()).api.payload({ slugs: slug })

export const payloadGetMy = (slug: CollectionSlug) =>
  treaty<APP>(getServerSideURL()).api.payload.my({ slugs: slug })

type CollectionKey = keyof Config['collections']
type Collection<T extends CollectionKey> = Config['collections'][T]

export const getCollectionApi = <T extends CollectionKey>(slug: T) => {
  return {
    getList: async (query: FindQuery) => {
      const { data, error } = await payloadGet(slug).get({
        query,
      })
      return {
        data,
        error,
      } as {
        data: PaginatedDocs<Collection<T>>
        error: typeof error
      }
    },
    getMyList: async (query: FindQuery) => {
      const { data, error } = await payloadGetMy(slug).get({
        query,
      })
      return {
        data,
        error,
      } as {
        data: PaginatedDocs<Collection<T>>
        error: typeof error
      }
    },
    getById: async (id: string) => {
      const { data, error } = await payloadGet(slug)({ id }).get()
      return {
        data,
        error,
      } as {
        data: Collection<T>
        error: typeof error
      }
    },
  }
}

export const {
  getList: getWorldList,
  getMyList: getMyWorldList,
  getById: getWorldById,
} = getCollectionApi('worlds')

export const {
  getList: getCharacterList,
  getMyList: getMyCharacterList,
  getById: getCharacterById,
} = getCollectionApi('characters')
