-- Improve the function to handle metadata from different providers and set search_path
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      new.raw_user_meta_data ->> 'preferred_username',
      'User ' || substr(new.id::text, 1, 8)
    ),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture'
    ),
    'Cliente'
  )
  on conflict (id) do update
  set
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url;
  return new;
end;
$$;

-- Ensure all existing users have a profile (backfill)
-- This logic will run when the migration is applied
do $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  select 
    id, 
    coalesce(
      raw_user_meta_data ->> 'full_name',
      raw_user_meta_data ->> 'name',
      raw_user_meta_data ->> 'preferred_username',
      'User ' || substr(id::text, 1, 8)
    ),
    coalesce(
      raw_user_meta_data ->> 'avatar_url',
      raw_user_meta_data ->> 'picture'
    ),
    'Cliente'
  from auth.users
  on conflict (id) do nothing;
end $$;
