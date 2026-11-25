// =========================================================================
// DIÁLOGOS COMUNES A TODAS LAS WEBS DE ATLAS DE APOYO
// Sesión, registro, menú del teléfono, información y accesibilidad.
// Se carga ANTES que el resto de scripts, que ya necesitan los diálogos.
//
// Si una web necesita un diálogo distinto, basta con dejarlo en su index.html
// con el mismo id: entonces no se inserta el compartido.
// =========================================================================

// Carpeta raíz de atlas_apoyo_compartido (para los iconos y logos)
const ATLAS_COMPARTIDO = new URL('../', document.currentScript.src).href;

function insertarDialogo(id, html, contenedor = document.body) {
    if (document.getElementById(id)) return; // la web tiene su propia versión
    contenedor.insertAdjacentHTML('beforeend', html);
}

// ---------- modal-registro-inicio ----------
insertarDialogo('modal-registro-inicio', `
  <dialog id="modal-registro-inicio" class="modal-accesible" aria-labelledby="titulo-registro-inicio">
      <div class="modal-cabecera">
        <div class="btn-cabecera-linea-modal">
          <h2 class="btn-titulo-dialog" id="titulo-registro-inicio">Introduce tus datos</h2>
        </div>
        <button type="button" class="btn-cerrar-modal" aria-label="Cerrar registro" title="Cerrar registro"
          onclick="cerrarModal(this)">×</button>
      </div>
      <div class="modal-cuerpo">
        <form id="form-registro-inicio" novalidate>
          <div class="registro-inicio-grid">
            <div class="form-row">
              <label for="registro-nombre-inicio">Nombre de usuario:<span class="marca-obligatorio" aria-hidden="true">*</span></label>
              <input type="text" id="registro-nombre-inicio" class="input-moderno" placeholder="Nombre de usuario"
                autocomplete="username" minlength="4" maxlength="20" required>
              <p id="error-registro-nombre-inicio" class="mensaje-error-campo" role="alert" hidden></p>
            </div>
            <div class="form-row">
              <label for="registro-email-inicio">Correo electrónico:<span class="marca-obligatorio" aria-hidden="true">*</span></label>
              <input type="email" id="registro-email-inicio" class="input-moderno"
                placeholder="Introducir correo electrónico" autocomplete="email" inputmode="email" required>
              <p id="error-registro-email-inicio" class="mensaje-error-campo" role="alert" hidden></p>
            </div>
            <div class="form-row">
              <label for="registro-password-inicio">Contraseña:<span class="marca-obligatorio" aria-hidden="true">*</span></label>
              <div class="fila-contrasena">
                <input type="password" id="registro-password-inicio" class="input-moderno"
                  placeholder="Introducir contraseña" autocomplete="new-password" required>
                <button type="button" class="btn-mostrar" data-password-toggle="registro-password-inicio">Mostrar<span class="sr-only"> contraseña</span></button>
              </div>
            </div>
            <div class="form-row">
              <label for="registro-password-repite-inicio">Repite la contraseña:<span class="marca-obligatorio" aria-hidden="true">*</span></label>
              <div class="fila-contrasena">
                <input type="password" id="registro-password-repite-inicio" class="input-moderno"
                  placeholder="Repetir contraseña" autocomplete="new-password" required>
                <button type="button" class="btn-mostrar" data-password-toggle="registro-password-repite-inicio">Mostrar<span class="sr-only"> contraseña</span></button>
              </div>
              <p id="error-registro-password-inicio" class="mensaje-error-campo" role="alert" hidden></p>
            </div>
          </div>

          <fieldset class="registro-perfil-inicio">
            <legend>Tipo de usuario:<span class="marca-obligatorio" aria-hidden="true">*</span></legend>
            <div class="registro-perfiles-inicio">
              <button type="button" id="registro-tipo-paciente-inicio" class="btn-rela" data-tipo-usuario="paciente" aria-pressed="false">Paciente</button>
              <button type="button" class="btn-rela" data-tipo-usuario="terapeuta" aria-pressed="false">Terapeuta ocupacional</button>
              <button type="button" class="btn-rela" data-tipo-usuario="familiar" aria-pressed="false">Familiar o cercano</button>
              <button type="button" class="btn-rela" data-tipo-usuario="cuidador" aria-pressed="false">Cuidador</button>
              <button type="button" class="btn-rela" data-tipo-usuario="otro" aria-pressed="false">Otro</button>
            </div>
            <p id="error-registro-tipo-usuario-inicio" class="mensaje-error-campo" role="alert" hidden></p>
          </fieldset>

          <fieldset class="registro-perfil-inicio">
            <legend>Discapacidad (opción múltiple):<span class="marca-obligatorio" aria-hidden="true">*</span></legend>
            <div class="registro-perfiles-inicio">
              <button type="button" id="registro-discapacidad-visual-inicio" class="btn-rela" data-discapacidad="visual" aria-pressed="false">Visual</button>
              <button type="button" class="btn-rela" data-discapacidad="auditiva" aria-pressed="false">Auditiva</button>
              <button type="button" class="btn-rela" data-discapacidad="cognitiva" aria-pressed="false">Cognitiva</button>
              <button type="button" class="btn-rela" data-discapacidad="parkinson" aria-pressed="false">Parkinson</button>
              <button type="button" class="btn-rela" data-discapacidad="otros" aria-pressed="false">Otros</button>
            </div>
            <p id="error-registro-discapacidad-inicio" class="mensaje-error-campo" role="alert" hidden></p>
          </fieldset>

          <div class="form-row">
            <label for="registro-fundacion-inicio">Fundación o asociación (opcional):</label>
            <input type="text" id="registro-fundacion-inicio" class="input-moderno"
              placeholder="Si perteneces a alguna asociación, escríbela por favor" maxlength="30">
          </div>
          <p id="mensaje-error-registro-inicio" class="mensaje-error-campo" role="alert" hidden></p>
          <div class="buscar-espacio">
            <button type="submit" id="btn-crear-cuenta-inicio" class="btn-buscar">Crear cuenta</button>
          </div>
        </form>

        <section id="registro-verificacion-inicio" aria-labelledby="titulo-verificacion-inicio" hidden>
          <h3 id="titulo-verificacion-inicio">Revisa tu correo</h3>
          <p>Te hemos enviado un código a <strong id="email-verificacion-inicio"></strong>. Escríbelo aquí para confirmar tu cuenta.</p>
          <p>Si no lo ves, revisa la carpeta de correo no deseado (spam).</p>
          <div class="form-row">
            <label for="codigo-verificacion-inicio">Código:<span class="marca-obligatorio" aria-hidden="true">*</span></label>
            <input type="text" id="codigo-verificacion-inicio" class="input-moderno"
              placeholder="Introducir código" inputmode="numeric" autocomplete="one-time-code" maxlength="10">
            <p id="error-codigo-verificacion-inicio" class="mensaje-error-campo" role="alert" hidden></p>
            <p id="estado-reenvio-codigo-inicio" class="confirmacion-texto" role="status" hidden></p>
          </div>
          <div class="registro-inicio-acciones">
            <button type="button" id="btn-confirmar-cuenta-inicio" class="btn-buscar">Confirmar cuenta</button>
            <button type="button" id="btn-reenviar-codigo-inicio" class="btn-mostrar">Reenviar código</button>
          </div>
        </section>

        <section id="registro-exito-inicio" aria-labelledby="titulo-exito-registro-inicio" hidden>
          <h3 id="titulo-exito-registro-inicio">Cuenta confirmada</h3>
          <p id="texto-exito-registro-inicio" role="status"></p>
          <div class="buscar-espacio">
            <button type="button" class="btn-buscar" onclick="cerrarModal('modal-registro-inicio')">Volver al inicio</button>
          </div>
        </section>
      </div>
    </dialog>
`, document.getElementById('contenido-principal') || document.body);

// ---------- menu-movil ----------
insertarDialogo('menu-movil', `
  <dialog id="menu-movil" class="menu-movil" aria-labelledby="titulo-menu-movil">
    <div class="menu-movil-cabecera">
      <h2 id="titulo-menu-movil" class="menu-movil-titulo">Menú</h2>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar menú" onclick="cerrarModal(this)">×</button>
    </div>
    <nav aria-label="Menú del teléfono">
      <ul class="menu-movil-lista">
        <li>
          <button type="button" class="menu-movil-opcion" onclick="opcionMenuMovil('modal-acce-mas')">
            <img src="${ATLAS_COMPARTIDO}svg/accesibilidad/silla.svg" alt="" class="menu-movil-icono">
            <span>Menú de accesibilidad</span>
          </button>
        </li>
        <li>
          <button type="button" class="menu-movil-opcion" onclick="opcionMenuMovil('modal-info')">
            <img src="${ATLAS_COMPARTIDO}svg/lat_dech/info.svg" alt="" class="menu-movil-icono">
            <span>Información</span>
          </button>
        </li>
        <li>
          <button type="button" class="menu-movil-opcion" onclick="opcionMenuMovil('modal-contacto')">
            <img src="${ATLAS_COMPARTIDO}svg/lat_dech/gmail.svg" alt="" class="menu-movil-icono">
            <span>Contacto</span>
          </button>
        </li>
        <li>
          <button type="button" class="menu-movil-opcion" onclick="opcionMenuMovil('modal-agradecimientos')">
            <img src="${ATLAS_COMPARTIDO}svg/lat_dech/agradecimientos.svg" alt="" class="menu-movil-icono">
            <span>Agradecimientos</span>
          </button>
        </li>
      </ul>
    </nav>
    <!--Sesión abajo del todo: Registrarse (relleno) e Iniciar sesión (con borde),
        o solo Cerrar sesión (en rojo) si ya hay sesión-->
    <div class="menu-movil-pie">
      <button type="button" id="menu-movil-registro" class="menu-movil-btn-pie menu-movil-btn-registro"
        aria-haspopup="dialog" aria-controls="modal-registro-inicio" onclick="opcionMenuMovil('registro')">
        <img src="${ATLAS_COMPARTIDO}svg/login/registro.svg" alt="" class="menu-movil-icono">
        <span>Registrarse</span>
      </button>
      <button type="button" id="menu-movil-sesion" class="menu-movil-btn-pie menu-movil-btn-sesion"
        aria-haspopup="dialog" aria-controls="modal-login" onclick="opcionMenuMovil('sesion')">
        <img src="${ATLAS_COMPARTIDO}svg/login/avatar.svg" alt="" class="menu-movil-icono">
        <span id="menu-movil-sesion-texto">Iniciar sesión</span>
      </button>
    </div>
  </dialog>
`);

// ---------- modal-login ----------
insertarDialogo('modal-login', `
  <dialog id="modal-login" class="modal-accesible" aria-labelledby="titulo-modal-login">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <h2 class="btn-titulo-dialog" id="titulo-modal-login">Introduce tus datos</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>

    <form id="form-login" class="modal-cuerpo" onsubmit="event.preventDefault(); simularInicioSesionModal()">
      <div class="form-row">
        <label for="login-usuario-modal">Correo electrónico o nombre de usuario:<span
            class="marca-obligatorio" aria-hidden="true">*</span></label>
        <input type="text" id="login-usuario-modal" data-error="mensaje-error-login-modal" class="input-moderno"
          placeholder="Correo o nombre de usuario" aria-required="true" autocomplete="username"
          autocapitalize="none" spellcheck="false" maxlength="100">
      </div>
      <div class="form-row">
        <label for="login-password-modal">Contraseña:<span class="marca-obligatorio" aria-hidden="true">*</span></label>
        <div class="fila-contrasena" id="contrase-inicio">
          <input type="password" id="login-password-modal" data-error="mensaje-error-login-modal"
            class="input-moderno" placeholder="Introducir contraseña" aria-required="true"
            autocomplete="current-password">
          <button type="button" id="btn-toggle-pass-modal" onclick="toggleMostrarPasswordModal()"
            class="btn-mostrar">Mostrar<span class="sr-only"> contraseña</span></button>
        </div>
      </div>
      <p id="mensaje-error-login-modal" class="mensaje-error-campo" role="alert" style="display: none;"></p>
      <button type="button" id="btn-recuperar-contrasena" class="enlace-recuperar-contrasena">¿Se te ha olvidado la contraseña?</button>
      <div class="buscar-espacio">
        <button type="submit" id="btn-login-modal" class="btn-buscar">Iniciar sesión</button>
      </div>
    </form>
  </dialog>
`);

// ---------- modal-recuperar-contrasena ----------
insertarDialogo('modal-recuperar-contrasena', `
  <dialog id="modal-recuperar-contrasena" class="modal-accesible" aria-labelledby="titulo-recuperar-contrasena">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <h2 class="btn-titulo-dialog" id="titulo-recuperar-contrasena">Recuperar contraseña</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana"
        onclick="cerrarModal(this)">×</button>
    </div>
    <form id="form-recuperar-contrasena" class="modal-cuerpo">
      <p>Escribe el correo de tu cuenta. Te enviaremos un código para confirmar tu identidad y después podrás cambiar la contraseña.</p>
      <div class="form-row">
        <label for="recuperar-email">Correo electrónico:</label>
        <input type="email" id="recuperar-email" class="input-moderno" autocomplete="email"
          autocapitalize="none" spellcheck="false" required>
      </div>
      <div id="grupo-codigo-recuperacion" class="form-row" hidden>
        <label for="codigo-recuperacion">Código recibido por correo:</label>
        <input type="text" id="codigo-recuperacion" class="input-moderno" inputmode="numeric"
          autocomplete="one-time-code" pattern="[0-9]{6,10}" maxlength="10">
      </div>
      <p id="mensaje-recuperar-contrasena" class="mensaje-error-campo" role="alert" hidden></p>
      <p id="estado-recuperar-contrasena" role="status" aria-live="polite" hidden></p>
      <div class="buscar-espacio">
        <button type="submit" id="btn-enviar-recuperacion" class="btn-buscar">Enviar código</button>
      </div>
    </form>
  </dialog>
`);

// ---------- modal-nueva-contrasena ----------
insertarDialogo('modal-nueva-contrasena', `
  <dialog id="modal-nueva-contrasena" class="modal-accesible" aria-labelledby="titulo-nueva-contrasena">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <h2 class="btn-titulo-dialog" id="titulo-nueva-contrasena">Elige una contraseña nueva</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana"
        onclick="cerrarModal(this)">×</button>
    </div>
    <form id="form-nueva-contrasena" class="modal-cuerpo">
      <p>El código ha confirmado tu identidad. Escribe y confirma tu nueva contraseña (mínimo 6 caracteres).</p>
      <div class="form-row">
        <label for="nueva-contrasena">Nueva contraseña:</label>
        <input type="password" id="nueva-contrasena" class="input-moderno" autocomplete="new-password"
          minlength="6" required>
      </div>
      <div class="form-row">
        <label for="repite-nueva-contrasena">Repite la nueva contraseña:</label>
        <input type="password" id="repite-nueva-contrasena" class="input-moderno" autocomplete="new-password"
          minlength="6" required>
      </div>
      <p id="mensaje-nueva-contrasena" class="mensaje-error-campo" role="alert" hidden></p>
      <p id="estado-nueva-contrasena" role="status" aria-live="polite" hidden></p>
      <div class="buscar-espacio">
        <button type="submit" id="btn-guardar-nueva-contrasena" class="btn-buscar">Guardar contraseña</button>
      </div>
    </form>
  </dialog>
`);

// ---------- modal-confirmar-cierre-sesion ----------
insertarDialogo('modal-confirmar-cierre-sesion', `
  <dialog id="modal-confirmar-cierre-sesion" class="modal-accesible"
    aria-labelledby="titulo-confirmar-cierre-sesion" aria-describedby="texto-confirmar-cierre-sesion">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <h2 class="btn-titulo-dialog" id="titulo-confirmar-cierre-sesion">Confirmar cierre de sesión</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cancelar y cerrar ventana"
        title="Cancelar y cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="modal-cuerpo">
      <p id="texto-confirmar-cierre-sesion">¿Seguro que quieres cerrar la sesión de tu cuenta?</p>
      <p id="mensaje-error-cierre-sesion" class="mensaje-error-campo" role="alert" style="display: none;"></p>
      <div class="acciones-cierre-sesion">
        <button type="button" id="btn-cancelar-cierre-sesion" class="btn-buscar"
          onclick="cerrarModal('modal-confirmar-cierre-sesion')">No, volver atrás</button>
        <button type="button" id="btn-confirmar-cierre-sesion" class="btn-buscar"
          onclick="confirmarCierreSesion()">Sí, cerrar sesión</button>
      </div>
    </div>
  </dialog>
`);

// ---------- modal-info ----------
insertarDialogo('modal-info', `
  <dialog id="modal-info" class="modal-accesible">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/lat_dech/info.svg" class="cap-icon-modal" alt="">
        <h2 class="btn-titulo-dialog">Información</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="modal-cuerpo">
      <p>Hola, te damos la bienvenida a Atlas de apoyo Parkinson.</p>
      <p>Atlas de apoyo Parkinson es una página web para compartir soluciones útiles para personas con Parkinson.</p>
      <p>Aquí, las personas con Parkinson, sus familias y sus terapeutas pueden buscar y subir productos
        que les han sido útiles. Así ayudan a otras personas que tienen las mismas dificultades.</p>
      <p>En Atlas de apoyo Parkinson vas a encontrar 2 tipos de productos de apoyo:</p>
      <ul class="lista-info">
        <li><strong>Productos comercializados:</strong> se venden en tiendas y cualquiera los puede comprar.</li>
        <li><strong>Productos de bajo coste:</strong> son productos caseros hechos con materiales fáciles de conseguir.
          Cada uno tiene un tutorial con los pasos para que tú también puedas hacerlo.</li>
      </ul>
      <p>¡Muchas gracias!</p>
    </div>
  </dialog>
`);

// ---------- modal-agradecimientos ----------
insertarDialogo('modal-agradecimientos', `
  <dialog id="modal-agradecimientos" class="modal-accesible">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/lat_dech/agradecimientos.svg" class="cap-icon-modal" alt="">
        <h2 class="btn-titulo-dialog">Agradecimientos</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="modal-cuerpo">
      <p>Página web desarrollada por <b>Celia Sáez De La Peña</b></p>
      <p>En colaboración con Fundación Parkinson Madrid, Universidad Politécnica de Madrid y Universidad Rey Juan Carlos</p>
       <p>Los símbolos pictográficos utilizados son propiedad del Gobierno de Aragón y han sido creados por Sergio Palao para ARASAAC (http://www.arasaac.org), que los distribuye bajo Licencia Creative Commons BY-NC-SA.</p>
      <div class="logos-agradecimientos">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}logos/asociacion-parkinson-madrid.png" alt="Asociación Parkinson Madrid">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}logos/upm.png" alt="Universidad Politécnica de Madrid">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}logos/urjc.png" alt="Universidad Rey Juan Carlos">
      </div>
     
    </div>
  </dialog>
`);

// ---------- modal-contacto ----------
insertarDialogo('modal-contacto', `
  <dialog id="modal-contacto" class="modal-accesible">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/lat_dech/gmail.svg" class="cap-icon-modal" alt="">
        <h2 class="btn-titulo-dialog">Contacto</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana" onclick="cerrarModal(this)">×</button>
    </div>
    <div class="modal-cuerpo">
      <p>Escríbenos si tienes dudas o quieres contarnos tus ideas.</p>
      <p>Email: <a class="enlace-email" href="mailto:epuntoweb@gmail.com">epuntoweb@gmail.com</a></p>
    </div>
  </dialog>
`);

// ---------- modal-menu-ayuda ----------
insertarDialogo('modal-menu-ayuda', `
  <dialog id="modal-menu-ayuda" class="modal-accesible">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/lat_dech/ayuda.svg" class="cap-icon-modal" alt="">
        <h2 class="btn-titulo-dialog">Menú de ayuda</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana"
        onclick="cerrarModal(this)">×</button>
    </div>
    <div class="modal-cuerpo" style="display: flex; flex-direction: column; gap: 12px; margin-top: 15px;">

      <!-- Botones adaptados para el modal -->
      <button type="button" class="side-btn-dech" style="max-width: 100%; border-radius: 12px; height: 55px;"
        onclick="cerrarModal(this); abrirModal('modal-info')">
        <span class="cabecera-izq">
          <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/lat_dech/info.svg" class="cap-icon-izq" alt="">
          <span class="btn-titulo-izq" style="font-size: 1rem;">Información</span>
        </span>
      </button>

      <button type="button" class="side-btn-dech" style="max-width: 100%; border-radius: 12px; height: 55px;"
        onclick="cerrarModal(this); abrirModal('modal-contacto')">
        <span class="cabecera-izq">
          <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/lat_dech/gmail.svg" class="cap-icon-izq" alt="">
          <span class="btn-titulo-izq" style="font-size: 1rem;">Contacto</span>
        </span>
      </button>

      <button type="button" class="side-btn-dech" style="max-width: 100%; border-radius: 12px; height: 55px;"
        onclick="cerrarModal(this); abrirModal('modal-agradecimientos')">
        <span class="cabecera-izq">
          <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/lat_dech/agradecimientos.svg" class="cap-icon-izq" alt="">
          <span class="btn-titulo-izq" style="font-size: 1rem;">Agradecimientos</span>
        </span>
      </button>

    </div>
  </dialog>
`);

// ---------- modal-acce-mas ----------
insertarDialogo('modal-acce-mas', `
  <dialog id="modal-acce-mas" class="modal-accesible" aria-labelledby="titulo-acce-mas">
    <div class="modal-cabecera">
      <div class="btn-cabecera-linea-modal">
        <img src="${ATLAS_COMPARTIDO}svg/accesibilidad/acces.svg" class="cap-icon-titulo-acce" alt="">
        <h2 class="btn-titulo-dialog" id="titulo-acce-mas">Menú de accesibilidad</h2>
      </div>
      <button type="button" class="btn-cerrar-modal" aria-label="Cerrar ventana" title="Cerrar ventana"
        onclick="cerrarModal(this)">×</button>
    </div>

    <div class="modal-cuerpo grid-acce-mas">
      <button type="button" class="side-btn-acce" id="btn-aumentar">
        <span class="cabecera-linea-acce">
          <span class="icono-acce-mas" aria-hidden="true" style="font-weight: bold;">A+</span>
          <span class="btn-titulo-acce">Aumentar letra</span>
        </span>
      </button>

      <button type="button" class="side-btn-acce" id="btn-reducir">
        <span class="cabecera-linea-acce">
          <span class="icono-acce-mas" aria-hidden="true" style="font-weight: bold;">A−</span>
          <span class="btn-titulo-acce">Reducir letra</span>
        </span>
      </button>

      <button type="button" class="side-btn-acce" aria-pressed="false" data-acc-opcion="contraste">
        <span class="cabecera-linea-acce">
          <span class="icono-acce-mas" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" stroke-linejoin="round"><!-- Siempre blanco y negro; el reborde blanco exterior lo hace visible también sobre el fondo oscuro de la opción activada --><rect x="0" y="0" width="24" height="24" rx="5" fill="#fff"/><rect x="3" y="3" width="18" height="18" rx="2" fill="#fff" stroke="#000" stroke-width="2"/><path d="M21 3 3 21h16a2 2 0 0 0 2-2z" fill="#000"/></svg></span>
          <span class="btn-titulo-acce">Alto contraste</span>
        </span>
      </button>

      <button type="button" class="side-btn-acce" aria-pressed="false" data-acc-opcion="cursor">
        <span class="cabecera-linea-acce">
          <span class="icono-acce-mas" aria-hidden="true">➤</span>
          <span class="btn-titulo-acce">Cursor grande</span>
        </span>
      </button>

      <button type="button" class="side-btn-acce" aria-pressed="false" data-acc-opcion="enlaces">
        <span class="cabecera-linea-acce">
          <span class="icono-acce-mas" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg></span>
          <span class="btn-titulo-acce">Resaltar enlaces</span>
        </span>
      </button>

      <button type="button" class="side-btn-acce" aria-pressed="false" data-acc-opcion="espaciado">
        <span class="cabecera-linea-acce">
          <span class="icono-acce-mas" aria-hidden="true" style="font-weight: bold;">↕</span>
          <span class="btn-titulo-acce">Más espacio en el texto</span>
        </span>
      </button>

      <button type="button" class="side-btn-acce" data-acc-accion="restablecer-mas">
        <span class="cabecera-linea-acce">
          <img loading="lazy" decoding="async" src="${ATLAS_COMPARTIDO}svg/accesibilidad/resta.svg" class="cap-icon-mini-acce" alt="">
          <span class="btn-titulo-acce">Restablecer</span>
        </span>
      </button>
    </div>
  </dialog>
`);
