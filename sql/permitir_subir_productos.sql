-- Ejecutar una vez en Supabase -> SQL Editor.
-- Permite que TODAS las cuentas con sesión iniciada suban productos al
-- catálogo (tabla común de todas las webs de Atlas).
-- Las visitas sin sesión siguen pudiendo ver productos, pero no subirlos.
-- Se puede repetir sin problema.

-- 1. Permiso sobre la tabla
grant insert on public.catalogo_productos to authenticated;

-- 2. Permiso para generar el número (id) de cada producto nuevo
do $$
declare
  secuencia text := pg_get_serial_sequence('public.catalogo_productos', 'id');
begin
  if secuencia is not null then
    execute format('grant usage on sequence %s to authenticated', secuencia);
  end if;
end $$;

-- 3. Regla de seguridad (RLS): cualquier cuenta registrada puede añadir productos
drop policy if exists "las personas registradas suben productos" on public.catalogo_productos;
create policy "las personas registradas suben productos"
  on public.catalogo_productos
  for insert
  to authenticated
  with check (true);

-- Para comprobarlo: debe salir una fila con cmd = INSERT
-- select cmd, roles, policyname from pg_policies where tablename = 'catalogo_productos';
