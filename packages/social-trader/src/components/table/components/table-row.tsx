import clsx from "clsx";
import * as React from "react";
import { ReactNode } from "react";

import styles from "./table.module.scss";

const TableRow: React.FC<Props> = ({
  hoverable = true,
  className = "",
  stripy,
  children,
  ...other
}) => (
  <tr
    className={clsx(
      styles["table__row"],
      {
        [styles["table__row--hoverable"]]: hoverable,
        [styles["table__row--stripy"]]: stripy
      },
      className
    )}
    {...other}
  >
    {children}
  </tr>
);

interface Props {
  onClick?(e: React.MouseEvent<HTMLTableRowElement>): void;
  className?: string;
  hoverable?: boolean;
  stripy?: boolean;
  children: ReactNode;
}

export default React.memo(TableRow);
