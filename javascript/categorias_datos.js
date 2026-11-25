// =========================================================================
// CATEGORÍAS DE TODAS LAS WEBS DE ATLAS
// Es el único sitio donde se añaden, quitan o renombran categorías.
//
// - Sin "webs": categoría COMÚN, sale en todas las webs.
// - Con "webs": solo sale en esas webs.
// - Con "excepto": sale en todas menos en esas webs.
// - "Otros" se añade solo al final, en la lista principal y en cada categoría.
//
// El nombre es lo que se guarda en la base de datos: si se cambia aquí, hay
// que cambiarlo también en los productos ya subidos. Para cambiar solo el
// texto que se ve, sin tocar la base de datos, se usa "etiqueta".
// =========================================================================

// Webs que ya tienen definidas sus categorías. Las que no están aquí todavía
// no limitan qué discapacidades se pueden marcar al subir un producto.
const WEBS_CON_CATEGORIAS = ['parkinson', 'visual', 'motriz', 'auditiva', 'cognitiva'];

const CATEGORIAS_ATLAS = [
    {
        id: 'autonomia', nombre: 'Autonomía y cuidado', icono: 'auto/auto.png',
        sub: [
            { nombre: 'Higiene', icono: 'auto/higiene/higiene.png', excepto: ['auditiva'] },
            { nombre: 'Comer y beber', icono: 'auto/alimentacion/comer.png', excepto: ['auditiva'] },
            { nombre: 'Vestirse', icono: 'auto/vestirse/ropa.png', excepto: ['auditiva'] },
            { nombre: 'Medicación', icono: 'auto/medi/medicamento.png', excepto: ['auditiva'] },
        ]
    },
    {
        id: 'movilidad', nombre: 'Movilidad', icono: 'movilidad/mover.png', excepto: ['auditiva'],
        sub: [
            { nombre: 'Bloqueos', icono: 'movilidad/bloqueo.png', webs: ['parkinson', 'auditiva', 'cognitiva'] },
            { nombre: 'Paseos', icono: 'movilidad/paseo.png', webs: ['parkinson', 'motriz', 'auditiva', 'cognitiva'] },
            { nombre: 'Bastones y accesorios', icono: 'movilidad/baston.png', webs: ['visual'] },
            { nombre: 'Moverse por casa', icono: 'hogar/casa.png', webs: ['visual'] },
            { nombre: 'Orientarse en la calle', icono: 'movilidad/paseo.png', webs: ['visual'] },
            { nombre: 'Transporte', icono: 'movilidad/coche.png' },
            { nombre: 'Andadores', icono: 'movilidad/andador.png', webs: ['parkinson', 'motriz', 'auditiva', 'cognitiva'] },
            { nombre: 'Silla de ruedas', icono: 'movilidad/silla.png', webs: ['parkinson', 'motriz', 'auditiva', 'cognitiva'] },
            { nombre: 'Incorporarse', icono: 'movilidad/levantar.png', webs: ['parkinson', 'motriz', 'auditiva', 'cognitiva'] },
            { nombre: 'Ejercicio', icono: 'movilidad/ejercicio.png', webs: ['parkinson', 'motriz', 'auditiva', 'cognitiva'] },
        ]
    },
    {
        id: 'comunica', nombre: 'Comunicación', icono: 'comunica/comunicación.png',
        sub: [
            { nombre: 'Braille', icono: 'comunica/braille.png', webs: ['visual'] },
            { nombre: 'Teléfonos', icono: 'comunica/teléfono.png' },
            { nombre: 'Ordenador y tableta', icono: 'comunica/ordenador.png' },
            { nombre: 'Escribir', icono: 'comunica/escribir.png', webs: ['parkinson', 'motriz', 'cognitiva'] },
            { nombre: 'Lectura', icono: 'comunica/leer.png', excepto: ['motriz', 'auditiva'] },
            { nombre: 'Comunicación no verbal', icono: 'comunica/no_verbal.png', webs: ['parkinson', 'auditiva', 'cognitiva'] },
            { nombre: 'Medios de comunicación', icono: 'comunica/medios.png', excepto: ['motriz'] },
            { nombre: 'Escuchar', icono: 'comunica/escribir.png', webs: ['parkinson', 'auditiva', 'cognitiva'] },
        ]
    },
    {
        id: 'productividad', nombre: 'Tareas cotidianas', icono: 'tareas/tareas.png', excepto: ['auditiva'],
        sub: [
            { nombre: 'Cocinar', icono: 'tareas/cocinar.png' },
            { nombre: 'Hacer la cama', icono: 'tareas/cama.png' },
            { nombre: 'Fregar', icono: 'tareas/fregar.png', webs: ['parkinson', 'motriz', 'auditiva', 'cognitiva'] },
            { nombre: 'Limpiar la casa', icono: 'tareas/fregar.png' },
            { nombre: 'Cuidar la ropa', icono: 'tareas/planchar.png' },
            { nombre: 'Orden', icono: 'tareas/ordenar.png', webs: ['parkinson', 'auditiva', 'cognitiva'] },
            { nombre: 'Identificar y etiquetar', icono: 'auto/alimentacion/latas.png', webs: ['visual'] },
            { nombre: 'Gestiones', icono: 'tareas/firmar.png', excepto: ['motriz'] },
        ]
    },
    {
        id: 'ocio', nombre: 'Ocio', etiqueta: 'Ocio y tiempo libre', icono: 'ocio/ocio.png',
        sub: [
            { nombre: 'Juegos', icono: 'ocio/juegos.png', excepto: ['motriz'] },
            { nombre: 'Deportes', icono: 'ocio/deporte.png' },
            { nombre: 'Escritura', icono: 'ocio/escribir.png' },
            { nombre: 'Aprendizaje', icono: 'ocio/aprender.png', excepto: ['motriz'] },
            { nombre: 'Manualidades', icono: 'ocio/manualidades.png', excepto: ['motriz'] },
        ]
    },
];
