import { ColoredTextColor } from "components/colored-text/colored-text";
import { Push } from "components/link/link";
import { useParams } from "hooks/location";
import { NextPageContext } from "next";
import { Bar } from "pages/trades/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { getDividerParts } from "pages/trades/binance-trade-page/trading/order-book/order-book.helpers";
import { SymbolState } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import {
  Account,
  AssetBalance,
  ExchangeInfo,
  ExecutionReport,
  SymbolFilter,
  TerminalAuthDataType,
  TerminalCurrency
} from "pages/trades/binance-trade-page/trading/terminal.types";
import qs from "qs";
import { useEffect, useState } from "react";
import { TERMINAL_FOLDER_ROUTE } from "routes/trade.routes";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { cookieServiceCreator } from "utils/cookie-service.creator";
import { formatValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { getLocation } from "utils/location";
import { AnyObjectType } from "utils/types";

export const TERMINAL_ROUTE_SYMBOL_SEPARATOR = "_";

export const DEFAULT_SYMBOL: SymbolState = {
  baseAsset: "BTC",
  quoteAsset: "USDT"
};
const TRADE_AUTH_DATA_KEY = "TRADE_AUTH_DATA_KEY";
const initialState = { publicKey: "", privateKey: "" };

export const updateTerminalUrl = (url: string, updates?: Object) => {
  const params = getLocation().search.slice(1);
  const parsedParams = qs.parse(params || "");
  const updatedParams = qs.stringify({ ...parsedParams, ...updates });
  const ulrWithParams = `${url}${
    updatedParams.length ? `?${updatedParams}` : ""
  }`;
  Push(TERMINAL_FOLDER_ROUTE, ulrWithParams);
};

export const useUpdateTerminalUrlParams = () => {
  const params = useParams();
  const parsedParams = qs.parse(params || "");
  return (url: string, updates?: Object) => {
    const updatedParams = qs.stringify({ ...parsedParams, ...updates });
    const ulrWithParams = `${url}${
      updatedParams.length ? `?${updatedParams}` : ""
    }`;
    Push(TERMINAL_FOLDER_ROUTE, ulrWithParams);
  };
};

export const transformKline = (data: string[]): Bar => ({
  time: parseInt(data[0]),
  open: parseFloat(data[1]),
  high: parseFloat(data[2]),
  low: parseFloat(data[3]),
  close: parseFloat(data[4]),
  volume: parseFloat(data[5])
});

export const transformKlineWrapper = async (promise: Promise<string[][]>) => {
  const value = await promise;
  return value.map(transformKline);
};

export const getSymbolFilters = (
  exchangeInfo: ExchangeInfo,
  symbol: string
): SymbolFilter[] => {
  return safeGetElemFromArray(
    exchangeInfo.symbols,
    item => item.symbol === symbol
  ).filters;
};

export const authCookieService = (ctx?: NextPageContext) =>
  cookieServiceCreator({
    ctx,
    key: TRADE_AUTH_DATA_KEY,
    initialState,
    parse: true
  });

export const useAuthCookieState = () => authCookieService();

export const useTradeAuth = () => {
  const [authData, setAuthData] = useState(initialState);
  const { set, get } = useAuthCookieState();
  useEffect(() => {
    setAuthData(get());
  }, []);
  return {
    set: (values: TerminalAuthDataType) => {
      setAuthData(values);
      set(values);
    },
    authData
  };
};

export const USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE = "outboundAccountInfo";

export const filterOutboundAccountInfoStream = (
  userStream: Observable<any>
): Observable<Account> =>
  userStream.pipe(
    filter(info => info.eventType === USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE)
  );

export const filterOrderEventsStream = (
  userStream: Observable<any>
): Observable<ExecutionReport> =>
  userStream.pipe(filter(info => info.eventType === "executionReport"));

const normalizeBalanceList = (
  list: AssetBalance[]
): { [keys: string]: AssetBalance } => {
  const initObject: AnyObjectType = {};
  list.forEach(item => (initObject[item.asset] = item));
  return initObject;
};

export const updateAccountInfo = (currentData: Account, updates: Account) => {
  const normalizedCurrentBalances = normalizeBalanceList(currentData.balances);
  const normalizedUpdatesBalances = normalizeBalanceList(
    updates.balances || []
  );
  const balances = Object.values({
    ...normalizedCurrentBalances,
    ...normalizedUpdatesBalances
  });
  return { ...currentData, ...updates, balances };
};

export const stringifySymbolFromToParam = (symbol: SymbolState): string => {
  return [symbol.baseAsset, symbol.quoteAsset].join(
    TERMINAL_ROUTE_SYMBOL_SEPARATOR
  );
};

export const parseSymbolFromUrlParam = (param: string): SymbolState => {
  const splittedValue = param.split(TERMINAL_ROUTE_SYMBOL_SEPARATOR);
  return splittedValue.length > 1
    ? {
        baseAsset: splittedValue[0].toUpperCase(),
        quoteAsset: splittedValue[1].toUpperCase()
      }
    : DEFAULT_SYMBOL;
};

export const getTextColor = (value: number): ColoredTextColor | undefined => {
  if (value > 0) return "green";
  if (value < 0) return "red";
  return;
};

export const getSymbolFromState = ({
  quoteAsset,
  baseAsset
}: SymbolState): string => getSymbol(baseAsset, quoteAsset);

export const getSymbol = (
  base: TerminalCurrency,
  quote: TerminalCurrency
): string => base + quote;

export const getDecimalScale = (tick: string): number =>
  getDividerParts(tick).fracLength || 0;

export const formatValueWithTick = (value: any, tick: string): string => {
  const decimalScale = getDecimalScale(formatValue(tick));
  return formatValue(value, decimalScale);
};
