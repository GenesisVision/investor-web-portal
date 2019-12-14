import {
  ItemsType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import { CancelablePromise, InternalTransferRequest } from "gv-api-web";
import { TransferFormValues } from "modules/transfer/components/transfer-form.helpers";
import walletApi from "services/api-client/wallet-api";
import authService from "services/auth-service";
import { formatCurrencyValue } from "utils/formatter";

export const transferRequest = (
  request: Pick<TransferFormValues, keyof InternalTransferRequest>
): CancelablePromise<any> =>
  walletApi.transfer(authService.getAuthArg(), {
    request: request as InternalTransferRequest
  });

export const getTransferAll = (
  values: { amount: number; sourceId: string },
  sourceItems: ItemsType
): boolean => {
  const { amount, sourceId } = values;
  const selectedSourceItem = getItem(sourceItems, sourceId);
  const formattedAvailableSourceItem = formatCurrencyValue(
    selectedSourceItem.available,
    selectedSourceItem.currency
  );
  return String(amount) === formattedAvailableSourceItem;
};

export type getItemsType<T> = (items: T[], sourceId: string) => T[];
export const getOtherItems: getItemsType<WalletItemType> = (items, sourceId) =>
  items.filter(({ id }) => id !== sourceId);

export type getItemType<T> = (items: T[], sourceId: string) => T;
export const getItem: getItemType<WalletItemType> = (items, currentItemId) =>
  items.find(({ id }) => id === currentItemId) || items[0];
