import clsx from "clsx";
import React from "react";
import { Sizeable } from "utils/types";

import styles from "./text.module.scss";

export type TextColor =
  | "#00ff00"
  | "#ff0000"
  | "white"
  | "red"
  | "green"
  | "yellow";
export type TextWeight = "thin" | "normal" | "bold" | "bolder";

interface Props extends Sizeable {
  preWrap?: boolean;
  sizeValue?: string;
  weight?: TextWeight;
  color?: TextColor;
  muted?: boolean;
  wrap?: boolean;
}

export const Text: React.FC<Props> = ({
  preWrap,
  sizeValue,
  weight = "normal",
  size = "middle",
  color,
  muted,
  wrap = true,
  children
}) => {
  return (
    <span
      style={{ fontSize: sizeValue }}
      className={clsx(styles["text"], {
        [styles["text--pre-wrap"]]: preWrap,
        [styles["text--thin"]]: weight === "thin",
        [styles["text--normal"]]: weight === "normal",
        [styles["text--bold"]]: weight === "bold",
        [styles["text--bolder"]]: weight === "bolder",
        [styles["text--xsmall"]]: size === "xsmall",
        [styles["text--small"]]: size === "small",
        [styles["text--middle"]]: size === "middle",
        [styles["text--large"]]: size === "large",
        [styles["text--xlarge"]]: size === "xlarge",
        [styles["text--white"]]: color === "white",
        [styles["text--red"]]: color === "red" || color === "#ff0000",
        [styles["text--green"]]: color === "green" || color === "#00ff00",
        [styles["text--yellow"]]: color === "yellow",
        [styles["text--wrap"]]: wrap && !preWrap,
        [styles["text--muted"]]: muted
      })}
    >
      {children}
    </span>
  );
};
