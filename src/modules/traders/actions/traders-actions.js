import authService from "../../../services/authService";
import filesService from "../../../shared/services/file-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./traders-actions.constants";

const fetchTraders = () => {
  return {
    type: actionTypes.TRADERS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost().then(
      response => {
        response.investmentPrograms.forEach(x => {
          x.logo = filesService.getFileUrl(x.logo);
        });

        return response;
      }
    )
  };
};

const fetchTrader = traderId => {
  return {
    type: actionTypes.TRADER,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramGet(traderId).then(
      response => {
        const trader = response.investmentProgram;
        trader.logo = filesService.getFileUrl(trader.logo);
        return response;
      }
    )
  };
};

const fetchTraderRequests = traderId => {
  const data = {
    filter: { investmentProgramId: traderId }
  };
  return {
    type: actionTypes.TRADER_REQUESTS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramRequestsPost(
      authService.getAuthArg(),
      data
    )
  };
};

const tradersActions = { fetchTraders, fetchTrader, fetchTraderRequests };
export default tradersActions;
