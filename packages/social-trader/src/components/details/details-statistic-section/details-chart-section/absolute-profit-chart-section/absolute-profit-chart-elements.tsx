import ChartPeriod from "components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import {
  AbsoluteProfitChartDataType,
  ChartDataType,
  StatisticDataType
} from "components/details/details-statistic-section/details.chart.types";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import ChartCurrencySelector from "modules/chart-currency-selector/chart-currency-selector";
import {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "modules/chart-currency-selector/chart-currency-selector.types";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { platformCurrenciesSelector } from "reducers/platform-reducer";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum, HandlePeriodChangeType } from "utils/types";

import { useChartData } from "../../details.chart.helpers";
import styles from "../details-chart-section.module.scss";

export const ABSOLUTE_PROFIT_CHART_TEST_ID = "ABSOLUTE_PROFIT_CHART_TEST_ID";

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
  const [t] = useTranslation();
  const chartData = useChartData<AbsoluteProfitChartDataType>(
    data,
    selectedCurrencies
  );
  const platformCurrencies = useSelector(platformCurrenciesSelector);
  const { name, color } = chartData.selectedCurrencies[0];
  const { chart, profit } = chartData.chart;
  return (
    <>
      <Row>
        <StatisticItem big accent label={t("asset-details:chart.value")}>
          <NumberFormat
            value={formatCurrencyValue(profit, name)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${name}`}
          />
        </StatisticItem>
      </Row>
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
      <div
        data-test-id={ABSOLUTE_PROFIT_CHART_TEST_ID}
        className={styles["details-chart__profit"]}
      >
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
