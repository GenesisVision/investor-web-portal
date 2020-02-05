import * as React from "react";
import { composeUrl } from "utils/compose-url";

export const WALLET_TOTAL_PAGE_NAME = "wallet";
export const WALLET_TOTAL_PAGE_ROUTE = `/${WALLET_TOTAL_PAGE_NAME}`;
export const CURRENCY_SLUG = ":currency";
export const WALLET_CURRENCY_PAGE_ROUTE = `${WALLET_TOTAL_PAGE_ROUTE}/${CURRENCY_SLUG}`;

export const WALLET_CURRENCY_FOLDER_ROUTE = `${WALLET_TOTAL_PAGE_ROUTE}/[id]`;

export const composeWalletCurrencyUrl = composeUrl(
  WALLET_CURRENCY_PAGE_ROUTE,
  CURRENCY_SLUG
);
