'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { cn } from '@/lib/utils'

const ADMIN_ROLES = ['Administrador', 'Vendedor', 'Agente Inmobiliario'];

export default function UserMenu({ user }: { user: any }) {
  const [profile, setProfile] = useState<{ role: string | null, avatar_url: string | null, full_name: string | null }>({
    role: null,
    avatar_url: null,
    full_name: null
  });
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function getProfile() {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('role, avatar_url, full_name')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile({
            role: data.role,
            avatar_url: data.avatar_url,
            full_name: data.full_name
          });
        }
      }
    }
    getProfile();
  }, [user, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="px-5 py-2.5 bg-[#006655] text-white text-sm font-semibold rounded-lg hover:bg-[#004d40] transition-all shadow-md shadow-[#006655]/10 hover:shadow-lg active:scale-95"
      >
        Sign In
      </Link>
    )
  }

  // Priority: 1. Profiles Table, 2. User Metadata Fallbacks
  const avatarUrl = profile.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture || user?.user_metadata?.image;
  const displayName = profile.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email;
  const isAdmin = profile.role && ADMIN_ROLES.includes(profile.role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-0.5 rounded-full hover:bg-mosque/5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-mosque border border-transparent group">
          <Avatar className="h-9 w-9 border border-nordic/10 shadow-sm transition-transform group-hover:scale-105">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} className="object-cover" />}
            <AvatarFallback className="bg-mosque text-white font-bold text-xs">
              {displayName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl shadow-2xl border-nordic/5 animate-in fade-in zoom-in duration-200">
        <DropdownMenuLabel className="px-3 py-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold text-nordic truncate leading-none">{displayName}</p>
            <p className="text-xs text-nordic/50 truncate font-medium">{user.email}</p>
            {profile.role && (
              <span className="inline-flex w-fit mt-1.5 px-2 py-0.5 rounded-full bg-hint-green/30 text-[10px] font-bold text-mosque uppercase tracking-widest">
                {profile.role}
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-nordic/5" />
        
        <div className="py-1">
          {isAdmin && (
            <DropdownMenuItem 
              onClick={() => router.push('/admin/properties')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-nordic hover:bg-mosque/5 hover:text-mosque transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-mosque/10 flex items-center justify-center text-mosque group-hover:bg-mosque group-hover:text-white transition-colors">
                <span className="material-icons text-[18px]">dashboard</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Admin Panel</span>
                <span className="text-[10px] text-nordic/40">Manage properties & users</span>
              </div>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem 
            onClick={() => router.push('/profile')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-nordic/70 hover:bg-mosque/5 hover:text-mosque transition-colors"
          >
            <span className="material-icons text-[20px] ml-1.5">person_outline</span>
            <span className="text-sm font-medium">Profile Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => router.push('/saved')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-nordic/70 hover:bg-mosque/5 hover:text-mosque transition-colors"
          >
            <span className="material-icons text-[20px] ml-1.5">favorite_border</span>
            <span className="text-sm font-medium">Saved Homes</span>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="bg-nordic/5" />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600 transition-colors"
        >
          <span className="material-icons text-[20px] ml-1.5">logout</span>
          <span className="text-sm font-bold">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
