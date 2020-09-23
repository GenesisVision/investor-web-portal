import { Text } from "components/text/text";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { AssetBalance } from "pages/trade/binance-trade-page/trading/terminal.types";
import { FundsRow } from "pages/trade/binance-trade-page/trading/trading-tables/funds/funds-row";
import {
  FUNDS_TABLE_COLUMNS,
  FUTURES_FUNDS_TABLE_COLUMNS
} from "pages/trade/binance-trade-page/trading/trading-tables/funds/funds.helpers";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import styles from "./funds.module.scss";

interface Props {
  items: AssetBalance[];
}

const _Funds: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  const { terminalType } = useContext(TerminalInfoContext);
  const columns =
    terminalType === "spot" ? FUNDS_TABLE_COLUMNS : FUTURES_FUNDS_TABLE_COLUMNS;
  return (
    <TradeTable
      className={styles["funds__table"]}
      items={items}
      columns={columns}
      renderHeaderCell={({ name }) => (
        <th>
          <Text muted>{t(name)}</Text>
        </th>
      )}
      renderRow={({ asset, free, locked }: AssetBalance) => (
        <FundsRow asset={asset} available={free} locked={locked} />
      )}
    />
  );
};

export const Funds = React.memo(_Funds);
