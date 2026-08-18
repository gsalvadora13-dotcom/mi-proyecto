import { AbsoluteFill } from "remotion";
import type { Scene } from "../scenes";

/**
 * Capas de oscurecimiento sobre la foto. Sin ellas el texto blanco se pierde
 * en los cielos claros: la degradación lateral sigue al lado en el que se
 * coloca el texto de cada escena.
 */
export const Grade: React.FC<{ align: Scene["align"] }> = ({ align }) => {
  const side =
    align === "left"
      ? "linear-gradient(to right, rgba(5,7,10,0.8) 0%, rgba(5,7,10,0.35) 42%, rgba(5,7,10,0) 68%)"
      : align === "right"
        ? "linear-gradient(to left, rgba(5,7,10,0.8) 0%, rgba(5,7,10,0.35) 42%, rgba(5,7,10,0) 68%)"
        : "linear-gradient(to top, rgba(5,7,10,0.75) 0%, rgba(5,7,10,0.2) 45%, rgba(5,7,10,0.45) 100%)";

  return (
    <>
      <AbsoluteFill style={{ background: side }} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(5,7,10,0.85) 0%, rgba(5,7,10,0.25) 30%, rgba(5,7,10,0) 60%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(125% 85% at 50% 45%, rgba(5,7,10,0) 38%, rgba(5,7,10,0.6) 100%)",
        }}
      />
    </>
  );
};
