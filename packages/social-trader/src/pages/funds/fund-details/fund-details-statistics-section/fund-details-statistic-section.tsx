import "components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import DetailsStatisticSection from "components/details/details-statistic-section/details-statistic-section";
import { fundAbsoluteProfitChartSelector } from "pages/funds/fund-details/reducers/absolute-profit-chart.reducer";
import ProgramAbsoluteProfitChart from "pages/programs/program-details/program-details-statistic-section/program-details-chart-section/program-absolute-profit-chart-section/program-absolute-profit-chart";
import * as React from "react";
import NumberFormat from "react-number-format";

import { fundStatisticDataLoaderData } from "../fund-details.loader-data";
import { fundBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { fundProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import FundBalanceChart from "./fund-details-chart-section/fund-balance-chart-section/fund-balance-chart";
import {
  useChartPeriod,
  useFundChartStateValues
} from "./fund-details-chart-section/fund-details-chart.helpers";
import FundProfitChart from "./fund-details-chart-section/fund-profit-chart-section/fund-profit-chart";
import FundDetailsStatisticsElements, {
  IFundStatisticData
} from "./fund-details-statistics/fund-details-statistics-elements";

const _FundDetailsStatisticSection: React.FC = () => (
  <DetailsStatisticSection
    balanceChartSelector={fundBalanceChartSelector}
    profitChartSelector={fundProfitChartSelector}
    absoluteProfitChartSelector={fundAbsoluteProfitChartSelector}
    statisticCurrencySelector={statisticCurrencySelector}
    useChartStateValues={useFundChartStateValues}
    useChartPeriod={useChartPeriod}
    renderProfitValue={({ statistic }) => (
      <NumberFormat
        value={"profitPercent" in statistic ? statistic.profitPercent : 0}
        thousandSeparator={" "}
        displayType="text"
        suffix={" %"}
      />
    )}
    renderBalanceChart={({ currency, color, balanceChart }) => (
      <FundBalanceChart
        balanceChart={balanceChart}
        currency={currency}
        color={color}
      />
    )}
    renderAbsoluteProfitChart={({ color, currency, chart }) => (
      <ProgramAbsoluteProfitChart
        color={color}
        chart={chart}
        currency={currency}
      />
    )}
    renderProfitChart={({ profitChart, chartCurrencies, assets }) => (
      <FundProfitChart
        assets={assets!}
        profitChart={profitChart}
        chartCurrencies={chartCurrencies}
      />
    )}
    renderDetailsStatisticsElements={({ period, statisticData }) => (
      <FundDetailsStatisticsElements
        loaderData={fundStatisticDataLoaderData}
        period={period}
        data={statisticData! as IFundStatisticData}
      />
    )}
  />
);

const FundDetailsStatisticSection = React.memo(_FundDetailsStatisticSection);
export default FundDetailsStatisticSection;
