import { spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  delay?: number;
  /** Cuánto sube el elemento al aparecer, en píxeles. */
  distance?: number;
  inline?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * Entrada estándar de todo el vídeo: sube y aparece. El muelle va muy
 * amortiguado para que no rebote — es un documental, no una intro.
 */
export const Reveal: React.FC<Props> = ({
  delay = 0,
  distance = 30,
  inline,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.6, stiffness: 90 },
  });

  return (
    <div
      style={{
        display: inline ? "inline-block" : "block",
        opacity: progress,
        transform: `translateY(${(1 - progress) * distance}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
