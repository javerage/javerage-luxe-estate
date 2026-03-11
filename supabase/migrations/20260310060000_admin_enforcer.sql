-- 1. Forzamos el rol de Administrador para vanyariapp@gmail.com
update public.profiles 
set role = 'Administrador' 
where id in (
  select id from auth.users 
  where email = 'vanyariapp@gmail.com'
);

-- 2. Aseguramos que joel.chuc@gmail.com sea Cliente para tus pruebas de restricción
update public.profiles 
set role = 'Cliente' 
where id in (
  select id from auth.users 
  where email = 'joel.chuc@gmail.com'
);

-- 3. Verificamos que no existan perfiles sin rol
update public.profiles 
set role = 'Cliente' 
where role is null;
