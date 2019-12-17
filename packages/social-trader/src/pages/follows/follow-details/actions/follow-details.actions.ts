import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "components/details/reducers/statistic-period.reducer";
import { EVENTS_ACTION_TYPE } from "components/portfolio-events-table/portfolio-events-table.constants";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import {
  CancelablePromise,
  InvestmentEventViewModels,
  ProgramBalanceChart,
  ProgramProfitPercentCharts,
  SignalProviderSubscribers,
  TradesViewModel
} from "gv-api-web";
import { FollowAbsoluteProfitChartDataType } from "pages/follows/follow-details/reducers/absolute-profit-chart.reducer";
import followApi from "services/api-client/follow-api";
import programsApi from "services/api-client/programs-api";
import { ActionType, ApiAction, CurrencyEnum } from "utils/types";

import {
  FETCH_FOLLOW_ABSOLUTE_PROFIT_CHART,
  FETCH_FOLLOW_BALANCE_CHART,
  FETCH_FOLLOW_DESCRIPTION,
  FETCH_FOLLOW_PROFIT_CHART,
  FOLLOW_OPEN_POSITIONS,
  FOLLOW_SUBSCRIPTIONS,
  FOLLOW_TRADES,
  SET_FOLLOW_ID,
  SET_FOLLOW_STATISTIC_CURRENCY,
  SET_FOLLOW_STATISTIC_PERIOD
} from "../follow-details.constants";
import { FollowDetailsDataType } from "../follow-details.types";
import { FollowIdState } from "../reducers/id.reducer";
import { FollowProfitChartDataType } from "../reducers/profit-chart.reducer";
import {
  EVENT_LOCATION,
  fetchPortfolioEventsWithoutTable
} from "../services/follow-details.service";

const sendFollowChartRequest = (
  { start, end }: ChartDefaultPeriod,
  id: string,
  currency: CurrencyEnum
): CancelablePromise<ProgramProfitPercentCharts> =>
  // @ts-ignore
  programsApi.getProgramProfitPercentCharts(id, {
    dateFrom: start,
    dateTo: end,
    maxPointCount: 100,
    currency
  });

export const statisticCurrencyAction = (
  currency: CurrencyEnum
): TStatisticCurrencyAction => ({
  type: SET_FOLLOW_STATISTIC_CURRENCY,
  payload: currency
});

export const statisticPeriodAction = (
  period: ChartDefaultPeriod
): TStatisticPeriodAction => ({
  type: SET_FOLLOW_STATISTIC_PERIOD,
  payload: period
});

export const fetchEventsAction = (
  assetId: string,
  eventLocation: EVENT_LOCATION,
  filters?: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> => ({
  type: EVENTS_ACTION_TYPE,
  payload: fetchPortfolioEventsWithoutTable(eventLocation, {
    ...filters,
    assetId
  })
});

export const fetchFollowProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<FollowProfitChartDataType> => ({
  type: FETCH_FOLLOW_PROFIT_CHART,
  payload: followApi.getProfitPercentCharts(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currencies
  })
});

export const fetchFollowAbsoluteProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<FollowAbsoluteProfitChartDataType> => ({
  type: FETCH_FOLLOW_ABSOLUTE_PROFIT_CHART,
  payload: followApi.getAbsoluteProfitChart(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currency
  })
});

export const fetchFollowBalanceChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<ProgramBalanceChart> => ({
  type: FETCH_FOLLOW_BALANCE_CHART,
  // @ts-ignore
  payload: followApi.getBalanceChart(id, {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchFollowDescriptionAction = (
  id: string,
  authorization: string
): ApiAction<FollowDetailsDataType> => ({
  type: FETCH_FOLLOW_DESCRIPTION,
  payload: followApi.getFollowAssetDetails(id, { authorization })
});

export const fetchOpenPositionsAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => ({
  type: FOLLOW_OPEN_POSITIONS,
  payload: programsApi.getProgramOpenTrades(id, filters)
});

export const fetchTradesAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => ({
  type: FOLLOW_TRADES,
  payload: programsApi.getProgramTrades(id, filters)
});

export const fetchSubscriptionsAction = (
  id: string,
  authorization: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<SignalProviderSubscribers>> => ({
  type: FOLLOW_SUBSCRIPTIONS,
  payload: programsApi.getProgramSubscribers(id, authorization, filters)
});

export interface SetFollowIdAction extends ActionType<FollowIdState> {
  type: typeof SET_FOLLOW_ID;
}
export const setFollowIdAction = (id: string): SetFollowIdAction => ({
  type: SET_FOLLOW_ID,
  payload: id
});
