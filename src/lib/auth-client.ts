import { twoFactorClient } from 'better-auth/plugins'
import { createAuthClient } from 'better-auth/react'
import { getServerSideURL } from './getURL'

export const authClient = createAuthClient({
  baseURL: getServerSideURL(),
  plugins: [twoFactorClient()],
})

export const { signUp, signIn, signOut, useSession, getSession } = authClient
