-- Ejecutar en Supabase -> SQL Editor.
-- Arregla el error 'duplicate key value violates unique constraint "verproductos_pkey"'
-- al publicar un producto.
--
-- Por qué pasa: los productos se cargaron con su número (id) ya puesto, así que
-- el contador que numera los productos nuevos se quedó atrás y daba números ya
-- usados. Esto lo pone justo después del id más alto que existe.
-- Se puede repetir sin problema (por ejemplo, después de importar más productos).

select setval(
  pg_get_serial_sequence('public.catalogo_productos', 'id'),
  (select coalesce(max(id), 0) + 1 from public.catalogo_productos),
  false
) as siguiente_id;
