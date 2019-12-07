import ChartPeriod from "components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import StatisticItem from "components/statistic-item/statistic-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import ChartCurrencySelector, {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "modules/chart-currency-selector/chart-currency-selector";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { platformCurrenciesSelector } from "reducers/platform-reducer";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum, HandlePeriodChangeType } from "utils/types";

import {
  AbsoluteProfitChartDataType,
  ChartDataType,
  StatisticDataType,
  useChartData
} from "../../details.chart.helpers";

const _AbsoluteProfitChartElements: React.FC<Props> = ({
  renderChart,
  period,
  setPeriod,
  data,
  selectedCurrencies,
  addCurrency,
  removeCurrency,
  changeCurrency,
  selectCurrencies
}) => {
  const chartData = useChartData<AbsoluteProfitChartDataType>(
    data,
    selectedCurrencies
  );
  const platformCurrencies = useSelector(platformCurrenciesSelector);
  const { name, color } = chartData.selectedCurrencies[0];
  const { chart } = chartData.chart;
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem big accent>
          <NumberFormat
            value={formatCurrencyValue(0, name)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${name}`}
          />
        </StatisticItem>
      </div>
      <ChartPeriod onChange={setPeriod} period={period} />
      <ChartCurrencySelector
        fullSelectCurrencies={platformCurrencies.map(
          ({ name }) => name as CurrencyEnum
        )}
        maxCharts={1}
        selectCurrencies={selectCurrencies.map(({ name }) => name)}
        chartCurrencies={chartData.selectedCurrencies}
        onAdd={addCurrency}
        onRemove={removeCurrency}
        onChange={changeCurrency}
      />
      <div className="details-chart__profit">
        {chart.length &&
          renderChart({
            chart: chart,
            currency: name,
            color
          })}
      </div>
    </>
  );
};

export type TRenderAbsoluteProfitValue = (props: {
  statistic: StatisticDataType;
}) => JSX.Element;

export type TRenderAbsoluteProfitChart = (props: {
  color: string;
  chart: ChartDataType;
  currency: CurrencyEnum;
}) => JSX.Element;

interface OwnProps {
  renderChart: TRenderAbsoluteProfitChart;
  renderValue: TRenderAbsoluteProfitValue;
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
  data: AbsoluteProfitChartDataType;
  selectedCurrencies: TChartCurrency[];
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
  selectCurrencies: TChartCurrency[];
}

interface Props extends OwnProps {}

const AbsoluteProfitChartElements = withBlurLoader(
  React.memo(_AbsoluteProfitChartElements)
);
export default AbsoluteProfitChartElements;
