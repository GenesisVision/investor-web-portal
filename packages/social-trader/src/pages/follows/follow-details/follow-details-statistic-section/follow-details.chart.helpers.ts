import { DETAILS_CHART_TABS } from "components/details/details-statistic-section/details-chart-section/details-chart";
import {
  useChartPeriodCreator,
  useChartStateDataCreator,
  useFundChartStateValuesCreator
} from "components/details/details-statistic-section/details.chart.helpers";
import { followAbsoluteProfitChartSelector } from "pages/follows/follow-details/reducers/absolute-profit-chart.reducer";

import {
  statisticCurrencyAction,
  statisticPeriodAction
} from "../actions/follow-details.actions";
import { followBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { followIdSelector } from "../reducers/description.reducer";
import { followProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import { statisticPeriodSelector } from "../reducers/statistic-period.reducer";
import {
  getAbsoluteProfitChart,
  getBalanceChart,
  getProfitChart
} from "../services/follow-details.service";

export const useChartPeriod = () =>
  useChartPeriodCreator(statisticPeriodSelector, statisticPeriodAction);

export const useFollowChartStateData = (view: DETAILS_CHART_TABS) =>
  useChartStateDataCreator({
    view,
    statisticCurrencyAction,
    idSelector: followIdSelector,
    statisticPeriodSelector,
    statisticCurrencySelector,
    absoluteProfitChartSelector: followAbsoluteProfitChartSelector,
    profitChartSelector: followProfitChartSelector,
    balanceChartSelector: followBalanceChartSelector,
    getBalanceChart,
    getAbsoluteProfitChart,
    getProfitChart
  });

export const useFollowChartStateValues = (view: DETAILS_CHART_TABS) =>
  useFundChartStateValuesCreator(useFollowChartStateData(view));
