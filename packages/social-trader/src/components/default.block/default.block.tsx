import classNames from "classnames";
import { SIZES } from "constants/constants";
import * as React from "react";

import "./default.block.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: SIZES;
  className?: string;
  wide?: boolean;
  solid?: boolean;
  bordered?: boolean;
  horizontalOffsets?: boolean;
  verticalOffsets?: boolean;
  table?: boolean;
}

export const DefaultBlock: React.FC<Props> = ({
  wide,
  solid,
  bordered,
  horizontalOffsets = true,
  verticalOffsets = true,
  size = SIZES.MIDDLE,
  table,
  children,
  className
}) => (
  <div
    className={classNames("default-block", className, {
      "default-block--wide": wide,
      "default-block--solid": solid,
      "default-block--bordered": bordered,
      "default-block--horizontal-offsets": horizontalOffsets,
      "default-block--vertical-offsets": verticalOffsets,
      "default-block--small": size === SIZES.SMALL,
      "default-block--middle": size === SIZES.MIDDLE,
      "default-block--large": size === SIZES.LARGE,
      "default-block--table": !!table
    })}
  >
    {children}
  </div>
);