'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import FilterModal from './FilterModal'
import { cn } from '@/lib/utils'

export default function AdminPropertyFilters() {
  const t = useTranslations('Admin.properties')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const currentStatus = searchParams.get('status') || 'all'

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set('q', searchQuery)
    } else {
      params.delete('q')
    }
    params.delete('page')
    router.push(`/admin/properties?${params.toString()}`)
  }

  const setStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (status !== 'all') {
      params.set('status', status)
    } else {
      params.delete('status')
    }
    params.delete('page')
    router.push(`/admin/properties?${params.toString()}`)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full items-center">
        {/* Quick Status Toggles */}
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm self-start">
          {[
            { id: 'all', label: 'All' },
            { id: 'Active', label: 'Online' },
            { id: 'Archived', label: 'Hidden' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setStatus(s.id)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                currentStatus === s.id 
                  ? "bg-nordic text-white shadow-md" 
                  : "text-gray-400 hover:text-nordic"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 justify-end">
          <form onSubmit={handleSearch} className="relative group w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-[#19322F]/40 group-focus-within:text-[#006655] text-xl">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-white text-[#19322F] shadow-sm placeholder-[#19322F]/30 focus:ring-2 focus:ring-[#006655] focus:bg-white transition-all text-sm"
              placeholder="Search..."
            />
          </form>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="bg-white border border-gray-200 text-[#19322F] hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span className="material-icons text-base">filter_list</span>
              {t('filter')}
            </button>
            <button 
              onClick={() => router.push('/admin/properties/add')}
              className="bg-[#006655] hover:bg-[#005544] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-[#006655]/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span className="material-icons text-base">add</span>
              {t('add_new')}
            </button>
          </div>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </>
  )
}
