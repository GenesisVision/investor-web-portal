import "./fees-tooltip.scss";

import * as React from "react";
import { compose } from "redux";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";

const _FeesTooltip: React.FC<Props> = ({ children, header, footer }) => (
  <Tooltip
    horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
    className="fees-tooltip"
    render={() => (
      <div className="fees-tooltip-container">
        <div className="fees-tooltip-container__header">{header}</div>
        {footer && (
          <div className="fees-tooltip-container__footer">{footer}</div>
        )}
      </div>
    )}
  >
    {children}
  </Tooltip>
);

const FeesTooltip = compose<React.FC<OwnProps>>(React.memo)(_FeesTooltip);

export default FeesTooltip;

interface Props extends OwnProps {}

interface OwnProps {
  header: JSX.Element;
  footer?: JSX.Element;
}
