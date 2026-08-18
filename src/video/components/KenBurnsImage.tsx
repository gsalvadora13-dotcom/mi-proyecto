import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { Focus } from "../scenes";

type Props = {
  src: string;
  from: Focus;
  to: Focus;
  durationInFrames: number;
  grayscale?: boolean;
};

/**
 * Deriva lentamente sobre una foto fija (zoom + paneo) para darle movimiento.
 * El recorrido es lineal a propósito: cualquier easing se nota como un tirón
 * a lo largo de seis segundos.
 */
export const KenBurnsImage: React.FC<Props> = ({
  src,
  from,
  to,
  durationInFrames,
  grayscale,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = from.scale + (to.scale - from.scale) * progress;
  const x = from.x + (to.x - from.x) * progress;
  const y = from.y + (to.y - from.y) * progress;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${x}%, ${y}%)`,
          filter: grayscale ? "grayscale(1) contrast(1.08)" : undefined,
        }}
      />
    </AbsoluteFill>
  );
};
