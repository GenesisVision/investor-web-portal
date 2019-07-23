import "./wallet-copytrading.scss";
import "../wallet-list/wallet-list.scss";

import { CopyTradingAccountInfo } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Profitability from "shared/components/profitability/profitability";
import Table from "shared/components/table/components/table";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import useIsOpen from "shared/hooks/is-open.hook";
import TransferPopup from "shared/modules/transfer/transfer-popup";
import {
  TRANSFER_CONTAINER,
  TRANSFER_DIRECTION
} from "shared/modules/transfer/transfer.types";
import { formatCurrencyValue } from "shared/utils/formatter";
import { MiddlewareDispatch } from "shared/utils/types";

import { fetchAccounts } from "../../../services/wallet.services";
import { composeWalletCopytradingCurrencyUrl } from "../../../wallet.routes";
import WalletCopytradingButtons from "./wallet-copytrading-buttons";
import { WALLET_COPYTRADING_COLUMNS } from "./wallet-copytrading.constants";

const _WalletCopytrading: React.FC<Props> = ({
  service,
  t,
  copyTradingAccounts,
  copyTradingAccountsPending
}) => {
  const [isOpenAddFunds, setIsOpenAddFunds, setIsCloseAddFunds] = useIsOpen();
  const [isOpenWithdraw, setIsOpenWithdraw, setIsCloseWithdraw] = useIsOpen();
  const [currentAccount, setCurrentAccount] = useState<
    CopyTradingAccountInfo | undefined
  >(undefined);
  useEffect(() => {
    service.fetchAccounts();
  }, []);
  const handleOpenPopup = useCallback(
    (openMethod: () => void) => (
      currentAccount?: CopyTradingAccountInfo
    ) => () => {
      setCurrentAccount(currentAccount);
      openMethod();
    },
    []
  );
  return (
    <div className="wallet-list">
      <Table
        isPending={copyTradingAccountsPending && !copyTradingAccounts.length}
        items={copyTradingAccounts}
        columns={WALLET_COPYTRADING_COLUMNS}
        renderHeader={column => (
          <span
            className={`wallet-list__cell wallet-list__cell--${column.name}`}
          >
            {t(`wallet-page.copytrading.${column.name}`)}
          </span>
        )}
        renderBodyRow={account => (
          <TableRow className="wallet-list__row">
            <TableCell className="wallet-list__cell wallet-list__cell--wallet">
              <Link
                className="wallet-list__link"
                to={{
                  pathname: composeWalletCopytradingCurrencyUrl(
                    account.currency.toLowerCase()
                  ),
                  state: `/ ${t(
                    "wallet-copytrading-page.copytrading-accounts"
                  )}`
                }}
              >
                <WalletImage
                  url={account.logo}
                  alt={account.currency}
                  imageClassName="wallet-list__icon"
                />
                {account.currency}
              </Link>
            </TableCell>
            <TableCell className="wallet-list__cell wallet-list__cell--balance">
              <Profitability value={account.balance}>
                <NumberFormat
                  value={formatCurrencyValue(account.balance, account.currency)}
                  thousandSeparator=" "
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="wallet-list__cell wallet-list__cell--equity">
              <Profitability value={account.equity}>
                <NumberFormat
                  value={formatCurrencyValue(account.equity, account.currency)}
                  thousandSeparator=" "
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="wallet-list__cell wallet-list__cell--freeMargin">
              <Profitability value={account.freeMargin}>
                <NumberFormat
                  value={formatCurrencyValue(account.equity, account.currency)}
                  thousandSeparator=" "
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="wallet-list__cell wallet-list__cell--buttons">
              <WalletCopytradingButtons
                account={account}
                handleOpenWithdrawPopup={handleOpenPopup(setIsOpenWithdraw)}
                handleOpenAddFundsPopup={handleOpenPopup(setIsOpenAddFunds)}
              />
            </TableCell>
          </TableRow>
        )}
      />
      {currentAccount && (
        <>
          <TransferPopup
            title={t("wallet-withdraw.title")}
            sourceType={TRANSFER_DIRECTION.COPYTRADING_ACCOUNT}
            currentItem={currentAccount}
            open={isOpenWithdraw}
            onClose={setIsCloseWithdraw}
          />
          <TransferPopup
            title={t("wallet-deposit.title")}
            currentItemContainer={TRANSFER_CONTAINER.DESTINATION}
            destinationType={TRANSFER_DIRECTION.COPYTRADING_ACCOUNT}
            currentItem={currentAccount}
            open={isOpenAddFunds}
            onClose={setIsCloseAddFunds}
          />
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    fetchAccounts: () => dispatch(fetchAccounts())
  }
});

interface Props extends WithTranslation, DispatchProps, OwnProps {}

interface OwnProps {
  copyTradingAccounts: CopyTradingAccountInfo[];
  copyTradingAccountsPending: boolean;
}

interface DispatchProps {
  service: { fetchAccounts: () => void };
}

const WalletCopytrading = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_WalletCopytrading);
export default WalletCopytrading;
