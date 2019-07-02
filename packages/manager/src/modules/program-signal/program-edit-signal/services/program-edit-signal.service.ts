import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { ManagerThunk, ResponseError } from "shared/utils/types";

export const programEditSignal = (
  id: string,
  successFee: number,
  volumeFee: number
): ManagerThunk<Promise<void>> => (dispatch): Promise<void> => {
  const authorization = authService.getAuthArg();
  const requestData = {
    programId: id,
    successFee,
    volumeFee
  };
  return managerApi
    .v10ManagerSignalEditPost(authorization, requestData)
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-edit-signal.success-alert-message",
          true
        )
      );
      return;
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};
