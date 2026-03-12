import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import AdminNavbar from '@/components/AdminNavbar'
import AdminPropertyFilters from '@/components/AdminPropertyFilters'
import Pagination from '@/components/Pagination'
import { Property } from '@/lib/types'
import Link from 'next/link'
import VisibilityToggle from '@/components/VisibilityToggle'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 10

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminPropertiesPage(props: PageProps) {
  const resolvedSearchParams = await props.searchParams
  const supabase = await createClient()

  // 1. Auth & Role Check
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'Administrador') redirect('/')

  // 2. Extract Filters & Pagination
  const page = parseInt((resolvedSearchParams.page as string) || '1')
  const searchQuery = (resolvedSearchParams.q as string) || ''
  const location = (resolvedSearchParams.location as string) || ''
  const minPrice = parseInt((resolvedSearchParams.minPrice as string) || '0')
  const maxPrice = parseInt((resolvedSearchParams.maxPrice as string) || '5000000')
  const propertyType = (resolvedSearchParams.propertyType as string) || 'Any Type'
  const beds = parseInt((resolvedSearchParams.beds as string) || '0')
  const baths = parseInt((resolvedSearchParams.baths as string) || '0')
  const amenities = (resolvedSearchParams.amenities as string)?.split(',').filter(Boolean) || []
  const filterStatus = (resolvedSearchParams.status as string) || ''

  // 3. Build Query
  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })

  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`)
  }
  if (filterStatus) {
    query = query.eq('status', filterStatus)
  }
  if (location) query = query.ilike('location', `%${location}%`)
  if (minPrice > 0) query = query.gte('price', minPrice)
  if (maxPrice < 5000000) query = query.lte('price', maxPrice)
  if (propertyType !== 'Any Type') query = query.eq('category', propertyType)
  if (beds > 0) query = query.gte('beds', beds)
  if (baths > 0) query = query.gte('baths', baths)
  if (amenities.length > 0) query = query.contains('amenities', amenities)

  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data: properties, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to)

  // 4. Fetch Stats
  const { count: totalListings } = await supabase.from('properties').select('*', { count: 'exact', head: true })
  const { count: activeProperties } = await supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'Active')
  const { count: pendingProperties } = await supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'Pending')

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 0

  return (
    <div className="bg-[#EEF6F6] text-[#19322F] font-display min-h-screen flex flex-col antialiased">
      <AdminNavbar user={user} activeTab="listings" />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#19322F] tracking-tight">My Properties</h1>
            <p className="text-[#19322F]/60 mt-1">Manage your portfolio and track performance.</p>
          </div>
          <AdminPropertyFilters />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-[#006655]/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Listings</p>
              <p className="text-2xl font-bold text-[#19322F] mt-1">{totalListings || 0}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#006655]/10 flex items-center justify-center text-[#006655]">
              <span className="material-icons">apartment</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#006655]/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Properties</p>
              <p className="text-2xl font-bold text-[#19322F] mt-1">{activeProperties || 0}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#D9ECC8] flex items-center justify-center text-[#006655]">
              <span className="material-icons">check_circle</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#006655]/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Sale</p>
              <p className="text-2xl font-bold text-[#19322F] mt-1">{pendingProperties || 0}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <span className="material-icons">pending</span>
            </div>
          </div>
        </div>

        {/* Property List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-6">Property Details</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {properties?.map((property: Property) => (
              <div 
                key={property.id} 
                className={cn(
                  "group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-[#EEF6F6]/50 transition-colors items-center",
                  property.status === 'Archived' && "bg-gray-50/50 opacity-75"
                )}
              >
                <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                  <div className="relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {property.status === 'Archived' && (
                      <div className="absolute inset-0 bg-nordic/40 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="text-[10px] font-bold text-white uppercase tracking-tighter border border-white/40 px-1.5 py-0.5 rounded">Archived</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Link href={`/property/${property.slug}`} className="text-lg font-bold text-[#19322F] group-hover:text-[#006655] transition-colors cursor-pointer">
                      {property.title}
                    </Link>
                    <p className="text-sm text-gray-500 truncate max-w-[250px]">{property.location}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><span className="material-icons text-[14px]">bed</span> {property.beds} Beds</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="flex items-center gap-1"><span className="material-icons text-[14px]">bathtub</span> {property.baths} Baths</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>{property.area} sqm</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-6 md:col-span-2">
                  <div className="text-base font-semibold text-[#19322F]">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(property.price)}
                  </div>
                  {property.period && <div className="text-xs text-gray-400">Monthly: ${property.price.toLocaleString()}</div>}
                </div>

                <div className="col-span-6 md:col-span-2">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
                    property.status === 'Active' ? "bg-[#D9ECC8] text-[#006655] border-[#006655]/10" :
                    property.status === 'Pending' ? "bg-orange-100 text-orange-700 border-orange-200" :
                    property.status === 'Sold' ? "bg-blue-100 text-blue-700 border-blue-200" :
                    "bg-gray-200 text-gray-600 border-gray-300"
                  )}>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full mr-1.5",
                      property.status === 'Active' ? "bg-[#006655]" :
                      property.status === 'Pending' ? "bg-orange-500" :
                      property.status === 'Sold' ? "bg-blue-500" :
                      "bg-gray-500"
                    )}></span>
                    {property.status}
                  </span>
                </div>

                <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-4">
                  <VisibilityToggle 
                    propertyId={property.id} 
                    initialStatus={property.status} 
                    title={property.title} 
                  />
                  <div className="flex items-center gap-1">
                    <Link 
                      href={`/admin/properties/${property.id}/edit`}
                      className="p-2 rounded-lg text-gray-400 hover:text-[#006655] hover:bg-[#D9ECC8]/30 transition-all"
                    >
                      <span className="material-icons text-xl">edit</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {(!properties || properties.length === 0) && (
              <div className="py-20 text-center">
                <p className="text-gray-500 italic">No properties found matching your criteria.</p>
              </div>
            )}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalResults={count || 0}
            pageSize={PAGE_SIZE}
          />
        </div>
      </main>

      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">© 2026 Luxe Estate Property Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
