import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import type { Scene } from "../scenes";
import { Reveal } from "./Reveal";

/** Reparte las palabras de un titular para que entren escalonadas. */
const Words: React.FC<{
  text: string;
  delay: number;
  style: React.CSSProperties;
}> = ({ text, delay, style }) => (
  <div style={style}>
    {text.split(" ").map((word, i) => (
      <Reveal
        key={`${word}-${i}`}
        delay={delay + i * 2.5}
        distance={38}
        inline
        style={{ marginRight: "0.26em" }}
      >
        {word}
      </Reveal>
    ))}
  </div>
);

const Rule: React.FC<{ delay: number; width: number }> = ({ delay, width }) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [delay, delay + 26], [0, width], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: grow,
        height: 2,
        backgroundColor: colors.accent,
        margin: "26px 0",
      }}
    />
  );
};

const kickerStyle: React.CSSProperties = {
  fontFamily: fonts.ui,
  fontSize: 24,
  fontWeight: 600,
  letterSpacing: "0.26em",
  textTransform: "uppercase",
  color: colors.accent,
};

const bodyStyle: React.CSSProperties = {
  fontFamily: fonts.ui,
  fontSize: 30,
  lineHeight: 1.6,
  color: colors.muted,
  maxWidth: 760,
};

export const Caption: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();

  // El texto se retira antes que la imagen para que el fundido encadenado no
  // superponga dos bloques de texto ilegibles.
  const exit = interpolate(
    frame,
    [scene.durationInFrames - 30, scene.durationInFrames - 8],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const centered = scene.align === "center";

  return (
    <AbsoluteFill
      style={{
        opacity: exit,
        padding: centered ? "0 220px" : "0 130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: centered ? "center" : "flex-end",
        alignItems:
          scene.align === "right"
            ? "flex-end"
            : centered
              ? "center"
              : "flex-start",
        paddingBottom: centered ? 0 : 200,
        textAlign: scene.align,
      }}
    >
      {scene.variant === "title" ? (
        <>
          <Reveal delay={12} style={kickerStyle}>
            {scene.kicker}
          </Reveal>
          <Words
            text={scene.title}
            delay={24}
            style={{
              fontFamily: fonts.display,
              fontSize: 124,
              lineHeight: 1.04,
              color: colors.paper,
              marginTop: 26,
            }}
          />
          <Rule delay={54} width={200} />
          <Reveal delay={62} style={{ ...bodyStyle, fontSize: 34 }}>
            {scene.body}
          </Reveal>
        </>
      ) : scene.variant === "end" ? (
        <>
          <Words
            text={scene.kicker}
            delay={14}
            style={{
              fontFamily: fonts.display,
              fontSize: 132,
              lineHeight: 1,
              color: colors.accent,
            }}
          />
          <Words
            text={scene.title}
            delay={34}
            style={{
              fontFamily: fonts.display,
              fontSize: 58,
              lineHeight: 1.2,
              color: colors.paper,
              marginTop: 14,
              maxWidth: 1120,
            }}
          />
          <Rule delay={70} width={160} />
          <Reveal delay={78} style={{ ...bodyStyle, maxWidth: 880 }}>
            {scene.body}
          </Reveal>
        </>
      ) : (
        <>
          <Reveal delay={10} style={kickerStyle}>
            {scene.kicker}
          </Reveal>
          <Words
            text={scene.title}
            delay={20}
            style={{
              fontFamily: fonts.display,
              fontSize: 82,
              lineHeight: 1.1,
              color: colors.paper,
              marginTop: 20,
              maxWidth: 900,
            }}
          />
          <Rule delay={46} width={120} />
          <Reveal delay={54} style={bodyStyle}>
            {scene.body}
          </Reveal>
        </>
      )}
    </AbsoluteFill>
  );
};
