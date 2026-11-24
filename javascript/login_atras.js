// =========================================================================
// SISTEMA DEFINITIVO DEL BOTÓN DE CABECERA (LOGIN / LOGOUT) Y SESIÓN TEMPORAL
// =========================================================================

let vistaIntencion = null;

// Pantallas que solo se pueden usar con la sesión iniciada. Si se cierra la
// sesión estando en una de ellas, se vuelve a la pantalla principal.
const VISTAS_CON_SESION = ['vista-prod-baj', 'vista-prod-com', 'vista-publicado'];

// =========================================================================
// MOSTRAR / OCULTAR CONTRASEÑA INDEPENDIENTE
// =========================================================================
function toggleMostrarPassword(inputId, btnId) {
    const inputPass = document.getElementById(inputId);
    const btnPass = document.getElementById(btnId);

    if (inputPass && inputPass.type === "password") {
        inputPass.type = "text";
        if (btnPass) btnPass.innerHTML = 'Ocultar<span class="sr-only"> contraseña</span>';
    } else if (inputPass) {
        inputPass.type = "password";
        if (btnPass) btnPass.innerHTML = 'Mostrar<span class="sr-only"> contraseña</span>';
    }
}

// 1. Qué pasa cuando haces clic en el botón de la cabecera
async function gestionarClickLogin(boton) {
    const estadoSesion = localStorage.getItem('sesionIniciada');

    if (estadoSesion === '1') {
        abrirModal('modal-confirmar-cierre-sesion');
    } else {
        // Inicio de sesión desde la cabecera: no hay formulario pendiente que abrir después
        if (typeof subidaPendienteTrasLogin !== 'undefined') subidaPendienteTrasLogin = null;
        abrirModal('modal-login');
    }
}

async function confirmarCierreSesion() {
    const boton = document.getElementById('btn-confirmar-cierre-sesion');
    const mensajeError = document.getElementById('mensaje-error-cierre-sesion');

    if (!window.supabase || !window.supabase.auth) {
        console.error('No está disponible la conexión de autenticación para cerrar sesión.');
        mensajeError.textContent = 'No se pudo conectar para cerrar sesión. Inténtalo de nuevo más tarde.';
        mensajeError.style.display = 'block';
        return;
    }

    mensajeError.style.display = 'none';
    boton.disabled = true;
    try {
        const { error } = await window.supabase.auth.signOut();
        if (error) throw error;

        localStorage.removeItem('sesionIniciada');
        localStorage.removeItem('nombreUsuario');
        cerrarModal('modal-confirmar-cierre-sesion');

        const vistaActual = typeof obtenerVistaVisible === 'function' ? obtenerVistaVisible() : null;
        if (vistaActual && VISTAS_CON_SESION.includes(vistaActual.id)) {
            window.location.reload();
            return;
        }

        pintarBotonLogin();
        document.querySelectorAll('[id^="detalle-ver-valoracion"]').forEach(contenedor => {
            contenedor.dataset.votoUsuario = '';
            contenedor.querySelectorAll('.btn-valoracion-independiente').forEach(btn => {
                btn.classList.remove('active-filtro');
                btn.setAttribute('aria-pressed', 'false');
            });
        });
        anunciar('Has cerrado la sesión');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        mensajeError.textContent = 'No se pudo cerrar la sesión. Inténtalo de nuevo.';
        mensajeError.style.display = 'block';
        anunciar('No se pudo cerrar la sesión. Inténtalo de nuevo.');
    } finally {
        boton.disabled = false;
    }
}
// =========================================================================
// MENÚ DEL TELÉFONO (botón ☰ arriba a la izquierda)
// Reúne lo que en el ordenador está en la cabecera y en los botones
// laterales: sesión, registro, accesibilidad, información, contacto y
// agradecimientos.
// =========================================================================
function abrirMenuMovil() {
    pintarBotonLogin();
    abrirModal('menu-movil');
}

function opcionMenuMovil(opcion) {
    cerrarModal('menu-movil');

    if (opcion === 'sesion') {
        gestionarClickLogin(document.getElementById('mi-boton-login'));
    } else if (opcion === 'registro') {
        abrirRegistroInicio();
    } else {
        abrirModal(opcion);
    }
}

// Pulsar fuera del panel (en la zona oscurecida) también lo cierra
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu-movil');
    if (!menu) return;
    menu.addEventListener('click', (evento) => {
        if (evento.target === menu) menu.close();
    });
});

// 2. Pintar el botón según el estado
function pintarBotonLogin() {
    const boton = document.getElementById('mi-boton-login');
    const botonMovil = document.getElementById('menu-movil-sesion');
    const textoMovil = document.getElementById('menu-movil-sesion-texto');
    const sesionIniciada = localStorage.getItem('sesionIniciada') === '1';
    const textoSesion = sesionIniciada ? 'Cerrar sesión' : 'Iniciar sesión';

    if (boton) {
        boton.textContent = textoSesion;
        boton.classList.toggle('btn-sesion-activa', sesionIniciada);
    }
    if (textoMovil) textoMovil.textContent = textoSesion;
    if (botonMovil) {
        botonMovil.classList.toggle('menu-movil-sesion-activa', sesionIniciada);
        botonMovil.setAttribute('aria-label', textoSesion);
    }
}

function actualizarEstadoSesion(session) {
    const user = session && session.user;
    if (user) {
        const nombre = (user.user_metadata && user.user_metadata.nombre) || (user.email || '').split('@')[0];
        localStorage.setItem('sesionIniciada', '1');
        localStorage.setItem('nombreUsuario', nombre);
    } else {
        localStorage.removeItem('sesionIniciada');
        localStorage.removeItem('nombreUsuario');
    }
    pintarBotonLogin();
}

document.addEventListener('DOMContentLoaded', () => {
    pintarBotonLogin();

    if (!window.supabase || !window.supabase.auth) {
        console.error('No se pudo inicializar el cliente de Supabase.');
        return;
    }

    window.supabase.auth.onAuthStateChange((_event, session) => {
        window.setTimeout(() => actualizarEstadoSesion(session), 0);
    });

    window.supabase.auth.getSession()
        .then(({ data, error }) => {
            if (error) throw error;
            actualizarEstadoSesion(data.session);
        })
        .catch(error => {
            console.error('No se pudo comprobar la sesión:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const modalCierreSesion = document.getElementById('modal-confirmar-cierre-sesion');
    const mensajeError = document.getElementById('mensaje-error-cierre-sesion');
    const botonConfirmar = document.getElementById('btn-confirmar-cierre-sesion');

    modalCierreSesion.addEventListener('close', () => {
        mensajeError.style.display = 'none';
        botonConfirmar.disabled = false;
    });
});

// =========================================================================
// SELECCIÓN DE PERFILES
// =========================================================================
let perfilSeleccionadoSolicitud = null;
function seleccionarPerfilFormulario(botonPulsado) {
    const contenedor = botonPulsado.closest('.guia-card');
    if (contenedor) {
        contenedor.querySelectorAll('.btn-rela').forEach(btn => {
            btn.classList.remove('activ-cate', 'campo-error'); // al elegir perfil se quita el rojo de todos
        });
    }
    botonPulsado.classList.add('activ-cate');
    perfilSeleccionadoSolicitud = botonPulsado.getAttribute('data-perfil');
    if (typeof ocultarAvisoSolicitudSiCorrecto === 'function') ocultarAvisoSolicitudSiCorrecto();
}