import type { BetterAuthOptions, BetterAuthPluginOptions } from 'payload-auth/better-auth'
import { emailHarmony, phoneHarmony } from 'better-auth-harmony'
import { admin, phoneNumber, twoFactor, username } from 'better-auth/plugins'
import { passkey } from '@better-auth/passkey'
import type { BetterAuthPlugin as BetterAuthPluginType } from 'better-auth/types'

const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000'

export const betterAuthPlugins = [
  username(),
  emailHarmony(),
  phoneHarmony({
    defaultCountry: 'CN',
  }),
  twoFactor({
    issuer: 'payload-better-auth',
    otpOptions: {
      async sendOTP({ user, otp }) {
        console.log('Send OTP for user: ', user, otp)
      },
    },
  }),
  phoneNumber({
    sendOTP: async ({ phoneNumber, code }, _req) => {
      console.log('Send OTP for user: ', phoneNumber, code)
    },
  }),
  passkey(),
  admin(),
] satisfies BetterAuthPluginType[]

export type BetterAuthPlugins = typeof betterAuthPlugins

export const betterAuthOptions = {
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword(data, _request) {
      console.log(`${baseURL}/api/email/send`)
      await fetch(`${baseURL}/api/email/send`, {
        method: 'POST',
        body: JSON.stringify({
          to: data.user.email,
          subject: 'Reset Password',
          html: `
            <p>Click the link below to reset your password:</p>
            <a href="${data.url}">${data.url}</a>
          `,
        }),
      })
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail(data, _request) {
      console.log(`${baseURL}/api/email/send`)
      await fetch(`${baseURL}/api/email/send`, {
        method: 'POST',
        body: JSON.stringify({
          to: data.user.email,
          subject: 'Verify Email',
          html: `
            <p>Click the link below to verify your email:</p>
            <a href="${data.url}">${data.url}</a>
          `,
        }),
      })
    },
  },
  plugins: betterAuthPlugins,
} satisfies BetterAuthOptions

export type ConstructedBetterAuthOptions = typeof betterAuthOptions

export const betterAuthPluginOptions = {
  disabled: false,
  debug: {
    logTables: false,
    enableDebugLogs: false,
  },
  admin: {
    loginMethods: ['emailPassword'],
  },
  disableDefaultPayloadAuth: true,
  hidePluginCollections: true,
  collectionAdminGroup: '用户管理',
  users: {
    slug: 'users', // not required, this is the default anyways
    collectionOverrides(options) {
      return {
        ...options.collection,
        labels: {
          plural: '用户',
          singular: '用户',
        },
      }
    },
    hidden: false,
    adminRoles: ['admin'],
    defaultRole: 'user',
    defaultAdminRole: 'admin',
    roles: ['user', 'admin', 'player'] as const,
    allowedFields: ['name'],
  },
  accounts: {
    slug: 'accounts',
    collectionOverrides(options) {
      return {
        ...options.collection,
        labels: {
          plural: '账户',
          singular: '账户',
        },
      }
    },
  },
  sessions: {
    slug: 'sessions',
    collectionOverrides(options) {
      return {
        ...options.collection,
        labels: {
          plural: '会话',
          singular: '会话',
        },
      }
    },
  },
  verifications: {
    slug: 'verifications',
    collectionOverrides(options) {
      return {
        ...options.collection,
        labels: {
          plural: '验证',
          singular: '验证',
        },
      }
    },
  },
  adminInvitations: {
    collectionOverrides(options) {
      return {
        ...options.collection,
        labels: {
          plural: '管理员邀请',
          singular: '管理员邀请',
        },
      }
    },
    sendInviteEmail: async ({ payload: _payload, email, url }) => {
      console.log('Send admin invite: ', email, url)
      return {
        success: true,
      }
    },
  },
  betterAuthOptions: betterAuthOptions,
} satisfies BetterAuthPluginOptions

export type ConstructedBetterAuthPluginOptions = typeof betterAuthPluginOptions
