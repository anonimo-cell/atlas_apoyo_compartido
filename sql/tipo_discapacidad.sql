-- Ejecutar una vez en Supabase -> SQL Editor.
-- Permite guardar varias opciones de discapacidad por producto como JSONB.

alter table public.catalogo_productos
  add column if not exists discapacidad jsonb;

alter table public.catalogo_productos
  alter column discapacidad set default '["parkinson"]'::jsonb;

update public.catalogo_productos
set discapacidad = '["parkinson"]'::jsonb
where discapacidad is null;

update public.catalogo_productos
set discapacidad = (
  select jsonb_agg(lower(valor))
  from jsonb_array_elements_text(coalesce(discapacidad, '[]'::jsonb)) as valor
)
where jsonb_typeof(discapacidad) = 'array';
