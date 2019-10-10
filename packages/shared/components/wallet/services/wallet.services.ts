import {
  CancelablePromise,
  CopyTradingAccountInfo,
  MultiWalletExternalTransaction,
  WalletBaseData
} from "gv-api-web";
import { NextPageContext } from "next";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import {
  TableItems,
  mapToTableItems
} from "shared/components/table/helpers/mapper";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import signalApi from "shared/services/api-client/signal-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { CurrencyEnum, RootThunk } from "shared/utils/types";

import * as actions from "../actions/wallet.actions";

export const fetchWalletsWithCtx = (ctx?: NextPageContext): RootThunk<void> => async (
  dispatch,
  getState
) => {
  const authorization = authService.getAuthArg(ctx);
  const { info } = getState().wallet;
  if (info.isPending) return;
  const { currency } = getState().accountSettings;
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, authorization));
};

export const fetchWallets = (currency: CurrencyEnum, ctx?: NextPageContext): RootThunk<void> => async (
  dispatch
) => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, authorization));
};

export const fetchAccounts = (ctx?: NextPageContext): RootThunk<void> => async (
  dispatch
) => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(actions.updateAccountTimestampAction());
  await dispatch(actions.fetchAccountsAction(authorization));
};

export const fetchBaseWallets = (): RootThunk<Promise<WalletBaseData[]>> => (
  dispatch,
  getState
) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;
  return walletApi
    .getWalletMultiAvailable(currency, authorization)
    .then(res => res.wallets);
};

export const fetchWalletTransactions = (requestFilters?: FilteringType) =>
  actions.fetchWalletTransactionsAction(
    authService.getAuthArg(),
    requestFilters
  );

export const offPayFeesWithGvt = () =>
  walletApi.switchPayFeeInGvtOff(authService.getAuthArg());

export const onPayFeesWithGvt = () =>
  walletApi.switchPayFeeInGvtOn(authService.getAuthArg());

export const fetchMultiTransactions = (
  currency?: CURRENCIES,
  filters?: FilteringType
) => {
  const authorization = authService.getAuthArg();
  const filtering = {
    ...filters,
    currency
  };
  return walletApi
    .getMultiWalletTransactions(authorization, filtering)
    .then(mapToTableItems("transactions"));
};

export const fetchCopytradingAccounts = () =>
  signalApi
    .getCopytradingAccounts(authService.getAuthArg())
    .then(mapToTableItems<CopyTradingAccountInfo>("accounts"));

export const fetchMultiTransactionsExternal = (
  currency?: string,
  filters?: FilteringType
): CancelablePromise<TableItems<MultiWalletExternalTransaction>> => {
  const authorization = authService.getAuthArg();
  const filtering = {
    ...filters,
    currency
  };
  return walletApi
    .getWalletExternalTransactions(authorization, filtering)
    .then(mapToTableItems<MultiWalletExternalTransaction>("transactions"));
};
