import * as React from "react";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";

export const TooltipTab: React.FC<{
  tooltipContent: string;
  tabLabel: string;
}> = React.memo(({ tooltipContent, tabLabel }) => (
  <Tooltip
    horizontal={HORIZONTAL_POPOVER_POS.LEFT}
    render={() => <div className="tooltip__content">{tooltipContent}</div>}
  >
    <span>{tabLabel}</span>
  </Tooltip>
));
