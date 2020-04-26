import { TradesRow } from "pages/trades/binance-trade-page/trading/trades/trades-row";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { Trade } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext } from "react";

interface Props {
  items: Trade[];
}

const _Trades: React.FC<Props> = ({ items }) => {
  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);
  return (
    <div>
      <table>
        <thead>
          <th>Price ({baseAsset})</th>
          <th>Amount ({quoteAsset})</th>
          <th>Time</th>
        </thead>
        <tbody>
          {items.map(({ price, qty, time }, i) => (
            <TradesRow
              price={price}
              prevPrice={items[i + 1]?.price}
              amount={qty}
              time={time}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Trades = React.memo(_Trades);
