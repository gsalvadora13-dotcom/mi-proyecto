# La historia de los barcos

Animación de 39 segundos (1920×1080, 30 fps) hecha con [Remotion](https://www.remotion.dev):
seis capítulos que van del astillero de remaches al paquete que llega a un salón.

## Comandos

```console
npm i                 # instalar dependencias
npm run dev           # abrir Remotion Studio (previsualización)
npm run lint          # eslint + tsc
npx remotion render HistoriaDeLosBarcos out/video.mp4
```

## Cómo cambiar las fotos

Las seis escenas leen sus imágenes de `public/`. Ahora mismo esos archivos son
**placeholders** de color: sustitúyelos por las fotos reales manteniendo el
nombre y todo funciona sin tocar código.

| Archivo | Escena |
| --- | --- |
| `01-barco-atardecer.png` | Portada: portacontenedores al atardecer |
| `02-astillero-historico.png` | 1850–1950: astillero en blanco y negro |
| `03-barco-contenedores.png` | 1956: el contenedor (misma foto que la 01, con otro encuadre) |
| `04-astillero-moderno.png` | Hoy: astillero moderno con remolcadores |
| `05-paquete-recibidor.png` | La última milla: caja de cartón en el recibidor |
| `06-salon.png` | Cierre: salón de casa |

Se recomienda 1920×1080 o más: cada escena hace un zoom de hasta el 20 %, así
que una foto pequeña se ve blanda. Si usas `.jpg`, cambia la extensión en
`src/video/scenes.ts`.

Los encuadres (`from` / `to` en `src/video/scenes.ts`) están calculados para la
composición concreta de cada foto: el capítulo 2 abre desde los remachadores
hasta el casco completo, el 3 recorre las pilas de contenedores de popa a proa,
el 4 cierra sobre la proa y los remolcadores. Si cambias una foto por otra con
distinta composición, ajusta esos dos valores.

## Cómo cambiar el guion

Todo el contenido vive en `src/video/scenes.ts`: texto, duración de cada
escena, y el encuadre inicial y final del movimiento de cámara (`from` / `to`).
La duración total del vídeo se calcula sola a partir de esa lista.

```
src/
  Root.tsx                        registra la composición
  video/
    HistoriaDeLosBarcos.tsx       monta las escenas y los fundidos
    scenes.ts                     el guion
    theme.ts                      colores, tipografías, formato
    components/
      KenBurnsImage.tsx           zoom y paneo sobre la foto
      Grade.tsx                   degradados para que se lea el texto
      Caption.tsx                 titulares y cuerpo de texto
      Reveal.tsx                  animación de entrada
      Timeline.tsx                barra de progreso y capítulos
```

## Notas

- No lleva audio. Para añadir música: pon el archivo en `public/` y usa
  `<Audio src={staticFile("...")} />` dentro de `HistoriaDeLosBarcos`.
- Las tipografías son las del sistema (serif + sans). Si quieres una fuente
  concreta, `@remotion/google-fonts` la incrusta en el render.
