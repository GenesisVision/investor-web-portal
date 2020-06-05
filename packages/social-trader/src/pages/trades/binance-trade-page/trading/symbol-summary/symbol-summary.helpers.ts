import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TerminalTickerContext } from "pages/trades/binance-trade-page/trading/terminal-ticker.context";
import { getSymbolFromState } from "pages/trades/binance-trade-page/trading/terminal.helpers";
import {
  MarkPrice,
  SymbolSummaryData
} from "pages/trades/binance-trade-page/trading/terminal.types";
import { useContext, useEffect, useState } from "react";
import { useSockets } from "services/websocket.service";
import { safeGetElemFromArray } from "utils/helpers";

export const useSymbolData = () => {
  const { connectSocket } = useSockets();

  const [markPrice, setMarkPrice] = useState<MarkPrice | undefined>();

  const { markPriceSocket, getMarkPrice } = useContext(TerminalMethodsContext);
  const items = useContext(TerminalTickerContext);
  const { symbol, terminalType } = useContext(TerminalInfoContext);
  const textSymbol = getSymbolFromState(symbol);
  const tickerData = items
    ? safeGetElemFromArray(items, item => item.symbol === textSymbol)
    : undefined;

  useEffect(() => {
    if (!getMarkPrice) {
      setMarkPrice(undefined);
      return;
    }
    getMarkPrice({ symbol: textSymbol }).subscribe(data => {
      setMarkPrice(data);
      markPriceSocket!(connectSocket, textSymbol).subscribe(data => {
        setMarkPrice({ ...markPrice, ...data });
      });
    });
  }, [getMarkPrice, symbol, terminalType]);

  return tickerData ? { tickerData, markPrice } : undefined;
};

export const getTickerSymbolLoaderData = (): SymbolSummaryData => {
  return {
    tickerData: {
      baseAsset: "BTC",
      baseAssetPrecision: 0,
      baseCommissionPrecision: 0,
      filters: [],
      icebergAllowed: false,
      isMarginTradingAllowed: false,
      isSpotTradingAllowed: false,
      ocoAllowed: false,
      orderTypes: ["LIMIT"],
      quoteAsset: "USDT",
      quoteCommissionPrecision: 0,
      quoteOrderQtyMarketAllowed: false,
      quotePrecision: 0,
      status: "0",
      symbol: "BTCUSDT",
      eventType: "0",
      eventTime: 0,
      priceChange: "0",
      priceChangePercent: "0",
      weightedAvgPrice: "0",
      prevClosePrice: "0",
      lastPrice: "0",
      lastQty: "0",
      bestBid: "0",
      bestBidQnt: "0",
      bestAsk: "0",
      bestAskQnt: "0",
      open: "0",
      high: "0",
      low: "0",
      volume: "0",
      volumeQuote: "0",
      openTime: 0,
      closeTime: 0,
      firstTradeId: 0,
      lastTradeId: 0,
      totalTrades: 0
    }
  };
};
