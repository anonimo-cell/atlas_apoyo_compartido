-- Ejecutar una vez en Supabase -> SQL Editor.
-- Unifica los nombres de categoría que eran distintos en Parkinson y Visual.
-- Se puede repetir sin problema: la segunda vez no cambia nada.
begin;

-- Copia de seguridad de las categorías actuales (no accesible desde la web)
create table if not exists public.copia_categorias_productos as
  select id, categoria1, categoria2 from public.catalogo_productos;
alter table public.copia_categorias_productos enable row level security;

update public.catalogo_productos set categoria1 = 'Movilidad'
where categoria1 = 'Movilidad y orientación';

update public.catalogo_productos set categoria2 = 'Lectura'
where categoria1 = 'Comunicación' and categoria2 = 'Leer';

update public.catalogo_productos set categoria2 = 'Ordenador y tableta'
where categoria1 = 'Comunicación' and categoria2 = 'Digital';

update public.catalogo_productos set categoria2 = 'Deportes'
where categoria1 = 'Ocio' and categoria2 = 'Deporte';

update public.catalogo_productos set categoria2 = 'Aprendizaje'
where categoria1 = 'Ocio' and categoria2 = 'Estudio';

-- "Radio con botones marcados" está en "Escuchar", que no existe en Visual
update public.catalogo_productos set discapacidad = discapacidad - 'visual'
where id = 66 and categoria2 = 'Escuchar';

commit;

-- Para deshacerlo:
-- update public.catalogo_productos p
-- set categoria1 = c.categoria1, categoria2 = c.categoria2
-- from public.copia_categorias_productos c where c.id = p.id;
-- update public.catalogo_productos set discapacidad = '["parkinson", "visual"]'::jsonb where id = 66;
