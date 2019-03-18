import "./gv-qr.scss";

import classnames from "classnames";
import { GVColors } from "gv-react-components";
import QRCode from "qrcode.react";
import * as React from "react";

interface IGVqr {
  value: number | string;
  size?: number;
  figureColor?: string;
  backgroundColor?: string;
  className?: string;
}

const GVqr: React.FC<IGVqr> = ({
  value,
  size = 180,
  figureColor = GVColors.$backgroundColor,
  backgroundColor = "white",
  className
}) => (
  <div
    className={classnames("gv-qr", className)}
    style={{
      background: backgroundColor,
      width: `${size}px`,
      height: `${size}px`
    }}
  >
    {value ? (
      <QRCode
        value={value.toString()}
        bgColor={backgroundColor}
        fgColor={figureColor}
        size={size}
      />
    ) : null}
  </div>
);

export default GVqr;
