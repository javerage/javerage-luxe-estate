import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import UserMenu from '@/components/UserMenu'

export const dynamic = 'force-dynamic' // Force dynamic rendering to avoid stale cache

export default async function AdminUsersPage() {
  const supabase = await createClient()

  // 1. Verify Authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    console.log('Admin Access Denied: No session found')
    redirect('/login')
  }

  // 2. Fetch Profile with explicit no-cache
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  console.log('--- Access Debug ---')
  console.log('User ID:', user.id)
  console.log('Email:', user.email)
  console.log('Profile Data:', profile)
  console.log('Profile Error:', profileError)
  console.log('--------------------')

  // 3. Strict Role Check
  if (!profile || profile.role !== 'Administrador') {
    console.log(`Access Denied: User role is ${profile?.role || 'unknown'}`)
    redirect('/')
  }

  // 4. Fetch all users for the directory
  const { data: profiles, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .order('full_name', { ascending: true })

  if (fetchError) {
    console.error('Error fetching profiles:', fetchError)
  }

  return (
    <div className="bg-[#EEF6F6] text-[#19322F] font-display min-h-screen flex flex-col antialiased">
      <nav className="bg-white border-b border-[#19322F]/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006655] text-2xl">apartment</span>
              <span className="font-bold text-lg text-[#19322F] tracking-tight">LuxeEstate</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a className="text-[#19322F]/60 hover:text-[#006655] px-1 py-2 text-sm font-medium transition-colors" href="#">Dashboard</a>
              <a className="text-[#19322F]/60 hover:text-[#006655] px-1 py-2 text-sm font-medium transition-colors" href="#">Listings</a>
              <a className="text-[#006655] border-b-2 border-[#006655] px-1 py-2 text-sm font-medium" href="#">Users</a>
              <a className="text-[#19322F]/60 hover:text-[#006655] px-1 py-2 text-sm font-medium transition-colors" href="#">Inquiries</a>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-[#19322F]/60 hover:text-[#006655] transition-colors">
              <span className="material-symbols-outlined text-xl">search</span>
            </button>
            <button className="text-[#19322F]/60 hover:text-[#006655] transition-colors relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="pl-2 border-l border-[#19322F]/10 ml-2">
              <UserMenu user={user} />
            </div>
          </div>
        </div>
      </nav>

      <header className="w-full pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#19322F]">User Directory</h1>
            <p className="text-[#19322F]/60 mt-1 text-sm">Manage user access and roles for your properties.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-[#19322F]/40 group-focus-within:text-[#006655] text-xl">search</span>
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-white text-[#19322F] shadow-sm placeholder-[#19322F]/30 focus:ring-2 focus:ring-[#006655] focus:bg-white transition-all text-sm" 
                placeholder="Search by name, email..." 
                type="text"
              />
            </div>
            <button className="inline-flex items-center justify-center px-4 py-2.5 border border-[#006655] text-sm font-medium rounded-lg text-[#006655] bg-transparent hover:bg-[#006655]/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006655] transition-colors whitespace-nowrap">
              <span className="material-icons text-lg mr-2">add</span>
              Add User
            </button>
          </div>
        </div>
        <div className="mt-8 flex gap-6 border-b border-[#19322F]/10 overflow-x-auto">
          <button className="pb-3 text-sm font-semibold text-[#006655] border-b-2 border-[#006655]">All Users ({profiles?.length || 0})</button>
          <button className="pb-3 text-sm font-medium text-[#19322F]/60 hover:text-[#19322F] transition-colors">Agents</button>
          <button className="pb-3 text-sm font-medium text-[#19322F]/60 hover:text-[#19322F] transition-colors">Vendedores</button>
          <button className="pb-3 text-sm font-medium text-[#19322F]/60 hover:text-[#19322F] transition-colors">Admins</button>
        </div>
      </header>

      <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12 space-y-4">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#19322F]/50 mb-2">
          <div className="col-span-4">User Details</div>
          <div className="col-span-3">Role & Status</div>
          <div className="col-span-3">Details</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {profiles?.map((profile) => (
          <div 
            key={profile.id}
            className="group relative bg-white rounded-xl p-5 shadow-sm border border-transparent hover:shadow-md flex flex-col md:grid md:grid-cols-12 gap-4 items-center transition-all"
          >
            <div className="col-span-12 md:col-span-4 flex items-center w-full">
              <div className="relative flex-shrink-0">
                {profile.avatar_url ? (
                  <Image 
                    src={profile.avatar_url} 
                    alt={profile.full_name || 'User'} 
                    width={48} 
                    height={48} 
                    className="h-12 w-12 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-[#19322F]/10 flex items-center justify-center border-2 border-white text-[#19322F]/60 font-bold">
                    {profile.full_name?.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
              </div>
              <div className="ml-4 overflow-hidden">
                <div className="text-sm font-bold text-[#19322F] truncate">{profile.full_name || 'Anonymous'}</div>
                <div className="text-xs text-[#19322F]/70 truncate">ID: {profile.id.substring(0, 8)}...</div>
                <div className="mt-1 text-[10px] px-2 py-0.5 inline-block bg-[#EEF6F6] rounded text-[#19322F]/60">Member since {new Date(profile.updated_at).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-3 w-full flex items-center justify-between md:justify-start gap-4">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                profile.role === 'Administrador' ? 'bg-[#19322F] text-white' : 
                profile.role === 'Agente Inmobiliario' ? 'bg-[#006655]/10 text-[#006655]' :
                'bg-gray-100 text-gray-600'
              }`}>
                {profile.role}
              </span>
              <div className="flex items-center text-xs text-[#19322F]/60">
                <span className="material-icons text-[14px] mr-1 text-[#006655]">check_circle</span>
                Active
              </div>
            </div>

            <div className="col-span-12 md:col-span-3 w-full grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#19322F]/50">Properties</div>
                <div className="text-sm font-semibold text-[#19322F]">-</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#19322F]/50">Access</div>
                <div className="text-sm font-semibold text-[#19322F]">Standard</div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-2 w-full flex justify-end relative">
              <button className="inline-flex items-center px-4 py-2 border border-[#19322F]/10 bg-white shadow-sm text-xs font-medium rounded-lg text-[#19322F] hover:bg-[#19322F] hover:text-white focus:outline-none transition-colors w-full md:w-auto justify-center">
                Change Role
                <span className="material-icons text-[16px] ml-2">expand_more</span>
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
