import "./wallet-widget.scss";

import classNames from "classnames";
import { WalletData, WalletsGrandTotal } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import Link from "shared/components/link/link";
import Popover from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useAnchor from "shared/hooks/anchor.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import { formatCurrencyValue } from "shared/utils/formatter";

const _WalletWidget: React.FC<Props> = ({ info, className }) => {
  const [t] = useTranslation();
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const {
    currencyCcy: currency,
    availableCcy: available,
    investedCcy: invested,
    pendingCcy: pending,
    totalCcy: totalBalance
  } = info;
  return (
    <>
      <div className={classNames("wallet-widget", className)}>
        <div className="wallet-widget__wallet" onClick={setAnchor}>
          <WalletIcon primary={anchor !== undefined} />
          <span className="wallet-widget__value">{`${formatCurrencyValue(
            available,
            currency
          )} ${currency}`}</span>
        </div>
        <div className="wallet-widget__add">
          <Chip type={CHIP_TYPE.POSITIVE} onClick={setOpenPopup}>
            +
          </Chip>
        </div>
      </div>
      <WalletAddFundsPopup
        currentWallet={info as WalletData}
        onClose={setClosePopup}
        open={isOpenPopup}
      />
      <Popover anchorEl={anchor} onClose={clearAnchor}>
        <div className="wallet-details">
          <div className="wallet-details__item">
            <StatisticItem label={t("wallet-widget.total-balance")}>
              {`${formatCurrencyValue(totalBalance, currency)} ${currency}`}
            </StatisticItem>
          </div>
          <div className="wallet-details__item">
            <StatisticItem label={t("wallet-widget.available")}>
              {`${formatCurrencyValue(available, currency)} ${currency}`}
            </StatisticItem>
          </div>
          <div className="wallet-details__item">
            <StatisticItem label={t("wallet-widget.invested")}>
              {`${formatCurrencyValue(invested, currency)} ${currency}`}
            </StatisticItem>
          </div>
          <div className="wallet-details__item">
            <StatisticItem label={t("wallet-widget.pending")}>
              {`${formatCurrencyValue(pending, currency)} ${currency}`}
            </StatisticItem>
          </div>
          <div className="wallet-details__item">
            <div className="wallet-details__value">
              <Link to={WALLET_TOTAL_PAGE_ROUTE} onClick={clearAnchor}>
                {t("wallet-widget.details")} ›
              </Link>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};

interface Props {
  info: WalletsGrandTotal;
  className?: string;
}

const WalletWidget = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_WalletWidget);
export default WalletWidget;
