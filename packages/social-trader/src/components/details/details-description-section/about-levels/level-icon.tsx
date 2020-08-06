import clsx from "clsx";
import { LevelInfo } from "gv-api-web";
import * as React from "react";

import styles from "./about-level-icon.module.scss";

interface Props {
  levelInfo: LevelInfo;
  current?: boolean;
}

const LevelIcon: React.FC<Props> = React.memo(({ levelInfo, current }) => (
  <div
    className={clsx(
      styles["about-levels-icon"],
      styles[`about-levels-icon--${levelInfo.level}`],
      {
        [styles["about-levels-icon--current"]]: current
      }
    )}
  >
    {levelInfo.level}
  </div>
));

export default LevelIcon;
