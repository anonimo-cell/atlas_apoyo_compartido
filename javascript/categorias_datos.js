// =========================================================================
// CATEGORÍAS DE TODAS LAS WEBS DE ATLAS
// Es el único sitio donde se añaden, quitan o renombran categorías.
//
// - Sin "webs": categoría COMÚN, sale en todas las webs.
// - Con "webs": solo sale en esas webs.
// - "Otros" se añade solo al final, en la lista principal y en cada categoría.
//
// El nombre es lo que se guarda en la base de datos: si se cambia aquí, hay
// que cambiarlo también en los productos ya subidos.
// =========================================================================

// Webs que ya tienen definidas sus categorías. Las que no están aquí todavía
// no limitan qué discapacidades se pueden marcar al subir un producto.
const WEBS_CON_CATEGORIAS = ['parkinson', 'visual'];

const CATEGORIAS_ATLAS = [
    {
        id: 'autonomia', nombre: 'Autonomía y cuidado', icono: 'auto/auto.png',
        sub: [
            { nombre: 'Higiene', icono: 'auto/higiene/higiene.png' },
            { nombre: 'Comer y beber', icono: 'auto/alimentacion/comer.png' },
            { nombre: 'Vestirse', icono: 'auto/vestirse/ropa.png' },
            { nombre: 'Medicación', icono: 'auto/medi/medicamento.png' },
        ]
    },
    {
        id: 'movilidad', nombre: 'Movilidad', icono: 'movilidad/mover.png',
        sub: [
            { nombre: 'Bloqueos', icono: 'movilidad/bloqueo.png', webs: ['parkinson'] },
            { nombre: 'Paseos', icono: 'movilidad/paseo.png', webs: ['parkinson'] },
            { nombre: 'Bastones y accesorios', icono: 'movilidad/baston.png', webs: ['visual'] },
            { nombre: 'Moverse por casa', icono: 'hogar/casa.png', webs: ['visual'] },
            { nombre: 'Orientarse en la calle', icono: 'movilidad/paseo.png', webs: ['visual'] },
            { nombre: 'Transporte', icono: 'movilidad/coche.png' },
            { nombre: 'Andadores', icono: 'movilidad/andador.png', webs: ['parkinson'] },
            { nombre: 'Silla de ruedas', icono: 'movilidad/silla.png', webs: ['parkinson'] },
            { nombre: 'Incorporarse', icono: 'movilidad/levantar.png', webs: ['parkinson'] },
            { nombre: 'Ejercicio', icono: 'movilidad/ejercicio.png', webs: ['parkinson'] },
        ]
    },
    {
        id: 'comunica', nombre: 'Comunicación', icono: 'comunica/comunicación.png',
        sub: [
            { nombre: 'Braille', icono: 'comunica/braille.png', webs: ['visual'] },
            { nombre: 'Teléfonos', icono: 'comunica/teléfono.png' },
            { nombre: 'Ordenador y tableta', icono: 'comunica/ordenador.png' },
            { nombre: 'Escribir', icono: 'comunica/escribir.png', webs: ['parkinson'] },
            { nombre: 'Lectura', icono: 'comunica/leer.png' },
            { nombre: 'Comunicación no verbal', icono: 'comunica/no_verbal.png', webs: ['parkinson'] },
            { nombre: 'Medios de comunicación', icono: 'comunica/medios.png' },
            { nombre: 'Escuchar', icono: 'comunica/escribir.png', webs: ['parkinson'] },
        ]
    },
    {
        id: 'productividad', nombre: 'Tareas cotidianas', icono: 'tareas/tareas.png',
        sub: [
            { nombre: 'Cocinar', icono: 'tareas/cocinar.png' },
            { nombre: 'Hacer la cama', icono: 'tareas/cama.png' },
            { nombre: 'Fregar', icono: 'tareas/fregar.png', webs: ['parkinson'] },
            { nombre: 'Limpiar la casa', icono: 'tareas/fregar.png' },
            { nombre: 'Cuidar la ropa', icono: 'tareas/planchar.png' },
            { nombre: 'Orden', icono: 'tareas/ordenar.png', webs: ['parkinson'] },
            { nombre: 'Identificar y etiquetar', icono: 'auto/alimentacion/latas.png', webs: ['visual'] },
            { nombre: 'Gestiones', icono: 'tareas/firmar.png' },
            { nombre: 'Hora y agenda', icono: 'hogar/orga/calendario.png', webs: ['visual'] },
        ]
    },
    {
        id: 'ocio', nombre: 'Ocio', icono: 'ocio/ocio.png',
        sub: [
            { nombre: 'Juegos', icono: 'ocio/juegos.png' },
            { nombre: 'Deportes', icono: 'ocio/deporte.png' },
            { nombre: 'Escritura', icono: 'ocio/escribir.png' },
            { nombre: 'Aprendizaje', icono: 'ocio/aprender.png' },
            { nombre: 'Manualidades', icono: 'ocio/manualidades.png' },
        ]
    },
];
