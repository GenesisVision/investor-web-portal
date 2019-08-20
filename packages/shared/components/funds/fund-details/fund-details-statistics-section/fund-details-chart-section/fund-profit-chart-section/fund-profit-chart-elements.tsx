import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import ChartCurrencySelector, {
  TChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { formatCurrencyValue } from "shared/utils/formatter";
import { HandlePeriodChangeType } from "shared/utils/types";

import { FundProfitChartDataType } from "../../../reducers/profit-chart.reducer";
import FundProfitChart from "./fund-profit-chart";

const _FundProfitChartElements: React.FC<Props> = ({
  profitChart,
  selectedCurrencies,
  onPeriodChange,
  period,
  addCurrency,
  removeCurrency,
  changeCurrency,
  selectCurrencies
}) => {
  const [t] = useTranslation();
  const equivalentCurrency = "USD";
  const [chartData, setChartData] = useState<IProfitChartData>({
    profitChart,
    selectedCurrencies
  });
  useEffect(
    () => {
      setChartData({
        profitChart,
        selectedCurrencies: [...selectedCurrencies]
      });
    },
    [profitChart]
  );
  const chart = chartData.profitChart[0];
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem
          label={t("fund-details-page.chart.value")}
          equivalent={
            +formatCurrencyValue(chart.timeframeUsdProfit, equivalentCurrency)
          }
          equivalentCurrency={equivalentCurrency}
          big
          accent
        >
          <NumberFormat
            value={chart.profitPercent}
            thousandSeparator={" "}
            displayType="text"
            suffix={" %"}
          />
        </StatisticItem>
      </div>
      <ChartPeriod onChange={onPeriodChange} period={period} />
      <ChartCurrencySelector
        maxCharts={
          selectCurrencies.length + chartData.selectedCurrencies.length
        }
        selectCurrencies={selectCurrencies}
        chartCurrencies={chartData.selectedCurrencies}
        onAdd={addCurrency}
        onRemove={removeCurrency}
        onChange={changeCurrency}
      />
      <div className="details-chart__profit">
        <FundProfitChart
          profitChart={chartData.profitChart}
          chartCurrencies={chartData.selectedCurrencies}
        />
      </div>
    </>
  );
};

interface IProfitChartData {
  profitChart: FundProfitChartDataType;
  selectedCurrencies: TChartCurrency[];
}

interface OwnProps {
  profitChart: FundProfitChartDataType;
  selectedCurrencies: TChartCurrency[];
  addCurrency: () => void;
  removeCurrency: (name: string) => void;
  changeCurrency: (i: number) => (event: ISelectChangeEvent) => void;
  selectCurrencies: TChartCurrency[];
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

interface Props extends OwnProps {}

const FundProfitChartElements = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_FundProfitChartElements);
export default FundProfitChartElements;
