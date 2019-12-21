import DetailsBlock from "components/details/details-block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Link from "components/link/link";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { WalletData } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";

import useHashTab from "../../services/hashTab.hook";
import { WALLET_TOTAL_PAGE_ROUTE } from "../../wallet.routes";
import AllDepositsWithdrawalsRow from "./wallet-deposits-withdrawals/all-deposits-withdrawals-row";
import WalletDepositsWithdrawals from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals";
import { WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS } from "./wallet-deposits-withdrawals/wallet-deposits-withdrawals.constants";
import WalletList from "./wallet-list/wallet-list";
import TransactionsRow from "./wallet-transactions/transactions-row";
import WalletTransactions from "./wallet-transactions/wallet-transactions";
import { WALLET_TOTAL_TRANSACTIONS_COLUMNS } from "./wallet-transactions/wallet-transactions.constants";

const _WalletTablesTotal: React.FC<Props> = ({ wallets }) => {
  const [t] = useTranslation();
  const { tab } = useHashTab<TABS>(TABS.WALLETS_TAB);
  return (
    <DetailsBlock table>
      <DetailsBlockTabs value={tab}>
        <GVTab
          value={TABS.WALLETS_TAB}
          label={
            <Link to={`${WALLET_TOTAL_PAGE_ROUTE}${TABS.WALLETS_TAB}`}>
              {t("wallet-page.tabs.wallets")}
            </Link>
          }
        />
        <GVTab
          className={"gv-tab"}
          value={TABS.TRANSACTIONS_TAB} //TODO add disable prop
          label={
            <Tooltip
              horizontal={HORIZONTAL_POPOVER_POS.LEFT}
              render={() => (
                <div className="tooltip__content">
                  {t("wallet-page.tooltip.transactions")}
                </div>
              )}
            >
              <Link to={`${WALLET_TOTAL_PAGE_ROUTE}${TABS.TRANSACTIONS_TAB}`}>
                {t("wallet-page.tabs.transactions")}
              </Link>
            </Tooltip>
          }
        />
        <GVTab
          className={"gv-tab"}
          value={TABS.EXTERNAL_TAB}
          label={
            <>
              <Tooltip
                horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                render={() => (
                  <div className="tooltip__content">
                    {t("wallet-page.tooltip.deposit")}
                  </div>
                )}
              >
                <Link to={`${WALLET_TOTAL_PAGE_ROUTE}${TABS.EXTERNAL_TAB}`}>
                  {t("wallet-page.tabs.deposit")}
                </Link>
              </Tooltip>
              <Tooltip
                horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                render={() => (
                  <div className="tooltip__content">
                    {t("wallet-page.tooltip.withdrawals")}
                  </div>
                )}
              >
                <Link to={`${WALLET_TOTAL_PAGE_ROUTE}${TABS.EXTERNAL_TAB}`}>
                  {t("wallet-page.tabs.withdrawals")}
                </Link>
              </Tooltip>
            </>
          }
        />
      </DetailsBlockTabs>
      {tab === TABS.WALLETS_TAB && <WalletList wallets={wallets} />}
      {tab === TABS.TRANSACTIONS_TAB && (
        <WalletTransactions
          columns={WALLET_TOTAL_TRANSACTIONS_COLUMNS}
          renderBodyRow={(transaction, updateRow, updateItems) => (
            <TransactionsRow transaction={transaction} update={updateItems} />
          )}
        />
      )}
      {tab === TABS.EXTERNAL_TAB && (
        <WalletDepositsWithdrawals
          columns={WALLET_TOTAL_DEPOSITS_WITHDRAWALS_COLUMNS}
          renderBodyRow={(transaction, updateRow, updateItems) => (
            <AllDepositsWithdrawalsRow
              transaction={transaction}
              update={updateItems}
            />
          )}
        />
      )}
    </DetailsBlock>
  );
};

enum TABS {
  WALLETS_TAB = "",
  TRANSACTIONS_TAB = "#transactions",
  EXTERNAL_TAB = "#external"
}

interface Props {
  wallets: WalletData[];
}

const WalletContainerTotal = React.memo(_WalletTablesTotal);
export default WalletContainerTotal;
