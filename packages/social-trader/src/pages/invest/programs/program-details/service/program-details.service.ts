import { TGetChartFunc } from "components/details/details-statistic-section/details.chart.types";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "components/table/services/table.service";
import { ASSET, TRADE_ASSET_TYPE } from "constants/constants";
import {
  Currency,
  InvestmentEventLocation,
  InvestmentEventViewModels,
  LevelInfo,
  NotificationSettingConditionType,
  NotificationType,
  ProgramFollowDetailsFull
} from "gv-api-web";
import { NextPageContext } from "next";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { api, Token } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";
import {
  ApiActionResponse,
  CurrencyEnum,
  MiddlewareDispatch,
  RootThunk
} from "utils/types";

import {
  fetchEventsAction,
  fetchFinancialStatisticAction,
  fetchFollowProgramDescriptionAction,
  fetchLevelParametersAction,
  fetchOpenPositionsAction,
  fetchPeriodHistoryAction,
  fetchProgramAbsoluteProfitChartAction,
  fetchProgramBalanceChartAction,
  fetchProgramDescriptionAction,
  fetchProgramProfitChartAction,
  fetchSubscriptionsAction,
  fetchTradesAction,
  setProgramIdAction
} from "../actions/program-details.actions";
import {
  financialStatisticTableSelector,
  periodHistoryTableSelector,
  subscriptionsTableSelector,
  tradesTableSelector
} from "../reducers/program-history.reducer";

type ClosePositionMethodType = (
  id: string,
  options: {
    symbol?: string;
  }
) => Promise<any>;

export const getCloseOpenPositionMethod = (
  assetType?: TRADE_ASSET_TYPE
): ClosePositionMethodType => {
  switch (assetType) {
    case TRADE_ASSET_TYPE.FOLLOW:
      return api.follows().closeAssetTrade;
    case TRADE_ASSET_TYPE.ACCOUNT:
      return api.accounts().closeAccountAssetTrade;
    case TRADE_ASSET_TYPE.PROGRAM:
    default:
      return api.programs().closeAssetTrade;
  }
};

export const closePosition = (assetType?: TRADE_ASSET_TYPE) => {
  const method = getCloseOpenPositionMethod(assetType);
  return ({ id, symbol }: { id: string; symbol?: string }) => {
    return method(id, { symbol });
  };
};

export const getEvents = (id: string, eventLocation: EVENT_LOCATION) => (
  filters?: ComposeFiltersAllType
) => fetchEventsAction(id, eventLocation, filters);

export const getProgramBrokersMethod = (id: string) =>
  api.brokers().getBrokersForProgram(id);

export const dispatchPlatformLevelsParameters = (currency: CurrencyEnum) => (
  dispatch: Dispatch
) => dispatch(fetchLevelParametersAction(currency));

export const dispatchProgramDescriptionWithId = (
  id: string,
  token = Token.create(),
  asset: ASSET = ASSET.PROGRAM
): RootThunk<ApiActionResponse<ProgramFollowDetailsFull>> => dispatch => {
  const action =
    asset === ASSET.FOLLOW
      ? fetchFollowProgramDescriptionAction
      : fetchProgramDescriptionAction;
  return dispatch(action(id, token));
};

export const dispatchProgramDescription = (
  ctx?: NextPageContext,
  asset?: ASSET
): RootThunk<ApiActionResponse<ProgramFollowDetailsFull>> => (
  dispatch,
  getState
) => {
  const {
    programDetails: { id: stateId }
  } = getState();
  return dispatch(
    dispatchProgramDescriptionWithId(
      ctx ? (ctx.query.id as string) : stateId,
      Token.create(ctx),
      asset
    )
  );
};

export const dispatchProgramId = (id: string) => async (
  dispatch: MiddlewareDispatch
) => await dispatch(setProgramIdAction(id));

export const closePeriod = (programId: string) => {
  return api.assets().closeCurrentPeriod(programId);
};

export const getOpenPositions = (programId: string) => (
  filters: ComposeFiltersAllType
) => {
  return fetchOpenPositionsAction(programId, filters);
};

export const getTrades = (programId: string) => (
  filters: ComposeFiltersAllType
) => {
  return fetchTradesAction(programId, filters);
};

export const getPeriodHistory = (programId: string) => (
  filters: ComposeFiltersAllType
) => {
  return fetchPeriodHistoryAction(programId, filters);
};

export const getFinancialStatistics = (programId: string) => (
  filters: ComposeFiltersAllType
) => {
  const authorization = authService.getAuthArg();
  return fetchFinancialStatisticAction(programId, {
    authorization,
    ...filters
  });
};

export const getSubscriptions = (programId: string) => (
  filters: ComposeFiltersAllType
) => {
  return fetchSubscriptionsAction(programId, filters);
};

export const fetchInvestmentsLevels = (
  currency: Currency
): Promise<LevelInfo[]> =>
  api
    .platform()
    .getProgramLevels({ currency })
    .then(({ levels }) => levels);

export const getProgramHistoryCounts = (isProgram: boolean) => (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const isAuthenticated = authService.isAuthenticated();

  const commonFiltering = { take: 0 };

  const tradesFilters = composeRequestFiltersByTableState(
    tradesTableSelector(getState())
  );
  dispatch(
    getTrades(id)({
      ...tradesFilters,
      ...commonFiltering
    })
  );

  if (isAuthenticated) {
    const subscriptionFilters = composeRequestFiltersByTableState(
      subscriptionsTableSelector(getState())
    );
    dispatch(
      getSubscriptions(id)({
        ...subscriptionFilters,
        ...commonFiltering
      })
    );

    if (isProgram) {
      const periodHistoryFilters = composeRequestFiltersByTableState(
        periodHistoryTableSelector(getState())
      );
      dispatch(
        getPeriodHistory(id)({
          ...periodHistoryFilters,
          ...commonFiltering
        })
      );

      const financialStatisticsFilters = composeRequestFiltersByTableState(
        financialStatisticTableSelector(getState())
      );
      dispatch(
        getFinancialStatistics(id)({
          ...financialStatisticsFilters,
          ...commonFiltering
        })
      );
    }
  }
};

export enum EVENT_LOCATION {
  Asset = "Asset",
  Dashboard = "Dashboard",
  EventsAll = "EventsAll"
}

export const fetchPortfolioEventsWithoutTable = (
  eventLocation: InvestmentEventLocation,
  filters?: any
): Promise<InvestmentEventViewModels> => {
  return api.events().getEvents({ ...filters, eventLocation });
};

export const fetchPortfolioEventsCount = (
  eventLocation: EVENT_LOCATION,
  filters?: any
): Promise<number> => {
  return fetchPortfolioEventsWithoutTable(eventLocation, filters).then(
    ({ total }) => total
  );
};

export const getProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(fetchProgramProfitChartAction(id, period, currencies));

export const getAbsoluteProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(
    fetchProgramAbsoluteProfitChartAction(id, period, currencies[0])
  );

export const getBalanceChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch => {
  await dispatch(fetchProgramBalanceChartAction(id, period, currencies[0]));
};

export const addInvestNotify = ({
  minDeposit,
  assetId
}: {
  minDeposit: number;
  assetId: string;
}) =>
  api.notifications().addNotificationsSettings({
    assetId,
    conditionType: "AvailableToInvest" as NotificationSettingConditionType,
    type: "ProgramCondition" as NotificationType,
    conditionAmount: minDeposit
  });
