import { ColoredTextColor } from "components/colored-text/colored-text";
import {
  LevelsSum,
  OrderBookRow
} from "pages/trade/binance-trade-page/trading/order-book/order-book.row";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalOpenOrdersContext } from "pages/trade/binance-trade-page/trading/terminal-open-orders.context";
import { StringBidDepth } from "pages/trade/binance-trade-page/trading/terminal.types";
import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/trading-price.context";
import React, { useContext, useEffect, useState } from "react";
import { getPercentageValue } from "utils/helpers";

import styles from "./order-book.module.scss";

interface Props {
  fullAmount: number;
  tableTickSize?: string;
  reverse?: boolean;
  items?: StringBidDepth[];
  color: ColoredTextColor;
}

const _OrderBookTable: React.FC<Props> = ({
  fullAmount,
  tableTickSize,
  reverse,
  color,
  items = []
}) => {
  const { openOrders } = useContext(TerminalOpenOrdersContext);
  const { setPrice } = useContext(TradingPriceContext);
  const {
    stepSize,
    tickSize,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const [hoveredRow, setHoveredRow] = useState<number | undefined>();
  const [levelSum, setLevelSum] = useState<LevelsSum>({
    avgPrice: 0,
    baseSum: 0,
    quoteSum: 0
  });

  useEffect(() => {
    if (hoveredRow !== undefined) {
      const first = reverse ? hoveredRow : 0;
      const last = reverse ? items.length : hoveredRow + 1;
      const selectedItems = items.slice(first, last);
      const avgPrice =
        selectedItems.reduce((sum, [price]) => sum + +price, 0) /
        (last - first);
      const baseSum = selectedItems.reduce(
        (sum, [_, amount]) => sum + +amount,
        0
      );
      const quoteSum = selectedItems.reduce(
        (sum, [price, amount]) => sum + +price * +amount,
        0
      );
      setLevelSum({ avgPrice, baseSum, quoteSum });
    }
  }, [hoveredRow, items]);

  const limitOrders = openOrders
    ? openOrders
        .filter(({ type }) => type.toUpperCase() === "LIMIT")
        .filter(
          ({ orderStatus }) =>
            orderStatus && orderStatus.toUpperCase() === "NEW"
        )
        .filter(
          ({ side }) =>
            (reverse && side === "Sell") ||
            (!reverse && side.toUpperCase() === "BUY")
        )
        .map(({ price }) => +price)
    : [];

  return (
    <table className={styles["order-book__table"]}>
      <tbody>
        {items.map(([price, amount], i) => {
          const hasOrder =
            i === 0
              ? !!limitOrders.find(limitOrderPrice => {
                  return limitOrderPrice >= +price;
                })
              : !!limitOrders.find(limitOrderPrice => {
                  return (
                    limitOrderPrice < +items[i - 1][0] &&
                    limitOrderPrice >= +price
                  );
                });
          const total = +price * +amount;
          return (
            <OrderBookRow
              setPrice={setPrice}
              stepSize={stepSize}
              tickSize={tickSize}
              baseAsset={baseAsset}
              quoteAsset={quoteAsset}
              key={price}
              hasOrder={hasOrder}
              barPercent={100 - getPercentageValue(total, fullAmount)}
              tableTickSize={tableTickSize}
              hovered={
                hoveredRow !== undefined &&
                (reverse ? i >= hoveredRow : i <= hoveredRow)
              }
              levelSum={hoveredRow === i ? levelSum : undefined}
              index={i}
              setHoveredRow={setHoveredRow}
              color={color}
              price={price}
              amount={amount}
              total={total}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export const OrderBookTable = React.memo(_OrderBookTable);
