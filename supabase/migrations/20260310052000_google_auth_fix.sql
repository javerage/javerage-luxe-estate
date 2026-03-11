-- 1. Aseguramos que la función sea ultra-robusta
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  _full_name text;
  _avatar_url text;
begin
  -- Extraer metadatos con prioridad en campos comunes de Google y GitHub
  _full_name := coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'preferred_username',
    new.email
  );
  
  _avatar_url := coalesce(
    new.raw_user_meta_data ->> 'avatar_url',
    new.raw_user_meta_data ->> 'picture',
    new.raw_user_meta_data ->> 'avatar'
  );

  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, _full_name, _avatar_url, 'Cliente')
  on conflict (id) do update
  set
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url,
    updated_at = now();

  return new;
exception when others then
  -- Log error or just return new to not block auth
  return new;
end;
$$;

-- 2. Aseguramos que la tabla profiles permita la inserción inicial incluso si RLS es estricto
-- Permitir inserción anónima temporal solo para el ID propio si el trigger falla
drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

-- 3. Sincronizar usuarios de Google que ya existen pero no tienen perfil
insert into public.profiles (id, full_name, avatar_url, role)
select 
  id, 
  coalesce(raw_user_meta_data ->> 'full_name', raw_user_meta_data ->> 'name', email),
  coalesce(raw_user_meta_data ->> 'avatar_url', raw_user_meta_data ->> 'picture'),
  'Cliente'
from auth.users
on conflict (id) do nothing;
