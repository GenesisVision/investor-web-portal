import { CancelablePromise } from "gv-api-web";
import investmentsApi from "services/api-client/investments-api";
import walletApi from "services/api-client/wallet-api";
import authService from "services/auth-service";
import { FUND_CURRENCY } from "shared/constants/constants";

import { FundWithdraw, FundWithdrawInfoResponse } from "../fund-withdraw.types";

export const getFundWithdrawInfo = ({
  id
}: {
  id: string;
}): CancelablePromise<FundWithdrawInfoResponse> => {
  const auth = authService.getAuthArg();
  return CancelablePromise.all([
    investmentsApi.getFundWithdrawInfo(id, auth, {
      currency: FUND_CURRENCY
    }),
    walletApi.getWalletAvailable(FUND_CURRENCY, auth)
  ]).then(([withdrawInfo, walletMulti]) => ({
    withdrawInfo,
    wallets: walletMulti.wallets
  }));
};

export const withdrawFund = ({
  value,
  id
}: {
  value: FundWithdraw;
  id: string;
}): any => investmentsApi.withdrawFromFund(id, authService.getAuthArg(), value);
