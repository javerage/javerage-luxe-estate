-- Actualizamos la función para que sea respetuosa con los datos existentes
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  _full_name text;
  _avatar_url text;
begin
  -- Extraer metadatos del proveedor actual
  _full_name := coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'preferred_username',
    new.email
  );
  
  _avatar_url := coalesce(
    new.raw_user_meta_data ->> 'avatar_url',
    new.raw_user_meta_data ->> 'picture'
  );

  -- INSERT con UPDATE condicional
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, _full_name, _avatar_url, 'Cliente')
  on conflict (id) do update
  set
    -- Solo actualiza si el campo actual está vacío (null)
    full_name = coalesce(profiles.full_name, excluded.full_name),
    avatar_url = coalesce(profiles.avatar_url, excluded.avatar_url),
    updated_at = now();

  return new;
end;
$$;
