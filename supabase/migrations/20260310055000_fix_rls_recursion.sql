-- 1. Creamos una función para verificar el rol sin causar recursión
-- 'security definer' permite que la función ignore RLS
create or replace function public.is_admin()
returns boolean as $$
begin
  return (
    select (role = 'Administrador')
    from public.profiles
    where id = auth.uid()
  );
end;
$$ language plpgsql security definer set search_path = '';

-- 2. Limpiamos las políticas antiguas que causan el bucle
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Administrators can manage all profiles." on public.profiles;
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;

-- 3. Creamos las nuevas políticas usando la función segura
-- Política para ver perfiles (Todos pueden ver, pero la función is_admin no activa RLS)
create policy "Profiles visibility"
  on public.profiles for select
  using ( true );

-- Política para que el sistema y el usuario puedan insertar el perfil inicial
create policy "Profile insertion"
  on public.profiles for insert
  with check ( auth.uid() = id );

-- Política para que los admins gestionen TODO y los usuarios su propio perfil
create policy "Profile management"
  on public.profiles for all
  using (
    auth.uid() = id or public.is_admin()
  );

-- 4. ASEGURAMOS QUE TUS CUENTAS SEAN ADMINS (Solución definitiva a nivel de datos)
update public.profiles 
set role = 'Administrador' 
where id in (
  select id from auth.users 
  where email in ('joel.chuc@gmail.com', 'vanyariapp@gmail.com')
);
