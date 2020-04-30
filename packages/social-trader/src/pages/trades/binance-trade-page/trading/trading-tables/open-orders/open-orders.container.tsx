import { useTradeAuth } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { getOpenOrders } from "pages/trades/binance-trade-page/trading/services/binance-http.service";
import { filterOrderEventsStream } from "pages/trades/binance-trade-page/trading/services/binance-ws.helpers";
import { getUserStreamSocket } from "pages/trades/binance-trade-page/trading/services/binance-ws.service";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  ExecutionReport,
  QueryOrderResult
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";
import { useSockets } from "services/websocket.service";

import { OpenOrders } from "./open-orders";
import { normalizeOpenOrdersList } from "./open-orders.helpers";

interface Props {}

export const OpenOrdersContainer: React.FC<Props> = () => {
  const { authData } = useTradeAuth();
  const { connectSocket } = useSockets();

  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [list, setList] = useState<{
    [key: string]: QueryOrderResult;
  }>({});
  const [socketData, setSocketData] = useState<ExecutionReport | undefined>();

  useEffect(() => {
    if (!authData.publicKey) return;
    const openOrders = getOpenOrders(
      getSymbol(baseAsset, quoteAsset),
      authData
    );
    openOrders.pipe(map(normalizeOpenOrdersList)).subscribe(data => {
      setList(data);
    });
    const openOrdersStream = filterOrderEventsStream(
      getUserStreamSocket(connectSocket, authData)
    );
    openOrdersStream.subscribe(data => {
      setSocketData(data);
    });
  }, [authData, baseAsset, quoteAsset]);

  useEffect(() => {
    if (!socketData) return;
    const updatedList = { ...list };
    if (
      socketData.orderStatus === "EXPIRED" ||
      socketData.orderStatus === "FILLED" ||
      socketData.orderStatus === "CANCELED" ||
      socketData.executionType === "CANCELED" ||
      socketData.executionType === "EXPIRED"
    )
      delete updatedList[socketData.orderId];
    else
      updatedList[socketData.orderId] = {
        ...updatedList[socketData.orderId],
        ...socketData
      };
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(() => Object.values(list), [list]);
  return <OpenOrders items={items} />;
};
