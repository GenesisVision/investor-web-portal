import {
  CancelablePromise,
  FundBalanceChart,
  FundDetailsFull,
  FundProfitChart
} from "gv-api-web";
import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";
import fundsApi from "shared/services/api-client/funds-api";
import { ApiAction, CurrencyEnum } from "shared/utils/types";

import { FundProfitChartDataType } from "../reducers/profit-chart.reducer";

export const FETCH_FUND_PROFIT_CHART = "FETCH_FUND_PROFIT_CHART";
export const FETCH_FUND_BALANCE_CHART = "FETCH_FUND_BALANCE_CHART";
export const FETCH_FUND_DESCRIPTION = "FETCH_FUND_DESCRIPTION";

const sendFundChartRequest = (
  { start, end }: ChartDefaultPeriod,
  id: string,
  currency: CurrencyEnum
): Promise<FundProfitChart> =>
  fundsApi.v10FundsByIdChartsProfitGet(id, {
    dateFrom: start,
    dateTo: end,
    maxPointCount: 100,
    currency
  });

export const fetchFundProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<FundProfitChartDataType> => ({
  type: FETCH_FUND_PROFIT_CHART,
  payload: Promise.all(
    currencies.map(currency => sendFundChartRequest(period, id, currency))
  ) as CancelablePromise<FundProfitChartDataType>
});

export const fetchFundBalanceChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<FundBalanceChart> => ({
  type: FETCH_FUND_BALANCE_CHART,
  payload: fundsApi.v10FundsByIdChartsBalanceGet(id, {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchFundDescriptionAction = (
  id: string,
  authorization: string
): ApiAction<FundDetailsFull> => ({
  type: FETCH_FUND_DESCRIPTION,
  payload: fundsApi.v10FundsByIdGet(id, { authorization })
});
