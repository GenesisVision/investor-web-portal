import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { ChartBlock } from "pages/trades/binance-trade-page/trading/chart/chart-block";
import { MarketWatchBlock } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.block";
import { OrderBookBlock } from "pages/trades/binance-trade-page/trading/order-book/order-book.block";
import { PlaceOrder } from "pages/trades/binance-trade-page/trading/place-order/place-order";
import { TradesBlock } from "pages/trades/binance-trade-page/trading/trades/trades.block";
import {
  SymbolState,
  TradingInfoContext
} from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContextProvider } from "pages/trades/binance-trade-page/trading/trading-price.context";
import { TradingTables } from "pages/trades/binance-trade-page/trading/trading-tables/trading-tables";
import React, { useContext, useEffect } from "react";

import styles from "./trading.module.scss";

interface Props {
  authData: TradeAuthDataType;
  symbol?: SymbolState;
}

const _TradingContainer: React.FC<Props> = ({ authData, symbol }) => {
  const { setSymbol } = useContext(TradingInfoContext);
  useEffect(() => {
    if (symbol) setSymbol(symbol);
  }, [symbol]);
  return (
    <div className={styles["trading-grid"]}>
      <div className={styles["market-watch-grid-elem"]}>
        <MarketWatchBlock />
      </div>
      <div className={styles["chart-grid-elem"]}>
        <ChartBlock />
      </div>
      <div className={styles["tables-grid-elem"]}>
        <TradingTables />
      </div>
      <TradingPriceContextProvider>
        <div className={styles["order-book-grid-elem"]}>
          <OrderBookBlock />
        </div>
        <div className={styles["trades-grid-elem"]}>
          <TradesBlock />
        </div>
        <div className={styles["place-orders-grid-elem"]}>
          <PlaceOrder />
        </div>
      </TradingPriceContextProvider>
    </div>
  );
};

export const TradingContainer = React.memo(_TradingContainer);
