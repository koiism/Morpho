import { betterAuthPluginOptions } from '@/lib/auth/options'
import { betterAuthPlugin } from 'payload-auth/better-auth/plugin'

export const authPlugin = [betterAuthPlugin(betterAuthPluginOptions)]
