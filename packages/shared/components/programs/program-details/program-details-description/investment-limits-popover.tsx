import { LevelInfo } from "gv-api-web";
import * as React from "react";
import { useEffect, useState } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import GVButton from "shared/components/gv-button";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import useIsOpen from "shared/hooks/is-open.hook";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import { fetchInvestmentsLevels } from "../services/program-details.service";
import AboutLevelsComponent from "./about-levels/about-levels";

const _InvestmentLimitsPopover: React.FC<Props> = ({
  t,
  level,
  canLevelUp,
  currency,
  limit
}) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  const [investmentsLimits, setInvestmentsLimits] = useState<
    LevelInfo[] | undefined
  >(undefined);
  useEffect(() => {
    fetchInvestmentsLevels(currency).then(({ levels }) =>
      setInvestmentsLimits(levels)
    );
  }, []);
  return (
    <>
      <div className="popover-levels">
        <div className="popover-levels__block">
          <h4 className="popover-levels__title">
            {t("program-details-page.popover.genesis-level")} {level}
          </h4>
          <StatisticItem
            condition={canLevelUp}
            accent
            label={t("level-tooltip.level-up")}
          >
            {t("level-tooltip.top10")}
          </StatisticItem>

          <StatisticItem
            accent
            label={t("program-details-page.popover.invest-limit")}
          >
            <NumberFormat
              value={formatCurrencyValue(limit, currency)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${currency}`}
            />
          </StatisticItem>
        </div>
        <div className="popover-levels__block popover-levels__text-block">
          <div className="popover-levels__text">
            {t("program-details-page.popover.text")}
          </div>
          <GVButton
            variant="text"
            onClick={setOpen}
            color="secondary"
            className="popover-levels__about"
          >
            <>{t("program-details-page.popover.about-levels")} &#8250;</>
          </GVButton>
        </div>
      </div>
      <AboutLevelsComponent
        condition={!!investmentsLimits}
        open={isOpen}
        onClose={setClose}
        currency={currency}
        investmentsLimits={investmentsLimits!}
      />
    </>
  );
};

interface OwnProps {
  currency: CurrencyEnum;
  level: number;
  canLevelUp: boolean;
  closePopover(): void;
}

interface Props extends OwnProps, InjectedTranslateProps {
  limit: number;
}

const InvestmentLimitsPopover = translate()(
  React.memo(_InvestmentLimitsPopover)
);
export default InvestmentLimitsPopover;
