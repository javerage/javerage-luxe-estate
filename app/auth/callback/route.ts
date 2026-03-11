import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && user) {
      // Smart manual fallback
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'User';
      const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

      // 1. Check if profile exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single()

      if (!profile) {
        // Create if it doesn't exist
        await supabase.from('profiles').insert({
          id: user.id,
          full_name: fullName,
          avatar_url: avatarUrl,
          role: 'Cliente'
        })
      } else {
        // Only update if current fields are missing
        const updates: any = {}
        if (!profile.full_name) updates.full_name = fullName
        if (!profile.avatar_url) updates.avatar_url = avatarUrl
        
        if (Object.keys(updates).length > 0) {
          await supabase.from('profiles').update(updates).eq('id', user.id)
        }
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      const redirectUrl = isLocalEnv 
        ? `${origin}${next}` 
        : (forwardedHost ? `https://${forwardedHost}${next}` : `${origin}${next}`);
        
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
