import React from 'react'
import { Plus, Copy, Trash2, Shield, AlertCircle } from 'lucide-react'

export default function ApiKeysPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
          <p className="text-gray-500 mt-1">
            Manage API keys for accessing the Morpho Generation API.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Create New Key
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900">Security Note</h3>
          <p className="text-sm text-blue-700 mt-1">
            Your API keys carry full privileges to your account. Do not share them in client-side
            code (browsers, mobile apps).
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Key Token</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Created</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Last Used</th>
                <th className="px-6 py-3 font-semibold text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <ApiKeyRow
                name="Production App"
                token="mph_live_8a92b...91z"
                created="Oct 24, 2024"
                lastUsed="Just now"
              />
              <ApiKeyRow
                name="Development"
                token="mph_test_7c12d...44x"
                created="Nov 12, 2024"
                lastUsed="2 days ago"
              />
              <ApiKeyRow
                name="Staging Server"
                token="mph_test_9b33e...22y"
                created="Dec 01, 2024"
                lastUsed="Never"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ApiKeyRow({
  name,
  token,
  created,
  lastUsed,
}: {
  name: string
  token: string
  created: string
  lastUsed: string
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-100 rounded-md">
            <Shield className="w-4 h-4 text-gray-500" />
          </div>
          <span className="font-medium text-gray-900">{name}</span>
        </div>
      </td>
      <td className="px-6 py-4 font-mono text-gray-500">{token}</td>
      <td className="px-6 py-4 text-gray-500">{created}</td>
      <td className="px-6 py-4 text-gray-500">{lastUsed}</td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Copy Key"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Revoke Key"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
