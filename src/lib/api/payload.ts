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

export const payloadSearch = (slug: CollectionSlug) =>
  treaty<APP>(getServerSideURL()).api.payload.search({ slugs: slug })

export const payloadSearchMy = (slug: CollectionSlug) =>
  treaty<APP>(getServerSideURL()).api.payload.search.my({ slugs: slug })

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
    getSearchList: async (query: FindQuery & { query?: string }) => {
      const { data, error } = await payloadSearch(slug).get({
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
    getMySearchList: async (query: FindQuery & { query?: string }) => {
      const { data, error } = await payloadSearchMy(slug).get({
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
    create: async (body: Partial<Collection<T>>) => {
      const { data, error } = await payloadGet(slug).post(body)
      return {
        data,
        error,
      } as {
        data: Collection<T>
        error: typeof error
      }
    },
    update: async (id: string, body: Partial<Collection<T>>) => {
      const { data, error } = await payloadGet(slug)({ id }).patch(body)
      return {
        data,
        error,
      } as {
        data: Collection<T>
        error: typeof error
      }
    },
    delete: async (id: string) => {
      const { data, error } = await payloadGet(slug)({ id }).delete()
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
  getSearchList: getWorldSearchList,
  getMySearchList: getMyWorldSearchList,
} = getCollectionApi('worlds')

export const {
  getList: getCharacterList,
  getMyList: getMyCharacterList,
  getById: getCharacterById,
} = getCollectionApi('characters')
