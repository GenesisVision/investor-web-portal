import { MarketWatch } from "pages/trades/binance-trade-page/trading/market-watch/market-watch";
import { TradingTickerContext } from "pages/trades/binance-trade-page/trading/trading-ticker.context";
import React, { useContext } from "react";

const _MarketWatchContainer: React.FC = () => {
  const items = useContext(TradingTickerContext);
  return items?.length ? <MarketWatch items={items} /> : null;
};

export const MarketWatchContainer = React.memo(_MarketWatchContainer);