import { TGetChartFunc } from "components/details/details-statistic-section/details.chart.types";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { GetItemsFuncType } from "components/table/components/table.types";
import { mapToTableItems, TableItems } from "components/table/helpers/mapper";
import { composeRequestFiltersByTableState } from "components/table/services/table.service";
import {
  CancelablePromise,
  Currency,
  InvestmentEventViewModels,
  LevelInfo
} from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { NextPageContext } from "next";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import assetsApi from "services/api-client/assets-api";
import brokersApi from "services/api-client/brokers-api";
import eventsApi from "services/api-client/events-api";
import platformApi from "services/api-client/platform-api";
import programsApi from "services/api-client/programs-api";
import authService from "services/auth-service";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum, MiddlewareDispatch, TGetState } from "utils/types";

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

export const getEvents = (id: string, eventLocation: EVENT_LOCATION) => (
  filters?: ComposeFiltersAllType
) => fetchEventsAction(id, eventLocation, filters);

export const getProgramBrokersMethod = (id: string) =>
  brokersApi.getBrokersForProgram(id);

export const dispatchPlatformLevelsParameters = (currency: CurrencyEnum) => (
  dispatch: Dispatch
) => dispatch(fetchLevelParametersAction(currency));

export const dispatchProgramDescriptionWithId = (
  id: string,
  auth = authService.getAuthArg(),
  asset: ASSET = ASSET.PROGRAM
) => async (dispatch: Dispatch) => {
  const action =
    asset === ASSET.FOLLOW
      ? fetchFollowProgramDescriptionAction
      : fetchProgramDescriptionAction;
  await dispatch(action(id, auth));
};

export const fetchProgramDescriptionCtx = (id: string, ctx?: NextPageContext) =>
  programsApi.getProgramDetails(id, {
    authorization: authService.getAuthArg(ctx)
  });

export const dispatchProgramDescription = (
  ctx?: NextPageContext,
  asset?: ASSET
) => async (dispatch: MiddlewareDispatch, getState: TGetState) => {
  const {
    programDetails: { id: stateId }
  } = getState();
  return await dispatch(
    dispatchProgramDescriptionWithId(
      ctx ? (ctx.query.id as string) : stateId,
      authService.getAuthArg(ctx),
      asset
    )
  );
};

export const dispatchProgramId = (id: string) => async (
  dispatch: MiddlewareDispatch
) => await dispatch(setProgramIdAction(id));

export const closePeriod = (
  programId: string,
  onSuccess: () => void,
  onError: () => void
) => (dispatch: Dispatch): void => {
  const authorization = authService.getAuthArg();
  assetsApi
    .closeCurrentPeriod(programId, authorization)
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "program-details-page.close-period.notification-success",
          true
        )
      );
    })
    .catch((error: { errorMessage: string }) => {
      onError();
      dispatch(alertMessageActions.error(error.errorMessage));
    });
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
  const authorization = authService.getAuthArg();
  return fetchPeriodHistoryAction(programId, { authorization, ...filters });
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
  const authorization = authService.getAuthArg();
  return fetchSubscriptionsAction(programId, authorization, filters);
};

export const fetchInvestmentsLevels = (
  currency: Currency
): CancelablePromise<LevelInfo[]> =>
  platformApi.getProgramLevels({ currency }).then(({ levels }) => levels);

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
  eventLocation: EVENT_LOCATION,
  filters?: any
): CancelablePromise<InvestmentEventViewModels> => {
  const authorization = authService.getAuthArg();
  return eventsApi.getEvents(authorization, { ...filters, eventLocation });
};

export const fetchPortfolioEvents = (
  eventLocation: EVENT_LOCATION
): GetItemsFuncType => (
  filters?
): CancelablePromise<TableItems<InvestmentEventViewModels>> => {
  const authorization = authService.getAuthArg();
  return eventsApi
    .getEvents(authorization, { ...filters, eventLocation })
    .then(mapToTableItems<InvestmentEventViewModels>("events"));
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
