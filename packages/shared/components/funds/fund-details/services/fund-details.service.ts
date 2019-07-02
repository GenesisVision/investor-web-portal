import {
  FundAssetsListInfo,
  FundDetailsFull,
  ReallocationsViewModel
} from "gv-api-web";
import { Dispatch } from "redux";
import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";
import { HistoryCountsType } from "shared/components/programs/program-details/program-details.types";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import {
  FUNDS_SLUG_URL_PARAM_NAME,
  FUND_DETAILS_ROUTE
} from "shared/routes/funds.routes";
import fundsApi from "shared/services/api-client/funds-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";
import { TGetState } from "shared/utils/types";

import { FundStatisticResult } from "./fund-details.types";

export const getFundDescription = () => (
  dispatch: Dispatch,
  getState: TGetState
): Promise<FundDetailsFull> => {
  const authorization = authService.getAuthArg();
  const { router } = getState();

  const programSlugUrl = getParams(
    router.location.pathname,
    FUND_DETAILS_ROUTE
  )[FUNDS_SLUG_URL_PARAM_NAME];

  return fundsApi.v10FundsByIdGet(programSlugUrl, {
    authorization
  });
};

export const getFundStatistic = (
  fundId: string,
  currency: string,
  period: ChartDefaultPeriod = getDefaultPeriod()
): Promise<FundStatisticResult> => {
  const chartFilter = {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };
  return Promise.all([
    fundsApi.v10FundsByIdChartsProfitGet(fundId, chartFilter),
    fundsApi.v10FundsByIdChartsBalanceGet(fundId, chartFilter)
  ]).then(([profitChart, balanceChart]) => {
    const statistic = {
      calmarRatio: profitChart.calmarRatio,
      profitChangePercent: profitChart.profitChangePercent,
      rebalances: profitChart.rebalances,
      balance: profitChart.balance,
      investors: profitChart.investors,
      sharpeRatio: profitChart.sharpeRatio,
      sortinoRatio: profitChart.sortinoRatio,
      maxDrawdown: profitChart.maxDrawdown,
      creationDate: profitChart.creationDate
    };
    const profitChartData = {
      timeFrameGvtProfit: profitChart.timeframeGvtProfit,
      timeFrameUsdProfit: profitChart.timeframeUsdProfit,
      profitChangePercent: profitChart.profitChangePercent,
      equityChart: profitChart.equityChart
    };

    return { statistic, profitChart: profitChartData, balanceChart };
  });
};

export const fetchFundStructure = (
  fundId: string
): Promise<FundAssetsListInfo> => {
  return fundsApi.v10FundsByIdAssetsGet(fundId);
};

export const fetchFundReallocateHistory = (
  fundId: string,
  filters?: FilteringType
): Promise<ReallocationsViewModel> => {
  return fundsApi.v10FundsByIdReallocationsGet(fundId, filters);
};

export const closeFund = (
  id: string,
  opts: {
    twoFactorCode: string;
  }
): Promise<void> => {
  const authorization = authService.getAuthArg();

  return managerApi.v10ManagerFundsByIdClosePost(id, authorization, opts);
};

export const fetchEventsCounts = (id: string): Promise<HistoryCountsType> => {
  const isAuthenticated = authService.isAuthenticated();
  const filtering = { take: 0 };
  const eventsCountPromise = isAuthenticated
    ? fetchPortfolioEvents({ ...filtering, assetId: id })
    : Promise.resolve({ total: 0 });
  const reallocateCountPromise = fetchFundReallocateHistory(id, filtering);
  return Promise.all([eventsCountPromise, reallocateCountPromise]).then(
    ([eventsData, reallocateData]) => ({
      eventsCount: eventsData.total,
      reallocateCount: reallocateData.total
    })
  );
};
