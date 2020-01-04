import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { TradesDelay } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";

import { DELAYS_LABELS } from "./program-open-positions/program-open-positions";

const _TradesDelayHint: React.FC<{ delay: TradesDelay }> = ({ delay }) => {
  const [t] = useTranslation();
  if (delay === "None") return null;
  const label = DELAYS_LABELS[delay];
  return (
    <>
      <div className="details-trades__delay-hint">
        {label} {t("program-details-page.history.open-positions.delay")}
      </div>
      <Tooltip
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        render={() => (
          <TooltipContent>
            {t("program-details-page.history.open-positions.delay-tooltip", {
              delay: label
            })}
          </TooltipContent>
        )}
      >
        <div className="details-trades__delay-question">?</div>
      </Tooltip>
    </>
  );
};
export const TradesDelayHint = React.memo(_TradesDelayHint);
