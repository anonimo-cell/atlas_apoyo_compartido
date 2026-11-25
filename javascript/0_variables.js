// ==========================================
// CONFIGURACIÓN GLOBAL Y MEMORIA
// ==========================================
let categoriaSeleccionada = null;
let opcionSubirSeleccionada = null;

// ==========================================
// FUNCIONES DE UTILIDAD (HELPERS)
// ==========================================

// Oculta todas las vistas (.subvista-contenido)
function ocultarTodasLasVistas() {
    document.querySelectorAll('.subvista-contenido').forEach(vista => vista.style.display = 'none');
}

// Devuelve la vista que se está mostrando ahora mismo (o undefined si no hay ninguna)
function obtenerVistaVisible() {
    return Array.from(document.querySelectorAll('.subvista-contenido'))
        .find(vista => vista.style.display === 'flex' || vista.style.display === 'block');
}

// Oculta todas las vistas y muestra solo la indicada
function mostrarVista(idVista) {
    ocultarTodasLasVistas();
    const vista = document.getElementById(idVista);
    if (vista) vista.style.display = 'flex';
    return vista;
}

function reiniciarCategorias() {
    categoriaSeleccionada = null;
    document.querySelectorAll('.cap-btn').forEach(btn => btn.classList.remove('activ-cate'));
}

// ==========================================
// PRECIO EN EUROS (productos comercializados)
// ==========================================
// "25", "25,50", "25.5 €" -> 25.5. Si no es un número válido (>= 0), null.
function leerPrecioEuros(texto) {
    const limpio = String(texto ?? '').replace(/[€\s]/g, '').replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(limpio)) return null;
    const euros = Number(limpio);
    return Number.isFinite(euros) ? euros : null;
}

// 25.5 -> "25,5 €" (sin separador de miles, para poder leerlo de nuevo)
function formatearPrecioEuros(euros) {
    return `${euros.toLocaleString('es-ES', { maximumFractionDigits: 2, useGrouping: false })} €`;
}
