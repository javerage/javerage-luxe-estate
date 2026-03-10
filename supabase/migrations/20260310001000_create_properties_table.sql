create table properties (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  location text not null,
  price numeric not null,
  beds int not null,
  baths numeric not null,
  area numeric not null,
  image text not null,
  tag text,
  type text,
  period text,
  is_featured boolean default false,
  created_at timestamp with time zone default now()
);

-- Add some indexes for search and pagination
create index idx_properties_is_featured on properties (is_featured);
create index idx_properties_created_at on properties (created_at desc);
