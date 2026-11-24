# atlas_apoyo_compartido

Archivos comunes de `atlas_apoyo` (inicio), `atlas_apoyo_parkinson` y `atlas_apoyo_visual`.

- `0_css/responsivo.css`: estilos de todas las webs.
- `javascript/dialogos_comunes.js`: diálogos de sesión, registro, menú móvil, información y accesibilidad.
- `javascript/dialogos_catalogo.js`: diálogos de filtros y categorías (parkinson y visual).
- `javascript/` (resto): funciones de esos diálogos.
- `svg/` y `logos/`: imágenes que usan los diálogos y el CSS.

Las webs lo cargan con `../atlas_apoyo_compartido/`, así que las carpetas deben estar una al lado de otra.
Para probar en local con Live Server hay que abrir la carpeta que las contiene a todas.

Si una web necesita su propia versión de un diálogo, se deja en su `index.html` con el mismo `id`
y no se inserta el compartido.
