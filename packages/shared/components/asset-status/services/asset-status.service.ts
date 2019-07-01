import { ProgramRequest, ProgramRequests } from "gv-api-web";
import { CancelRequestType } from "shared/components/dashboard/dashboard.constants";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { ASSET, ROLE, ROLE_ENV } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { ResponseError } from "shared/utils/types";

import {
  ICancelRequest,
  IFetchInRequests,
  cancelInvestorProgramRequestAction,
  cancelManagerProgramRequestAction,
  fetchInRequestsInvestorAction,
  fetchInRequestsManagerAction
} from "../actions/asset-status-actions";

export const getAssetRequests = (
  id: string,
  role: ROLE,
  asset: ASSET
): Promise<Array<ProgramRequest>> => {
  const authorization = authService.getAuthArg();
  let method;
  switch (role + asset) {
    case ROLE.MANAGER + ASSET.PROGRAM:
      method = managerApi.v10ManagerProgramsByIdRequestsBySkipByTakeGet;
      break;
    case ROLE.MANAGER + ASSET.FUND:
      method = managerApi.v10ManagerFundsByIdRequestsBySkipByTakeGet;
      break;
    case ROLE.INVESTOR + ASSET.PROGRAM:
      method = investorApi.v10InvestorProgramsByIdRequestsBySkipByTakeGet;
      break;
    default:
      method = investorApi.v10InvestorFundsByIdRequestsBySkipByTakeGet;
  }
  return method(id, 0, 10, authorization).then(
    (response: ProgramRequests) => response.requests
  );
};

export const cancelRequest = (
  id: string,
  role: ROLE,
  asset: ASSET
): Promise<void> => {
  const authorization = authService.getAuthArg();
  let method;

  switch (role + asset) {
    case ROLE.MANAGER + ASSET.PROGRAM:
      method = managerApi.v10ManagerProgramsRequestsByIdCancelPost;
      break;
    default:
      method = investorApi.v10InvestorProgramsRequestsByIdCancelPost;
  }
  return method(id, authorization);
};

export const cancelRequestDispatch: CancelRequestType = ({
  id,
  role = ROLE.INVESTOR,
  asset = ASSET.PROGRAM,
  onFinally
}) => dispatch => {
  const authorization = authService.getAuthArg();
  let actionCreator: ICancelRequest;
  let fetchInRequests: IFetchInRequests;

  switch (role + asset) {
    case ROLE.MANAGER + ASSET.PROGRAM:
      actionCreator = cancelManagerProgramRequestAction;
      fetchInRequests = fetchInRequestsManagerAction;
      break;
    case ROLE.INVESTOR + ASSET.PROGRAM:
      actionCreator = cancelInvestorProgramRequestAction;
      fetchInRequests = fetchInRequestsInvestorAction;
      break;
    default:
      throw `Error role or type [${role}|${asset}]`;
  }

  return dispatch(actionCreator(id, authorization))
    .then(() => {
      dispatch(fetchInRequests(authorization, 0, 100));
      dispatch(fetchProfileHeaderInfoAction());
      dispatch(
        alertMessageActions.success(
          `${ROLE_ENV}.dashboard-page.requests.success-cancel-request`,
          true
        )
      );
      onFinally();
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
      onFinally();
    });
};
