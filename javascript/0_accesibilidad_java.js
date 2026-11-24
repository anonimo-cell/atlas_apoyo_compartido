// Tamaño de letra: de 80% a 150%
const TAMANO_MIN = 80;
const TAMANO_MAX = 150;
const CLAVE_TAMANO = 'epunto-tamano-letra';

// Recuperamos el tamaño guardado en la visita anterior (si lo hay)
let tamanoActual = 100;
try {
    const guardado = parseInt(localStorage.getItem(CLAVE_TAMANO), 10);
    if (guardado >= TAMANO_MIN && guardado <= TAMANO_MAX) tamanoActual = guardado;
} catch (e) { /* el navegador no permite leerlo: usamos el 100% */ }
document.documentElement.style.setProperty('--tamano-fuente-base', `${tamanoActual}%`);

// Función auxiliar para aplicar (y guardar) el tamaño de fuente
function cambiarTamanoFuente(nuevoTamano) {
    tamanoActual = nuevoTamano;
    document.documentElement.style.setProperty('--tamano-fuente-base', `${tamanoActual}%`);
    try {
        localStorage.setItem(CLAVE_TAMANO, String(tamanoActual));
    } catch (e) { /* el navegador no permite guardar: no pasa nada */ }
    if (typeof anunciar === 'function') anunciar(`Tamaño de letra: ${tamanoActual}%`);
}

// 1. Aumentar letra (afecta tanto al lateral como al modal)
document.querySelectorAll('#btn-aumentar').forEach(btn => {
    btn.addEventListener('click', () => {
        if (tamanoActual < TAMANO_MAX) {
            cambiarTamanoFuente(tamanoActual + 10);
        } else if (typeof anunciar === 'function') {
            anunciar('Ya está en el tamaño de letra máximo');
        }
    });
});

// 2. Reducir letra (afecta tanto al lateral como al modal)
document.querySelectorAll('#btn-reducir').forEach(btn => {
    btn.addEventListener('click', () => {
        if (tamanoActual > TAMANO_MIN) {
            cambiarTamanoFuente(tamanoActual - 10);
        } else if (typeof anunciar === 'function') {
            anunciar('Ya está en el tamaño de letra mínimo');
        }
    });
});

// =========================================================================
// ACCESIBILIDAD POR TECLADO
// Los elementos con role="button" se activan con Enter o Espacio,
// y los que tienen role="link" (migas de pan) con Enter, como los reales.
// =========================================================================

document.addEventListener("keydown", (event) => {
    const elementoActivo = document.activeElement;
    if (!elementoActivo) return;
    const rol = elementoActivo.getAttribute("role");

    const activaBoton = rol === "button" && (event.key === "Enter" || event.key === " ");
    const activaEnlace = rol === "link" && event.key === "Enter";

    if (activaBoton || activaEnlace) {
        event.preventDefault();
        elementoActivo.click();
    }
});
