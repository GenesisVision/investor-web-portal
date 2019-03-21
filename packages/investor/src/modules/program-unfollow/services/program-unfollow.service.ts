import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import signalApi from "shared/services/api-client/signal-api";
import authService from "shared/services/auth-service";
import { ResponseError } from "shared/utils/types";

export const detachToSignal = (programId: string, onSuccess: () => void) => (
  dispatch: Dispatch
) => {
  const authorization = authService.getAuthArg();
  return signalApi
    .v10SignalDetachByIdPost(programId, authorization)
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "unfollow-program.success-alert-message",
          true
        )
      );
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};
