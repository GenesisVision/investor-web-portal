import {
  calculateSkipAndTake,
  calculateTotalPages
} from "../../paging/helpers/paging-helpers";
import authService from "../../../services/authService";
import filesService from "../../../shared/services/file-service";
import pagingActionsFactory from "../../paging/actions/paging-actions";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./trader-actions.constants";

const fetchTrader = traderId => {
  let data = {};
  if (authService.getAuthArg()) {
    data.authorization = authService.getAuthArg();
  }

  return {
    type: actionTypes.TRADER_DETAIL,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramGet(
      traderId,
      data
    ).then(response => {
      const trader = response.investmentProgram;
      trader.logo = filesService.getFileUrl(trader.logo);
      return response;
    })
  };
};

const fetchTraderRequests = traderId => {
  const data = {
    filter: { investmentProgramId: traderId, take: 10 }
  };
  return {
    type: actionTypes.TRADER_REQUESTS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramRequestsPost(
      authService.getAuthArg(),
      data
    )
  };
};

const fetchTraderHistory = traderId => {
  const data = {
    filter: { investmentProgramId: traderId }
  };
  return {
    type: actionTypes.TRADER_HISTORY,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramTradesPost(
      authService.getAuthArg(),
      data
    ).then(response => {
      return response.trades.map(x => ({ profit: x.profit, date: x.date }));
    })
  };
};

const fetchTraderDealList = traderId => (dispatch, getState) => {
  const { paging } = getState().traderData.deals;
  const { skip, take } = calculateSkipAndTake(paging);

  const filter = { investmentProgramId: traderId, skip, take };
  return dispatch({
    type: actionTypes.TRADER_DEALS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramTradesPost(
      authService.getAuthArg(),
      { filter }
    )
  }).then(response => {
    const totalPages = calculateTotalPages(response.value.total);

    dispatch(updateTraderDealListPaging({ totalPages }));
  });
};

const updateTraderDealListPaging = paging => {
  const pagingActionsDealList = pagingActionsFactory(actionTypes.TRADER_DEALS);
  return pagingActionsDealList.updatePaging(paging);
};

const updateTraderDealListPagingAndFetch = (traderId, paging) => dispatch => {
  dispatch(updateTraderDealListPaging(paging));
  dispatch(fetchTraderDealList(traderId));
};

const cancelTraderRequest = requestId => {
  return {
    type: actionTypes.TRADER_CANCEL_REQUEST,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsCancelInvestmentRequestPost(
      requestId,
      authService.getAuthArg()
    )
  };
};

const traderActions = {
  fetchTrader,
  fetchTraderRequests,
  cancelTraderRequest,
  fetchTraderHistory,
  fetchTraderDealList,
  updateTraderDealListPaging,
  updateTraderDealListPagingAndFetch
};

export default traderActions;
