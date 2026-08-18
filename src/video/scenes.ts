/**
 * Guion de la animación.
 *
 * Cada escena apunta a un archivo de `public/`. Para cambiar el vídeo basta con
 * tocar este archivo: el resto del proyecto deriva de aquí (duración total,
 * marcas de capítulo y orden de los fundidos).
 */

/** Encuadre de un fotograma del Ken Burns: zoom + desplazamiento en % del ancho. */
export type Focus = {
  scale: number;
  x: number;
  y: number;
};

export type Scene = {
  id: string;
  /** Nombre del archivo dentro de `public/`. */
  image: string;
  durationInFrames: number;
  /** Encuadre inicial y final; se interpola linealmente entre ambos. */
  from: Focus;
  to: Focus;
  grayscale?: boolean;
  kicker: string;
  title: string;
  body?: string;
  align: "left" | "right" | "center";
  variant: "title" | "chapter" | "end";
  /** Rótulo del capítulo en la barra inferior. */
  chapter: string;
};

export const scenes: Scene[] = [
  {
    id: "apertura",
    image: "01-barco-atardecer.png",
    durationInFrames: 165,
    // El barco ocupa el centro; el empuje lento va hacia la proa y baja
    // un poco para que el reflejo del agua entre en cuadro.
    from: { scale: 1.03, x: 0, y: 0 },
    to: { scale: 1.12, x: -1, y: -1 },
    kicker: "Del casco de madera al gigante de acero",
    title: "La historia de los barcos",
    body: "Cómo el mar acabó construyendo el mundo que tienes en casa",
    align: "center",
    variant: "title",
    chapter: "Apertura",
  },
  {
    id: "acero",
    image: "02-astillero-historico.png",
    durationInFrames: 195,
    // Arranca cerrado sobre los remachadores del andamio (centro-derecha)
    // y abre hasta descubrir el casco entero.
    from: { scale: 1.22, x: -3.5, y: 1 },
    to: { scale: 1.06, x: 0.5, y: -0.5 },
    grayscale: true,
    kicker: "1850 — 1950",
    title: "El acero y el remache",
    body: "El hierro y el acero desplazan a la madera. Cuadrillas de remachadores levantan a mano cascos de miles de toneladas, remache a remache, hasta que la soldadura los sustituye a mediados del siglo XX.",
    align: "left",
    variant: "chapter",
    chapter: "El acero y el remache",
  },
  {
    id: "contenedor",
    image: "03-barco-contenedores.png",
    durationInFrames: 195,
    // Paneo de popa a proa recorriendo las pilas de contenedores.
    from: { scale: 1.22, x: 6, y: 1.5 },
    to: { scale: 1.10, x: -2, y: 0 },
    kicker: "26 de abril de 1956",
    title: "La caja que lo cambió todo",
    body: "El Ideal X zarpa de Newark con 58 cajas metálicas a bordo. La idea de Malcom McLean —una medida única, apilable, que pasa del camión al barco sin abrirse— derrumba el coste de mover mercancías.",
    align: "right",
    variant: "chapter",
    chapter: "El contenedor",
  },
  {
    id: "gigantes",
    image: "04-astillero-moderno.png",
    durationInFrames: 195,
    // Desde las gruas del fondo, cierra sobre la proa y los remolcadores.
    from: { scale: 1.05, x: 0.5, y: 1 },
    to: { scale: 1.18, x: -2, y: -2.5 },
    kicker: "Hoy",
    title: "La era del gigante",
    body: "Los astilleros sueldan bloques prefabricados como piezas de un mecano. Los mayores portacontenedores superan los 400 metros de eslora y transportan más de 24.000 contenedores en un solo viaje.",
    align: "left",
    variant: "chapter",
    chapter: "La era del gigante",
  },
  {
    id: "ultima-milla",
    image: "05-paquete-recibidor.png",
    durationInFrames: 180,
    // Empuje suave sobre la caja, que queda a la izquierda del encuadre;
    // por eso el texto se va al lado de la puerta.
    from: { scale: 1.04, x: 1, y: 0 },
    to: { scale: 1.16, x: 3, y: 1 },
    kicker: "La última milla",
    title: "Semanas de mar, un portal",
    body: "Al final de una cadena de puertos, grúas y camiones hay siempre lo mismo: una caja de cartón esperando en un recibidor.",
    align: "right",
    variant: "chapter",
    chapter: "La última milla",
  },
  {
    id: "cierre",
    image: "06-salon.png",
    durationInFrames: 240,
    // Empieza cerrado sobre la mesa (movil y taza) y abre a todo el salon.
    from: { scale: 1.16, x: -2, y: -1.5 },
    to: { scale: 1.03, x: 0, y: 0 },
    kicker: "Más del 80%",
    title: "del comercio mundial viaja por mar",
    body: "El sofá, la televisión, el móvil sobre la mesa. Casi nada de lo que hay en esta habitación llegó hasta aquí sin cruzar antes un océano.",
    align: "center",
    variant: "end",
    chapter: "Cierre",
  },
];

/** Fotograma en el que arranca cada escena. */
export const starts: number[] = scenes.reduce<number[]>((acc, scene, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + scenes[i - 1].durationInFrames);
  return acc;
}, []);

export const TOTAL_FRAMES = scenes.reduce(
  (total, scene) => total + scene.durationInFrames,
  0,
);
