import React from 'react'
import Link from 'next/link'
import { Plus, MoreVertical, Edit, Trash, Copy } from 'lucide-react'

const projects = [
  { id: 1, name: 'Summer Sale Poster', thumbnail: 'bg-blue-100', updated: '2 hours ago' },
  { id: 2, name: 'Tech Conf Badge', thumbnail: 'bg-purple-100', updated: '5 hours ago' },
  { id: 3, name: 'Welcome Email Header', thumbnail: 'bg-green-100', updated: '1 day ago' },
  { id: 4, name: 'Social Media Kit', thumbnail: 'bg-orange-100', updated: '2 days ago' },
  { id: 5, name: 'Newsletter Template', thumbnail: 'bg-pink-100', updated: '3 days ago' },
  { id: 6, name: 'Invoice PDF', thumbnail: 'bg-gray-100', updated: '1 week ago' },
]

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Manage your dynamic canvases and templates.</p>
        </div>
        <Link
          href="/canvas"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            {/* Thumbnail */}
            <div className={`h-48 ${project.thumbnail} relative flex items-center justify-center`}>
              <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/5 backdrop-blur-[1px] transition-opacity flex items-center justify-center gap-2">
                <Link
                  href="/canvas"
                  className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-700"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-700">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <span className="text-gray-400 font-medium opacity-50 select-none">Preview</span>
            </div>

            {/* Info */}
            <div className="p-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  <Link href="/canvas">{project.name}</Link>
                </h3>
                <p className="text-xs text-gray-500">Edited {project.updated}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
