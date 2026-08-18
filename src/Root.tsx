import "./index.css";
import { Composition } from "remotion";
import { HistoriaDeLosBarcos } from "./video/HistoriaDeLosBarcos";
import { TOTAL_FRAMES } from "./video/scenes";
import { FPS, HEIGHT, WIDTH } from "./video/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HistoriaDeLosBarcos"
      component={HistoriaDeLosBarcos}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
