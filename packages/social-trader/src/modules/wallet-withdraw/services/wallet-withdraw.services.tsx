import { CancelablePromise, CreateWithdrawalRequestModel } from "gv-api-web";
import { fetchWalletTransactions } from "pages/wallet/services/wallet.services";
import walletApi from "services/api-client/wallet-api";
import authService from "services/auth-service";
import { MiddlewareDispatch } from "utils/types";

export const fetchPaymentInfo = () => {
  return walletApi.getUserWithdrawalSummary(authService.getAuthArg());
};

export const newWithdrawRequest = (data: CreateWithdrawalRequestModel) => (
  dispatch: MiddlewareDispatch
): CancelablePromise<any> => {
  return walletApi
    .createWithdrawalRequest(authService.getAuthArg(), { model: data })
    .then(response => {
      dispatch(fetchWalletTransactions());
      return response;
    });
};
