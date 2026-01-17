import { APP } from '@/app/api/payload/[[...slugs]]/route'
import { getServerSideURL } from '../getURL'
import { treaty } from '@elysiajs/eden/treaty2'
import { CollectionSlug } from 'payload'

export const payloadGet = (slug: CollectionSlug) =>
  treaty<APP>(getServerSideURL()).api.payload({ slugs: slug })
