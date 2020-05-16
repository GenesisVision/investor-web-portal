import { OrderBookCurrentPrice } from "pages/trades/binance-trade-page/trading/order-book/order-book-current-price";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContext } from "pages/trades/binance-trade-page/trading/trading-price.context";
import { TradingTickerContext } from "pages/trades/binance-trade-page/trading/trading-ticker.context";
import React, { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { headerAccountCurrencySelector } from "reducers/header-reducer";
import { formatValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";

export const OrderBookCurrentPriceContainer: React.FC = () => {
  const { trades } = useContext(TradingPriceContext);
  const {
    symbol: { quoteAsset }
  } = useContext(TradingInfoContext);
  const accountCurrency = useSelector(headerAccountCurrencySelector);
  const tickerItems = useContext(TradingTickerContext);
  const accountCurrencySymbolPrice = useMemo(() => {
    const rateBaseAsset = quoteAsset;
    const rateQuoteAsset = accountCurrency === "USD" ? "USDT" : accountCurrency;
    if (!tickerItems || !rateQuoteAsset) return;
    if (rateBaseAsset === rateQuoteAsset) return 1;
    const accountCurrencySymbol = `${rateBaseAsset}${rateQuoteAsset}`.toUpperCase();
    return safeGetElemFromArray(
      tickerItems,
      ({ symbol }) => symbol === accountCurrencySymbol
    ).lastPrice;
  }, [accountCurrency, tickerItems?.length, quoteAsset]);
  const lastTrade = trades[0];
  if (!lastTrade) return null;
  return (
    <OrderBookCurrentPrice
      tradeId={lastTrade.id}
      price={lastTrade.price}
      equivalent={
        accountCurrencySymbolPrice
          ? formatValue(+lastTrade.price * +accountCurrencySymbolPrice)
          : undefined
      }
      equivalentCurrency={accountCurrency}
    />
  );
};