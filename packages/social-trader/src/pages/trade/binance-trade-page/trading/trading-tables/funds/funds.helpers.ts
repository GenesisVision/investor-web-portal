import { SortingColumn } from "components/table/components/filtering/filter.type";
import { AssetBalance } from "pages/trade/binance-trade-page/trading/terminal.types";
import { AnyObjectType, CurrencyEnum } from "utils/types";
import { fetchRate } from "services/rate-service";
import { formatCurrencyValue } from "utils/formatter";
import { formatValueWithTick } from "pages/trade/binance-trade-page/trading/terminal.helpers";

export type NormalizedFunds = {
  [key: string]: AssetBalance;
};

export const sortFundsFunc = (a: AssetBalance, b: AssetBalance) => {
  return b.amountInCurrency - a.amountInCurrency;
};

export const updateUsdValues = async (
  funds: NormalizedFunds,
  currency: CurrencyEnum
): Promise<NormalizedFunds> => {
  const newList = { ...funds };
  for (const item of Object.values(newList)) {
    const { asset, free, locked } = item;
    const rate = await fetchRate(asset as CurrencyEnum, currency);
    const total = formatValueWithTick(+free + +locked, "0.00000001");
    const newAmountInCurrency = +formatCurrencyValue(+total * rate, currency);
    newList[asset] = {
      ...newList[asset],
      amountInCurrency: newAmountInCurrency || newList[asset].amountInCurrency
    };
  }
  return newList;
};

export const FUNDS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "coin"
  },
  {
    name: "total"
  },
  {
    name: "available"
  },
  {
    name: "in-order"
  },
  {
    name: "-value"
  }
];

export const FUTURES_FUNDS_TABLE_COLUMNS: SortingColumn[] = [
  ...FUNDS_TABLE_COLUMNS,
  { name: "" }
];

export const normalizeFundsList = (
  list: AssetBalance[]
): { [key: string]: AssetBalance } => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.asset] = item));
  return initObject;
};
