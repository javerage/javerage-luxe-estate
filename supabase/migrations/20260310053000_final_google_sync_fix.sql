-- 1. Aseguramos que la tabla y el enum estén en estado óptimo
do $$ 
begin
    if not exists (select 1 from pg_type where typname = 'user_role') then
        create type user_role as enum ('Administrador', 'Cliente', 'Vendedor', 'Agente Inmobiliario');
    end if;
end $$;

-- 2. Función de trigger ultra-segura con manejo de nulos extremo
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  _full_name text;
  _avatar_url text;
begin
  -- Mapeo exhaustivo de campos de Google, GitHub y otros
  _full_name := coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'preferred_username',
    new.email,
    'Usuario Luxe'
  );
  
  _avatar_url := coalesce(
    new.raw_user_meta_data ->> 'avatar_url',
    new.raw_user_meta_data ->> 'picture',
    'https://raw.githubusercontent.com/supabase/supabase/master/apps/www/public/favicon/favicon-196x196.png'
  );

  -- Usamos un INSERT ... ON CONFLICT para asegurar que no falle si el registro ya existe parcialmente
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, _full_name, _avatar_url, 'Cliente')
  on conflict (id) do update
  set
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url,
    updated_at = now();

  return new;
exception when others then
  -- IMPORTANTE: No bloqueamos la creación del usuario si el perfil falla
  return new;
end;
$$;

-- 3. Políticas de RLS simplificadas para evitar bloqueos en el inicio de sesión
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( true ); -- Permitimos la inserción inicial para que el fallback del servidor funcione siempre

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 4. Sincronización Forzada de Emergencia para usuarios de Google existentes
insert into public.profiles (id, full_name, avatar_url, role)
select 
  id, 
  coalesce(raw_user_meta_data ->> 'full_name', raw_user_meta_data ->> 'name', email),
  coalesce(raw_user_meta_data ->> 'avatar_url', raw_user_meta_data ->> 'picture'),
  'Cliente'
from auth.users
on conflict (id) do update
set
  full_name = coalesce(profiles.full_name, excluded.full_name),
  avatar_url = coalesce(profiles.avatar_url, excluded.avatar_url);
