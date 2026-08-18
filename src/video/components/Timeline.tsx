import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, CROSSFADE, fonts } from "../theme";
import { scenes, starts, TOTAL_FRAMES } from "../scenes";

/**
 * Barra de progreso con una marca por capítulo, más el rótulo del capítulo
 * actual. Vive fuera de las escenas, así que usa el fotograma absoluto.
 */
export const Timeline: React.FC = () => {
  const frame = useCurrentFrame();

  // Aparece cuando termina la portada y se retira en el cierre.
  const appear = interpolate(
    frame,
    [starts[1] - CROSSFADE, starts[1] + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const leave = interpolate(
    frame,
    [starts[scenes.length - 1] - 20, starts[scenes.length - 1] + 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const index = starts.filter((start) => frame >= start).length - 1;
  const current = scenes[Math.max(0, index)];
  const progress = frame / TOTAL_FRAMES;

  return (
    <AbsoluteFill
      style={{
        opacity: appear * leave,
        justifyContent: "flex-end",
        padding: "0 130px 74px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          fontFamily: fonts.ui,
          fontSize: 20,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: colors.muted,
          marginBottom: 18,
        }}
      >
        <span>{current.chapter}</span>
        <span style={{ color: colors.accent }}>
          {String(Math.max(1, index + 1)).padStart(2, "0")} /{" "}
          {String(scenes.length).padStart(2, "0")}
        </span>
      </div>

      <div
        style={{
          position: "relative",
          height: 2,
          backgroundColor: colors.rule,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${progress * 100}%`,
            backgroundColor: colors.accent,
          }}
        />
        {starts.slice(1).map((start, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(start / TOTAL_FRAMES) * 100}%`,
              top: -3,
              width: 1,
              height: 8,
              backgroundColor: colors.rule,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
