// =========================================================================
// DIÁLOGOS DEL CATÁLOGO (filtros y categorías)
// Solo para las webs con productos. Va después de dialogos_comunes.js.
// =========================================================================

// ---------- modal-filtros-catalogo ----------
insertarDialogo('modal-filtros-catalogo', `
  <dialog id="modal-filtros-catalogo" class="modal-accesible modal-filtros-catalogo" aria-labelledby="titulo-filtros-catalogo">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <h2 class="btn-titulo-dialog" id="titulo-filtros-catalogo">Filtrar productos</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>

    <div class="modal-cuerpo">
      <fieldset class="grupo-filtro" data-filtro="precio">
        <legend><img src="${ATLAS_COMPARTIDO}svg/filtro/dona.svg" alt=""> Precio</legend>
        <p class="ayuda-filtro">Bajo: hasta 20 € · Medio: de 20 a 50 € · Alto: más de 50 €</p>
        <div class="opciones-filtro">
          <button type="button" class="chip-filtro" data-valor="Bajo" aria-pressed="false">Bajo</button>
          <button type="button" class="chip-filtro" data-valor="Medio" aria-pressed="false">Medio</button>
          <button type="button" class="chip-filtro" data-valor="Alto" aria-pressed="false">Alto</button>
        </div>
      </fieldset>

      <fieldset class="grupo-filtro solo-bajo-coste" data-filtro="dificultad">
        <legend><img src="${ATLAS_COMPARTIDO}svg/filtro/difi.svg" alt=""> Dificultad de fabricación</legend>
        <p class="ayuda-filtro">Fácil: sin herramientas · Medio: herramientas sencillas · Difícil: herramientas o ayuda</p>
        <div class="opciones-filtro">
          <button type="button" class="chip-filtro" data-valor="Fácil" aria-pressed="false">Fácil</button>
          <button type="button" class="chip-filtro" data-valor="Medio" aria-pressed="false">Medio</button>
          <button type="button" class="chip-filtro" data-valor="Difícil" aria-pressed="false">Difícil</button>
        </div>
      </fieldset>

      <fieldset class="grupo-filtro solo-bajo-coste" data-filtro="tiempo">
        <legend><img src="${ATLAS_COMPARTIDO}svg/filtro/tiempo.svg" alt=""> Tiempo de fabricación</legend>
        <p class="ayuda-filtro">Bajo: menos de 1 hora · Medio: de 1 a 3 horas · Alto: más de 3 horas</p>
        <div class="opciones-filtro">
          <button type="button" class="chip-filtro" data-valor="Bajo" aria-pressed="false">Bajo</button>
          <button type="button" class="chip-filtro" data-valor="Medio" aria-pressed="false">Medio</button>
          <button type="button" class="chip-filtro" data-valor="Alto" aria-pressed="false">Alto</button>
        </div>
      </fieldset>

      <div class="botones-filtros">
        <button type="button" class="btn-filtros-secundario" onclick="quitarFiltrosCatalogo()">Quitar filtros</button>
        <button type="button" class="btn-filtros-principal" id="btn-ver-resultados" onclick="cerrarModal('modal-filtros-catalogo')">Ver productos</button>
      </div>
    </div>
  </dialog>
`);

// ---------- modal-categorias1 ----------
insertarDialogo('modal-categorias1', `
  <dialog id="modal-categorias1" class="modal-cate">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <h2 class="titulo-menu-acce">Elige una categoría</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>

    <div class="grid-capsulas">
      <button type="button" class="btn-cate" data-vista="vista-autonomia" onclick="seleccionarCatenivel1(this)">
        <span class="btn-cate-txt">Autonomía y cuidado</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/auto/auto.png" class="cap-icon-cate" alt="">
      </button>

      <button type="button" class="btn-cate" data-vista="vista-movilidad" onclick="seleccionarCatenivel1(this)">
        <span class="btn-cate-txt">Movilidad</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/movilidad/mover.png" class="cap-icon-cate" alt="">
      </button>

      <button type="button" class="btn-cate" data-vista="vista-comunica" onclick="seleccionarCatenivel1(this)">
        <span class="btn-cate-txt">Comunicación</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/comunica/comunicación.png" class="cap-icon-cate" alt="">
      </button>

      <button type="button" class="btn-cate" data-vista="vista-productividad" onclick="seleccionarCatenivel1(this)">
        <span class="btn-cate-txt">Tareas cotidianas</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/tareas/tareas.png" class="cap-icon-cate" alt="">
      </button>

      <button type="button" class="btn-cate" data-vista="vista-ocio" onclick="seleccionarCatenivel1(this)">
        <span class="btn-cate-txt">Ocio</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/ocio/ocio.png" class="cap-icon-cate" alt="">
      </button>

      <button type="button" class="btn-cate" onclick="abrirCatalogoProductos(this)">
        <span class="btn-cate-txt">Otros</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/otros.svg" class="cap-icon-cate" alt="">
      </button>
    </div>
  </dialog>
`);

// ---------- modal-autonomia ----------
insertarDialogo('modal-autonomia', `
  <dialog id="modal-autonomia" class="modal-cate">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/accesibilidad/acces.svg" class="cap-icon-acce" alt="">
        <h2 class="titulo-menu-acce">Autonomía y cuidado</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="grid-capsulas">
      <button type="button" class="btn-cate" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Higiene</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/auto/higiene/higiene.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Comer y beber</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/auto/alimentacion/comer.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Vestirse</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/auto/vestirse/ropa.png" class="cap-icon-cate" alt="">
      </button>
    </div>
  </dialog>
`);

// ---------- modal-ocio ----------
insertarDialogo('modal-ocio', `
  <dialog id="modal-ocio" class="modal-cate">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/accesibilidad/acces.svg" class="cap-icon-acce" alt="">
        <h2 class="titulo-menu-acce">Ocio</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="grid-capsulas">
      <button type="button" class="btn-cate" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Juegos</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/ocio/juegos.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Deportes</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/ocio/deporte.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Manualidades</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/ocio/manualidades.png" class="cap-icon-cate" alt="">
      </button>
    </div>
  </dialog>
`);

// ---------- modal-movilidad ----------
insertarDialogo('modal-movilidad', `
  <dialog id="modal-movilidad" class="modal-cate">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/accesibilidad/acces.svg" class="cap-icon-acce" alt="">
        <h2 class="titulo-menu-acce">Movilidad</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="grid-capsulas">
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Bloqueos</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/movilidad/bloqueo.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Paseos</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/movilidad/paseo.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Transporte</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/movilidad/coche.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Andadores</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/movilidad/andador.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Silla de ruedas</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/movilidad/silla.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Incorporarse</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/movilidad/levantar.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Ejercicio</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/movilidad/ejercicio.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Otros</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/otros.svg" class="cap-icon-cate" alt="">
      </button>
    </div>
  </dialog>
`);

// ---------- modal-comunica ----------
insertarDialogo('modal-comunica', `
  <dialog id="modal-comunica" class="modal-cate">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/accesibilidad/acces.svg" class="cap-icon-acce" alt="">
        <h2 class="titulo-menu-acce">Comunicación</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="grid-capsulas">
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Teléfonos</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/comunica/teléfono.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Escribir</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/comunica/escribir.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Lectura</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/comunica/leer.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Digital</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/comunica/ordenador.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Comunicación no verbal</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/comunica/no_verbal.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Medios de comunicación</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/comunica/medios.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Escuchar</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/comunica/escribir.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Otros</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/otros.svg" class="cap-icon-cate" alt="">
      </button>
    </div>
  </dialog>
`);

// ---------- modal-productividad ----------
insertarDialogo('modal-productividad', `
  <dialog id="modal-productividad" class="modal-cate">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/accesibilidad/acces.svg" class="cap-icon-acce" alt="">
        <h2 class="titulo-menu-acce">Tareas cotidianas</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="grid-capsulas">
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Cocinar</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/tareas/cocinar.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Hacer la cama</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/tareas/cama.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Fregar</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/tareas/fregar.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Limpiar la casa</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/tareas/fregar.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Cuidar la ropa</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/tareas/planchar.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Orden</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/tareas/ordenar.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Gestiones</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/tareas/firmar.png" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate-4" onclick="seleccionarCategoria2(this)">
        <span class="btn-cate-txt">Otros</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/cate/otros.svg" class="cap-icon-cate" alt="">
      </button>
    </div>
  </dialog>
`);

// ---------- modal-dificultad ----------
insertarDialogo('modal-dificultad', `
  <dialog id="modal-dificultad" class="modal-cate modal-pequeno">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <h2 class="titulo-menu-acce">Dificultad</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="grid-capsulas">
      <button type="button" class="btn-cate" onclick="seleccionarDificultad(this)">
        <span class="txt-filtro">Fácil</span>
        <span class="txt-filtro-ayuda">Sin herramientas</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/filtro/bajo.svg" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate" onclick="seleccionarDificultad(this)">
        <span class="txt-filtro">Medio</span>
        <span class="txt-filtro-ayuda">Con herramientas sencillas</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/filtro/medio.svg" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate" onclick="seleccionarDificultad(this)">
        <span class="txt-filtro">Difícil</span>
        <span class="txt-filtro-ayuda">Con herramientas o ayuda</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/filtro/alto.svg" class="cap-icon-cate" alt="">
      </button>
    </div>
  </dialog>
`);

// ---------- modal-tiempo ----------
insertarDialogo('modal-tiempo', `
  <dialog id="modal-tiempo" class="modal-cate modal-pequeno">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <h2 class="titulo-menu-acce">Tiempo de fabricación</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="grid-capsulas">
      <button type="button" class="btn-cate" onclick="seleccionarTiempo(this)">
        <span class="txt-filtro">Bajo</span>
        <span class="txt-filtro-ayuda">Menos de 1 hora</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/filtro/bajo.svg" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate" onclick="seleccionarTiempo(this)">
        <span class="txt-filtro">Medio</span>
        <span class="txt-filtro-ayuda">De 1 a 3 horas</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/filtro/medio.svg" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate" onclick="seleccionarTiempo(this)">
        <span class="txt-filtro">Alto</span>
        <span class="txt-filtro-ayuda">Más de 3 horas</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/filtro/alto.svg" class="cap-icon-cate" alt="">
      </button>
    </div>
  </dialog>
`);

// ---------- modal-precio ----------
insertarDialogo('modal-precio', `
  <dialog id="modal-precio" class="modal-cate modal-pequeno">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <h2 class="titulo-menu-acce">Precio</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="grid-capsulas">
      <button type="button" class="btn-cate" onclick="seleccionarPrecio(this)">
        <span class="txt-filtro">Bajo</span>
        <span class="txt-filtro-ayuda">Hasta 20 €</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/filtro/bajo.svg" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate" onclick="seleccionarPrecio(this)">
        <span class="txt-filtro">Medio</span>
        <span class="txt-filtro-ayuda">De 20 a 50 €</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/filtro/medio.svg" class="cap-icon-cate" alt="">
      </button>
      <button type="button" class="btn-cate" onclick="seleccionarPrecio(this)">
        <span class="txt-filtro">Alto</span>
        <span class="txt-filtro-ayuda">Más de 50 €</span>
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/filtro/alto.svg" class="cap-icon-cate" alt="">
      </button>
    </div>
  </dialog>
`);
