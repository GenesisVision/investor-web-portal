import { USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE } from "pages/trades/binance-trade-page/trading/terminal.helpers";
import {
  Depth,
  IBinanceKline,
  IKline,
  KlineSocketType,
  Ticker,
  Trade,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/terminal.types";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConnectSocketMethodType } from "services/websocket.service";

import {
  depthTransform,
  tickerTransform,
  tradeTransform,
  transformExecutionReport,
  transformKline,
  transformOutboundAccountInfo
} from "./binance-spot-ws.helpers";

export const BINANCE_WS_API_URL = "wss://stream.binance.com:9443";

export enum BINANCE_WS_API_TYPE {
  WS = "ws",
  STREAM = "stream"
}

export enum ORDER_STATUSES {
  PARTIALLY_FILLED = "PARTIALLY_FILLED",
  FILLED = "FILLED",
  NEW = "NEW",
  FAIL = "FAIL",
  PENDING = "PENDING",
  REJECTED = "REJECTED"
}

export const tradeSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  symbol: TradeCurrency
): Observable<Trade> => {
  const socketType = "trade";
  const socketName = `${symbol.toLowerCase()}@${socketType}`;
  const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketType, url).pipe(map(tradeTransform));
};

export const depthSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  symbol: TradeCurrency
): Observable<Depth> => {
  const socketType = "depth";
  const socketName = `${symbol.toLowerCase()}@${socketType}`;
  const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketType, url).pipe(map(depthTransform));
};

export const marketTicketsSocket = (
  connectSocketMethod: ConnectSocketMethodType
): Observable<Ticker[]> => {
  const socketType = "arr";
  const socketName = `!ticker@${socketType}`;
  const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketType, url).pipe(
    map(items => items.map(tickerTransform))
  );
};

export const getUserStreamSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  listenKey: string
) => {
  const socketName = "accountInformation";
  const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${listenKey}`;
  return connectSocketMethod(socketName, url).pipe(
    map(item => {
      if (item.e === USER_STREAM_ACCOUNT_UPDATE_EVENT_TYPE)
        return transformOutboundAccountInfo(item);
      if (item.e === "executionReport") return transformExecutionReport(item);
      return item;
    })
  );
};

export const klineSocket = (
  connectSocketMethod: ConnectSocketMethodType
): KlineSocketType => (symbol: string, interval: string) => {
  const socketName = `${symbol}@kline_${interval}`;
  const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketName, url).pipe(
    map<IBinanceKline, IKline>(transformKline)
  );
};

type KlineSocket = ReturnType<typeof klineSocket>;
let r: KlineSocket;
