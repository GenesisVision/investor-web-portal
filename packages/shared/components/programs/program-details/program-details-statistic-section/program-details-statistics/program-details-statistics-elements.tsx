import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import {
  ChartDefaultPeriod,
  ChartPeriodType
} from "shared/components/chart/chart-period/chart-period.helpers";
import ProgramPeriodLine from "shared/components/program-period/program-period-line/program-period-line";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { STATUS } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import {
  ProgramDetailsProfitChart,
  ProgramDetailsStatistic
} from "../../services/program-details.types";

const _ProgramDetailsStatisticsElements: React.FC<
  IProgramDetailsStatisticsElementsProps & InjectedTranslateProps
> = ({ status, t, statistic, profitChart, period }) => (
  <>
    <div className="details-statistics__subheading">
      {t("program-details-page.statistics.current")}
    </div>
    <div className="details-statistics__particular-information">
      <StatisticItem label={t("program-details-page.statistics.equity")} accent>
        <NumberFormat
          value={formatCurrencyValue(
            profitChart.balance,
            profitChart.programCurrency
          )}
          thousandSeparator={" "}
          displayType="text"
          suffix={` ${profitChart.programCurrency}`}
        />
      </StatisticItem>
      <StatisticItem label={t("program-details-page.statistics.investors")}>
        <NumberFormat
          value={statistic.investors}
          thousandSeparator={" "}
          displayType="text"
        />
      </StatisticItem>
      <div className="details-statistics__period">
        <span className="details-statistics__label">
          {t("program-details-page.statistics.period")}
        </span>
        <ProgramPeriodLine
          start={statistic.periodStarts}
          end={statistic.periodEnds}
          status={status}
        />
      </div>
    </div>

    <div className="details-statistics__subheading">
      {t("program-details-page.statistics.for")}{" "}
      {t(`chart-period.${ChartPeriodType[period.type]}`)}
    </div>

    <div className="details-statistics__particular-information">
      <div className="details-statistics__column">
        <StatisticItem label={t("program-details-page.statistics.trades")} half>
          <NumberFormat
            value={statistic.trades !== undefined ? statistic.trades : "-"}
            thousandSeparator={" "}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem
          label={t("program-details-page.statistics.profit-factor")}
          half
        >
          <NumberFormat
            value={
              statistic.profitFactor !== undefined
                ? formatValue(statistic.profitFactor, 2)
                : "-"
            }
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem
          label={t("program-details-page.statistics.max-drawdown")}
          half
        >
          <NumberFormat
            value={
              statistic.maxDrawdown !== undefined
                ? formatValue(statistic.maxDrawdown, 2)
                : "-"
            }
            displayType="text"
            suffix="%"
          />
        </StatisticItem>
      </div>

      <div className="details-statistics__column">
        <StatisticItem
          label={t("program-details-page.statistics.success-trades")}
          half
        >
          <NumberFormat
            value={
              statistic.successTradesPercent !== undefined
                ? formatValue(statistic.successTradesPercent, 2)
                : "-"
            }
            displayType="text"
            suffix="%"
          />
        </StatisticItem>
        <StatisticItem
          label={t("program-details-page.statistics.sharpe-ratio")}
          half
        >
          <NumberFormat
            value={
              statistic.sharpeRatio !== undefined
                ? formatValue(statistic.sharpeRatio, 2)
                : "-"
            }
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem
          label={t("program-details-page.statistics.sortino-ratio")}
          half
        >
          <NumberFormat
            value={
              statistic.sortinoRatio !== undefined
                ? formatValue(statistic.sortinoRatio, 2)
                : "-"
            }
            displayType="text"
          />
        </StatisticItem>
      </div>
    </div>
  </>
);

export interface IProgramDetailsStatisticsElementsProps {
  status: STATUS;
  statistic: ProgramDetailsStatistic;
  profitChart: ProgramDetailsProfitChart;
  period: ChartDefaultPeriod;
}

const ProgramDetailsStatisticsElements = React.memo(
  withLoader(translate()(_ProgramDetailsStatisticsElements))
);
export default ProgramDetailsStatisticsElements;
