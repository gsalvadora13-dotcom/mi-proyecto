import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Caption } from "./components/Caption";
import { Grade } from "./components/Grade";
import { KenBurnsImage } from "./components/KenBurnsImage";
import { Timeline } from "./components/Timeline";
import { scenes, starts, TOTAL_FRAMES } from "./scenes";
import { colors, CROSSFADE } from "./theme";
import type { Scene } from "./scenes";

/**
 * Una escena se dibuja durante su duración más el fundido, y entra subiendo
 * su opacidad. Como van apiladas en orden, la de arriba se funde sobre la
 * anterior: eso da el encadenado sin necesidad de una capa de transiciones.
 */
const SceneView: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, CROSSFADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <KenBurnsImage
        src={scene.image}
        from={scene.from}
        to={scene.to}
        durationInFrames={scene.durationInFrames + CROSSFADE}
        grayscale={scene.grayscale}
      />
      <Grade align={scene.align} />
      <Caption scene={scene} />
    </AbsoluteFill>
  );
};

/** Fundido a negro final. */
const FadeOut: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [TOTAL_FRAMES - 34, TOTAL_FRAMES - 2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return <AbsoluteFill style={{ backgroundColor: colors.ink, opacity }} />;
};

export const HistoriaDeLosBarcos: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      {scenes.map((scene, i) => (
        <Sequence
          key={scene.id}
          from={starts[i]}
          durationInFrames={scene.durationInFrames + CROSSFADE}
          name={scene.chapter}
          layout="none"
        >
          <SceneView scene={scene} />
        </Sequence>
      ))}

      <Timeline />
      <FadeOut />
    </AbsoluteFill>
  );
};
