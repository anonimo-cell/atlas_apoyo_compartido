// =========================================================================
// CATEGORÍAS: se pintan a partir de categorias_datos.js y del config.js de
// cada web. Va después de dialogos_comunes.js y antes del resto de scripts.
// =========================================================================
const CATE_OTROS = { nombre: 'Otros', icono: 'otros.svg' };

const esDeLaWeb = (cate, web) => !cate.webs || cate.webs.includes(web);

// Subcategorías de una categoría en una web, con "Otros" al final
const subcategoriasDe = (cate, web) =>
    [...(cate.sub || []).filter(sub => esDeLaWeb(sub, web)), CATE_OTROS];

const CATEGORIAS_WEB = CATEGORIAS_ATLAS.filter(cate => esDeLaWeb(cate, ATLAS.discapacidad));

// ¿Existe esta categoría (y subcategoría, si ya se ha elegido) en esa web?
function categoriaExisteEnWeb(nombre1, nombre2, web) {
    if (!WEBS_CON_CATEGORIAS.includes(web) || !nombre1 || nombre1 === CATE_OTROS.nombre) return true;

    const cate = CATEGORIAS_ATLAS.find(c => c.nombre === nombre1 && esDeLaWeb(c, web));
    if (!cate) return false;
    return !nombre2 || subcategoriasDe(cate, web).some(sub => sub.nombre === nombre2);
}

// ---------- Botones ----------
function botonCategoria(cate, funcion, total, datos = '') {
    // Con muchas categorías se usan los botones pequeños
    return `
      <button type="button" class="${total > 6 ? 'btn-cate-4' : 'btn-cate'}" ${datos} onclick="${funcion}(this)">
        <span class="btn-cate-txt">${cate.nombre}</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/${cate.icono}" class="cap-icon-cate" alt="">
      </button>`;
}

// ---------- Páginas de "Ver productos" ----------
function pintarPaginasCategorias() {
    // La lista principal usa siempre el botón grande (su CSS depende de él)
    document.getElementById('lista-categorias').innerHTML = [
        ...CATEGORIAS_WEB.map(c => botonCategoria(c, 'seleccionarCategoria1', 0, `data-vista="vista-${c.id}"`)),
        botonCategoria(CATE_OTROS, 'abrirCatalogoProductos', 0, `data-cate1="${CATE_OTROS.nombre}"`)
    ].join('');

    document.getElementById('vista-productos-final').insertAdjacentHTML('beforebegin',
        CATEGORIAS_WEB.map(paginaCategoria).join(''));
}

function paginaCategoria(cate) {
    const subs = subcategoriasDe(cate, ATLAS.discapacidad);
    return `
    <div id="vista-${cate.id}" class="subvista-contenido" style="display: none;">
      <div class="contenedor-dinamico">
        <div class="linea_superior">
          <div class="grid-linea-superior">
            <nav class="migas-pan" aria-label="Ruta de navegación">
              <span class="miga-enlace" onclick="regresarvolver(1)">Ver Productos</span>
              <span class="miga-separador">&rarr;</span>
              <span class="miga-actual">${cate.nombre}</span>
            </nav>
            <button type="button" class="btn-volver" onclick="regresarvolver(1)">
              <span class="cabecera-linea-volver">
                <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/volver/volver.svg" class="icon-btn-volver" alt="">
                <span class="texto-nav-seccion">Volver</span>
              </span>
            </button>
            <div class="cabecera-superior-icono">
              <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/${cate.icono}" class="cap-icon-linea-superior" alt="">
              <div class="text-linea-superior">
                <h1 class="titulo-linea-superior">${cate.nombre}</h1>
              </div>
            </div>
            <div class="caja-contenedor-busqueda" role="search">
              <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/buscar/buscar_input.svg" class="cap-icon-busqueda" alt="">
              <input type="text" class="input-busqueda" placeholder="Buscar producto"
                aria-label="Buscar producto" maxlength="20" onkeydown="ejecutarBusquedaTexto(event, this)" enterkeyhint="search">
              <button type="button" class="btn-lanzar-busqueda" onclick="lanzarBusqueda(this)">Buscar</button>
            </div>
          </div>
        </div>
        <div class="categorias">
          <div class="grid-capsulas">
            ${subs.map(sub => botonCategoria(sub, 'abrirCatalogoProductos', subs.length,
                `data-cate1="${cate.nombre}" data-cate2="${sub.nombre}"`)).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

// ---------- Diálogos para elegir categoría al subir un producto ----------
function dialogoCategorias(id, titulo, botones) {
    insertarDialogo(id, `
  <dialog id="${id}" class="modal-cate" aria-labelledby="titulo-${id}">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <h2 class="titulo-menu-acce" id="titulo-${id}">${titulo}</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="grid-capsulas">${botones}</div>
  </dialog>`);
}

// Rellena y abre el diálogo de subcategorías (hay uno solo para todas)
function abrirSubcategorias(nombre) {
    const cate = CATEGORIAS_WEB.find(c => c.nombre === nombre);
    if (!cate) return;

    const subs = subcategoriasDe(cate, ATLAS.discapacidad);
    document.getElementById('titulo-modal-categorias2').textContent = cate.nombre;
    document.querySelector('#modal-categorias2 .grid-capsulas').innerHTML =
        subs.map(sub => botonCategoria(sub, 'seleccionarCategoria2', subs.length)).join('');
    abrirModal('modal-categorias2');
}

// ---------- Discapacidades que se pueden marcar al subir un producto ----------
const idDiscapacidades = sufijo => sufijo === '-com' ? 'tipo-discapacidad-com' : 'tipo-discapacidad-baj';

// Deja marcada solo la discapacidad de esta web
function marcarDiscapacidadPorDefecto(sufijo) {
    document.querySelectorAll(`#${idDiscapacidades(sufijo)} input[type="checkbox"]`).forEach(input => {
        input.checked = input.value.toLowerCase() === ATLAS.discapacidad;
    });
    actualizarDiscapacidades(sufijo);
}

// Bloquea (y desmarca) las discapacidades cuya web no tiene la categoría elegida
function actualizarDiscapacidades(sufijo) {
    const campo = document.getElementById(idDiscapacidades(sufijo));
    if (!campo) return;

    const elegida = nivel => {
        const boton = document.getElementById(`valor-${nivel}${sufijo}`);
        const texto = boton ? boton.textContent.trim() : '';
        return texto === 'No seleccionada' ? '' : texto;
    };
    const cate1 = elegida('n1');
    const cate2 = elegida('n2');
    const bloqueadas = [];

    campo.querySelectorAll('input[type="checkbox"]').forEach(input => {
        const permitida = categoriaExisteEnWeb(cate1, cate2, input.value.toLowerCase());
        const etiqueta = input.closest('label');
        input.disabled = !permitida;
        etiqueta.style.opacity = permitida ? '' : '0.45';
        etiqueta.style.cursor = permitida ? '' : 'not-allowed';
        if (!permitida) {
            input.checked = false;
            bloqueadas.push(input.value);
        }
    });

    // El aviso va junto a las casillas y lo leen los lectores de pantalla
    let aviso = campo.querySelector('.aviso-discapacidad');
    if (!aviso) {
        aviso = document.createElement('p');
        aviso.className = 'aviso-discapacidad';
        aviso.setAttribute('role', 'status');
        campo.appendChild(aviso);
    }
    aviso.textContent = bloqueadas.length
        ? `No se puede marcar ${bloqueadas.join(', ')}: la categoría «${cate2 || cate1}» no existe en esa web.`
        : '';
}

pintarPaginasCategorias();
dialogoCategorias('modal-categorias1', 'Elige una categoría',
    [...CATEGORIAS_WEB, CATE_OTROS].map(c => botonCategoria(c, 'seleccionarCatenivel1', 0)).join(''));
dialogoCategorias('modal-categorias2', '', '');
