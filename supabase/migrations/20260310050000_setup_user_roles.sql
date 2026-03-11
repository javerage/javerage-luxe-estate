-- Create a custom type for user roles
create type user_role as enum ('Administrador', 'Cliente', 'Vendedor', 'Agente Inmobiliario');

-- Create a profiles table that links to auth.users
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  role user_role default 'Cliente' not null,
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a policy for administrators to manage all profiles
create policy "Administrators can manage all profiles."
  on profiles for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'Administrador'
    )
  );

-- Function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    'Cliente' -- Default role
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
