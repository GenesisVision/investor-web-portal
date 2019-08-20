import {
  CancelablePromise,
  DashboardPortfolioEvent,
  DashboardPortfolioEvents,
  LevelInfo,
  ManagerPortfolioEvent,
  ManagerPortfolioEvents,
  OrderModel,
  ProgramPeriodsViewModel
} from "gv-api-web";
import { Dispatch } from "redux";
import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";
import {
  PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  PORTFOLIO_EVENTS_FILTERS
} from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import {
  mapToTableItems,
  TableItems
} from "shared/components/table/helpers/mapper";
import { composeRequestFilters } from "shared/components/table/services/table.service";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import {
  PROGRAM_DETAILS_ROUTE,
  PROGRAM_SLUG_URL_PARAM_NAME
} from "shared/routes/programs.routes";
import brokersApi from "shared/services/api-client/brokers-api";
import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
import platformApi from "shared/services/api-client/platform-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";
import { CurrencyEnum, DispatchDescriptionType } from "shared/utils/types";

import {
  fetchLevelParametersAction,
  fetchProgramBalanceChartAction,
  fetchProgramDescriptionAction,
  fetchProgramProfitChartAction
} from "../actions/program-details.actions";
import {
  PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS,
  PROGRAM_SUBSCRIBERS_FILTERS,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../program-details.constants";
import { HistoryCountsType } from "../program-details.types";
import { ProgramStatisticResult } from "./program-details.types";

export const getProgramBrokers = (id: string) =>
  brokersApi.v10BrokersByProgramIdGet(id);

export const dispatchPlatformLevelsParameters = (currency: CurrencyEnum) => (
  dispatch: Dispatch
) => dispatch(fetchLevelParametersAction(currency));

export const dispatchProgramDescription: DispatchDescriptionType = () => (
  dispatch,
  getState
) => {
  const authorization = authService.getAuthArg();
  const { router } = getState();

  const slugUrl = getParams(router.location.pathname, PROGRAM_DETAILS_ROUTE)[
    PROGRAM_SLUG_URL_PARAM_NAME
  ];

  return dispatch(fetchProgramDescriptionAction(slugUrl, authorization));
};

export const getProgramStatistic = (
  programId: string,
  currency = "",
  period = getDefaultPeriod()
): Promise<ProgramStatisticResult> => {
  const chartFilter = {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };
  return Promise.all([
    programsApi.v10ProgramsByIdChartsProfitGet(programId, chartFilter),
    programsApi.v10ProgramsByIdChartsBalanceGet(programId, chartFilter)
  ]).then(([profitChart, balanceChart]) => {
    const statistic = {
      trades: profitChart.trades,
      successTradesPercent: profitChart.successTradesPercent,
      profitFactor: profitChart.profitFactor,
      investors: profitChart.investors,
      sharpeRatio: profitChart.sharpeRatio,
      sortinoRatio: profitChart.sortinoRatio,
      maxDrawdown: profitChart.maxDrawdown,
      periodStarts: profitChart.lastPeriodStarts,
      periodEnds: profitChart.lastPeriodEnds,
      tradingVolume: profitChart.tradingVolume
    };
    return { statistic, profitChart, balanceChart };
  });
};

export const closePeriod = (
  programId: string,
  onSuccess: () => void,
  onError: () => void
) => (dispatch: Dispatch): void => {
  const authorization = authService.getAuthArg();
  managerApi
    .v10ManagerProgramsByIdPeriodClosePost(programId, authorization)
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "program-details-page.close-period.notification-success",
          true
        )
      );
    })
    .catch(error => {
      onError();
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};

export const fetchProgramTrades = (
  id: string,
  filters?: FilteringType
): Promise<TableItems<OrderModel>> => {
  return programsApi
    .v10ProgramsByIdTradesGet(id, {
      ...filters
    })
    .then(mapToTableItems<OrderModel>("trades"));
};

export const fetchOpenPositions = (
  id: string,
  filters: any
): Promise<TableItems<OrderModel>> => {
  return programsApi
    .v10ProgramsByIdTradesOpenGet(id, { sorting: filters.sorting })
    .then(mapToTableItems<OrderModel>("trades"));
};

export const fetchInvestmentsLevels = (
  currency: string
): CancelablePromise<LevelInfo[]> =>
  platformApi.v10PlatformLevelsGet({ currency }).then(({ levels }) => levels);

export const fetchHistoryCounts = (id: string): Promise<HistoryCountsType> => {
  const isAuthenticated = authService.isAuthenticated();
  const isManager = ROLE_ENV === ROLE.MANAGER;

  const paging = { itemsOnPage: 0 };
  const tradesFilters = composeRequestFilters({
    paging,
    filtering: PROGRAM_TRADES_FILTERS,
    defaultFilters: PROGRAM_TRADES_DEFAULT_FILTERS
  });
  const tradesCountPromise = programsApi.v10ProgramsByIdTradesGet(
    id,
    tradesFilters
  );

  const eventsFilters = composeRequestFilters({
    paging,
    filtering: PORTFOLIO_EVENTS_DEFAULT_FILTERING,
    defaultFilters: PORTFOLIO_EVENTS_FILTERS
  });
  const eventsCountPromise = isAuthenticated
    ? fetchPortfolioEvents({ ...eventsFilters, assetId: id })
    : Promise.resolve({ total: 0 });

  const openPositionsCountPromise = programsApi.v10ProgramsByIdTradesOpenGet(
    id
  );

  const subscriptionsFilters = composeRequestFilters({
    paging,
    filtering: PROGRAM_SUBSCRIBERS_FILTERS,
    defaultFilters: PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS
  });
  const subscriptionsCountPromise =
    isAuthenticated && isManager
      ? programsApi.v10ProgramsByIdSubscribersGet(
          id,
          authService.getAuthArg(),
          subscriptionsFilters
        )
      : Promise.resolve({ total: 0 });

  const periodHistoryFilters = composeRequestFilters({
    paging,
    filtering: PROGRAM_TRADES_FILTERS,
    defaultFilters: PROGRAM_TRADES_DEFAULT_FILTERS
  });
  const periodHistoryCountPromise = programsApi.v10ProgramsByIdPeriodsGet(
    id,
    periodHistoryFilters
  );

  return Promise.all([
    tradesCountPromise,
    eventsCountPromise,
    openPositionsCountPromise,
    subscriptionsCountPromise,
    periodHistoryCountPromise
  ]).then(
    ([
      tradesData,
      eventsData,
      openPositionsData,
      subscriptionsData,
      periodHistoryData
    ]) => ({
      tradesCount: tradesData.total,
      eventsCount: eventsData.total,
      openPositionsCount: openPositionsData.total,
      subscriptionsCount: subscriptionsData.total,
      periodHistoryCount: periodHistoryData.total
    })
  );
};

export const fetchPortfolioEvents: GetItemsFuncType = (
  filters?
): CancelablePromise<
  TableItems<ManagerPortfolioEvent | DashboardPortfolioEvent>
> => {
  const authorization = authService.getAuthArg();
  let request: (
    authorization: string,
    opts?: Object
  ) => CancelablePromise<DashboardPortfolioEvents | ManagerPortfolioEvents>;
  switch (ROLE_ENV) {
    case ROLE.INVESTOR:
      request = investorApi.v10InvestorPortfolioEventsGet;
      break;
    case ROLE.MANAGER:
    default:
      request = managerApi.v10ManagerEventsGet;
      break;
  }
  return request(authorization, filters).then(
    mapToTableItems<ManagerPortfolioEvent | DashboardPortfolioEvent>("events")
  );
};

export const fetchPeriodHistory = (
  id: string,
  filters?: FilteringType
): Promise<TableItems<ProgramPeriodsViewModel>> => {
  const authorization = authService.getAuthArg();
  return programsApi
    .v10ProgramsByIdPeriodsGet(id, { authorization, ...filters })
    .then(mapToTableItems<ProgramPeriodsViewModel>("periods"));
};

export const getProfitChart = ({ id, period }: TGetChartArgs) => (
  dispatch: Dispatch
) => dispatch(fetchProgramProfitChartAction(id, period));

export const getBalanceChart = ({ id, period }: TGetChartArgs) => (
  dispatch: Dispatch
) => {
  dispatch(fetchProgramBalanceChartAction(id, period));
};

type TGetChartArgs = {
  id: string;
  period?: ChartDefaultPeriod;
};
