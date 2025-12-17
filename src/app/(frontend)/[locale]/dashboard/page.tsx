import React from 'react'
import { Folder, Zap, Database, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          title="Total Projects" 
          value="12" 
          change="+2 this week" 
          icon={<Folder className="w-6 h-6 text-blue-600" />} 
        />
        <StatCard 
          title="API Calls" 
          value="8,542" 
          change="+12% from last month" 
          icon={<Zap className="w-6 h-6 text-amber-500" />} 
        />
        <StatCard 
          title="Storage Used" 
          value="1.2 GB" 
          change="5% of 25GB quota" 
          icon={<Database className="w-6 h-6 text-purple-600" />} 
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Projects</h2>
          <Link href="/dashboard/projects" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { name: 'Summer Sale Poster', updated: '2 hours ago', status: 'Active' },
            { name: 'Tech Conf Badge', updated: '5 hours ago', status: 'Draft' },
            { name: 'Welcome Email Header', updated: '1 day ago', status: 'Active' },
            { name: 'Social Media Kit', updated: '2 days ago', status: 'Archived' },
          ].map((project, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Folder className="w-5 h-5 text-gray-400" />
                 </div>
                 <div>
                   <p className="font-medium text-gray-900">{project.name}</p>
                   <p className="text-sm text-gray-500">Updated {project.updated}</p>
                 </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                project.status === 'Active' ? 'bg-green-100 text-green-700' :
                project.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                'bg-yellow-50 text-yellow-700'
              }`}>
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 font-medium">{title}</span>
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
      <p className="text-sm text-gray-400 mt-2">{change}</p>
    </div>
  )
}
