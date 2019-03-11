import { push } from "connected-react-router";
import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import walletApi from "shared/services/api-client/wallet-api";
import { ActionType } from "shared/utils/types";

export const confirmWithdraw = (requestId?: string, code?: string) => (
  dispatch: Dispatch<ActionType>
): Promise<any> =>
  walletApi
    .v10WalletWithdrawRequestConfirmPost({
      requestId,
      code
    })
    .then(response => {
      dispatch(push(PROGRAMS_ROUTE));
      dispatch(
        alertMessageActions.success(
          "wallet-withdraw.confirmation.success",
          true
        )
      );
      return response;
    })
    .catch(error => {
      dispatch(push(PROGRAMS_ROUTE));
      dispatch(alertMessageActions.error(error.errorMessage));
    });
