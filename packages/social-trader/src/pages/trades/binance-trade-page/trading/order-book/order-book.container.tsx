import { OrderBook } from "pages/trades/binance-trade-page/trading/order-book/order-book";
import {
  collapseItems,
  getDividerParts,
  normalizeDepthList,
  updateDepthList,
  updateOrderBookFromBufferLogger,
  updateOrderBookFromSocketLogger
} from "pages/trades/binance-trade-page/trading/order-book/order-book.helpers";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  Depth,
  NormalizedDepth
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { useSockets } from "services/websocket.service";

interface Props {}

const ROW_HEIGHT = 16;

const _OrderBookContainer: React.FC<Props> = ({}) => {
  const { depthSocket, getDepth } = useContext(TerminalMethodsContext);
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);

  const { connectSocket } = useSockets();

  const {
    terminalType,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [tickValue, setTickValue] = useState<
    { value: string; default: boolean } | undefined
  >();
  const [list, setList] = useState<NormalizedDepth | undefined>();
  const [depthSocketData, setDepthSocketData] = useState<Depth | undefined>();
  const [depthSocketDataBuffer, setDepthSocketDataBuffer] = useState<
    Depth[] | undefined
  >([]);

  const dividerParts = getDividerParts(tickValue?.value);

  useEffect(() => {
    if (ref.current)
      setCount(Math.floor((ref.current.clientHeight / ROW_HEIGHT - 2) / 2));
  }, [ref.current?.clientHeight]);

  useEffect(() => {
    setList(undefined);
    setDepthSocketData(undefined);
    setDepthSocketDataBuffer([]);
    const symbol = getSymbol(baseAsset, quoteAsset);
    const depthStream = depthSocket(connectSocket, symbol);
    console.log("open stream");
    depthStream.subscribe(data => {
      setDepthSocketData(data);
    });
    timer(2000)
      .pipe(
        switchMap(() => {
          console.log("get snapshot");
          return getDepth(getSymbol(baseAsset, quoteAsset));
        })
      )
      .subscribe(data => {
        setList({
          ...data,
          asks: normalizeDepthList(data.asks),
          bids: normalizeDepthList(data.bids)
        });
      });
  }, [baseAsset, quoteAsset]);

  useEffect(() => {
    if (list && depthSocketDataBuffer?.length) {
      console.log("Update snapshot from buffer", depthSocketDataBuffer);
      let asks = list.asks;
      let bids = list.bids;
      depthSocketDataBuffer
        .filter(event => event.lastUpdateId > list.lastUpdateId)
        .forEach(event => {
          updateOrderBookFromBufferLogger({ event, list });
          asks = updateDepthList(asks, event.asks);
          bids = updateDepthList(bids, event.bids);
        });
      const lastBufferItem =
        depthSocketDataBuffer[depthSocketDataBuffer.length - 1];
      setList({
        ...list,
        asks,
        bids,
        lastUpdateId: lastBufferItem.lastUpdateId
      });
      setDepthSocketDataBuffer(undefined);
    }
  }, [list, depthSocketDataBuffer]);

  useEffect(() => {
    if (depthSocketData) {
      if (depthSocketDataBuffer) {
        console.log("set buffer");
        const newBuffer = [...depthSocketDataBuffer, depthSocketData];
        setDepthSocketDataBuffer(newBuffer);
      } else if (list) {
        const asks = updateDepthList(list.asks, depthSocketData.asks);
        const bids = updateDepthList(list.bids, depthSocketData.bids);
        updateOrderBookFromSocketLogger({
          terminalType,
          depthSocketData,
          list,
          asks,
          bids
        });
        setList({
          ...list,
          asks,
          bids,
          lastUpdateId: depthSocketData.lastUpdateId,
          firstUpdateId: depthSocketData.firstUpdateId
        });
      }
    }
  }, [depthSocketData]);

  const listForRender = useMemo(
    () => ({
      asks: Object.values(
        collapseItems(list ? list.asks : {}, dividerParts, {
          add: true,
          enable: !tickValue?.default
        })
      )
        .sort(([priceA], [priceB]) => +priceB - +priceA)
        .slice(-count),
      bids: Object.values(
        collapseItems(list ? list.bids : {}, dividerParts, {
          enable: !tickValue?.default
        })
      ).slice(0, count)
    }),
    [list, dividerParts, tickValue]
  );
  const { asks, bids } = listForRender;

  return (
    <OrderBook
      tickValue={tickValue}
      setTickValue={setTickValue}
      tablesBlockRef={ref}
      asks={asks}
      bids={bids}
    />
  );
};

export const OrderBookContainer = React.memo(_OrderBookContainer);
