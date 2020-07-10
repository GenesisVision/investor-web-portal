import clsx from "clsx";
import {
  SORTING_DIRECTION,
  switchDirection
} from "components/table/helpers/sorting.helpers";
import { Text } from "components/text/text";
import { SortingType } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { MergedTickerSymbolType } from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useCallback } from "react";

import styles from "./market-watch.module.scss";

interface Props {
  dataType: "number" | "string";
  setSorting: (sorting: SortingType) => void;
  field: keyof MergedTickerSymbolType;
  sorting: SortingType;
}

export const MarketWatchHeaderCell: React.FC<Props> = React.memo(
  ({ dataType, field, sorting, children, setSorting }) => {
    const handleChangeSorting = useCallback(
      (field: keyof MergedTickerSymbolType) => () => {
        const direction =
          field !== sorting.field
            ? sorting.direction
            : switchDirection(sorting.direction);
        setSorting({ dataType, field, direction });
      },
      [setSorting, sorting, dataType]
    );
    const isSelected = field === sorting.field;
    return (
      <th
        className={clsx(styles["market-watch__th"])}
        onClick={handleChangeSorting(field)}
      >
        <span
          className={clsx({
            [styles["market-watch__th--asc"]]:
              isSelected && sorting.direction === SORTING_DIRECTION.ASC,
            [styles["market-watch__th--desc"]]:
              isSelected && sorting.direction === SORTING_DIRECTION.DESC
          })}
        >
          <Text size={"small"} muted>
            {children}
          </Text>
        </span>
      </th>
    );
  }
);
