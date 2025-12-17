import React from 'react'
import Link from 'next/link'
import { ArrowRight, Layout, Zap, Mail, Share2 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
            <span className="text-xl font-bold tracking-tight">Morpho</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-blue-600 transition-colors">Docs</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign in</Link>
            <Link href="/login" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: Dynamic API Parameters
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Create Dynamic Posters <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">at Scale</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            Design beautiful canvases, bind data dynamically, and generate personalized images via API. Perfect for marketing automation, event tickets, and social sharing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
              Start Building Free <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#demo" className="w-full sm:w-auto px-8 py-3.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
              View Demo
            </a>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative rounded-2xl border border-gray-200 shadow-2xl overflow-hidden bg-gray-50 aspect-[16/9]">
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-center">
               <Layout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
               <p className="text-gray-400 font-medium">Interactive Canvas Preview</p>
             </div>
           </div>
           {/* Decorative elements */}
           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to automate design</h2>
            <p className="text-lg text-gray-500">From visual editing to high-performance rendering API.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Layout className="w-6 h-6 text-blue-600" />}
              title="Visual Canvas Editor"
              description="Drag and drop components to create pixel-perfect templates. No coding required for design."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-indigo-600" />}
              title="Dynamic Parameters"
              description="Turn any property into a variable. Bind text, images, and colors to API data."
            />
            <FeatureCard 
              icon={<Share2 className="w-6 h-6 text-purple-600" />}
              title="Instant Generation API"
              description="Call our API with JSON data and get a rendered image in milliseconds."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}
