import { CancelablePromise } from "gv-api-web";
import { Dispatch } from "redux";
import { CancelRequestType } from "shared/components/dashboard/dashboard.constants";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { ROLE_ENV } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";
import { ActionType } from "shared/utils/types";

import {
  cancelProgramRequestAction,
  fetchInRequestsAction
} from "../actions/dashboard.actions";
import { getPortfolioEvents } from "./dashboard.service";

export const getInRequests = () => (
  dispatch: Dispatch
): ActionType<CancelablePromise<any>> =>
  dispatch(fetchInRequestsAction(authService.getAuthArg(), 0, 100));

export const cancelRequest: CancelRequestType = ({
  id,
  onFinally,
  removeDisableBtn
}) => dispatch => {
  const authorization = authService.getAuthArg();
  const action = cancelProgramRequestAction(authorization, id);

  return dispatch(action)
    .then(() => {
      dispatch(getInRequests());
      dispatch(fetchProfileHeaderInfoAction());
      dispatch(getPortfolioEvents());
      dispatch(
        alertMessageActions.success(
          `${ROLE_ENV}.dashboard-page.requests.success-cancel-request`,
          true
        )
      );
      onFinally();
    })
    .catch(error => {
      dispatch(alertMessageActions.error(error.errorMessage));
      removeDisableBtn();
    });
};
