import clsx from "clsx";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { OrderBookCurrentPriceContainer } from "pages/trades/binance-trade-page/trading/order-book/order-book-current-price.container";
import { OrderBookTickSizeSelect } from "pages/trades/binance-trade-page/trading/order-book/order-book-tick-size-select";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import {
  DepthFullAmount,
  StringBidDepth
} from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { RefObject, useContext } from "react";

import { OrderBookTable } from "./order-book-table";
import styles from "./order-book.module.scss";

interface Props {
  listAmount: DepthFullAmount;
  tickValue?: { value: string; default: boolean };
  setTickValue: (value: { value: string; default: boolean }) => void;
  tablesBlockRef: RefObject<HTMLDivElement>;
  asks: StringBidDepth[];
  bids: StringBidDepth[];
}

const _OrderBook: React.FC<Props> = ({
  listAmount,
  tickValue,
  setTickValue,
  tablesBlockRef,
  asks,
  bids
}) => {
  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);
  return (
    <>
      <Row size={"small"}>
        <OrderBookTickSizeSelect value={tickValue} setValue={setTickValue} />
      </Row>
      <Row size={"small"}>
        <table className={styles["order-book__table"]}>
          <thead>
            <th>
              <Text muted size={"small"}>
                Price ({baseAsset})
              </Text>
            </th>
            <th>
              <Text muted size={"small"}>
                Amount ({quoteAsset})
              </Text>
            </th>
            <th>
              <Text muted size={"small"}>
                Total
              </Text>
            </th>
          </thead>
        </table>
      </Row>
      <Row size={"small"} className={styles["order-book__tables-row"]}>
        <div
          ref={tablesBlockRef}
          className={styles["order-book__tables-block"]}
        >
          <Row
            wide
            className={clsx(
              styles["order-book__table-block"],
              styles["order-book__table-block--reverse"]
            )}
          >
            <OrderBookTable
              fullAmount={listAmount.asks}
              tableTickSize={tickValue?.value}
              reverse
              color={"#ff0000"}
              items={asks}
            />
          </Row>
          <Row size={"small"}>
            <OrderBookCurrentPriceContainer />
          </Row>
          <Row
            wide
            size={"small"}
            className={styles["order-book__table-block"]}
          >
            <OrderBookTable
              fullAmount={listAmount.bids}
              tableTickSize={tickValue?.value}
              color={"#00ff00"}
              items={bids}
            />
          </Row>
        </div>
      </Row>
    </>
  );
};

export const OrderBook = React.memo(_OrderBook);
