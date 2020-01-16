import "./wallet-withdraw.button.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import { CHIP_SIZE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import ArrowIcon from "media/arrow-up.svg";
import WalletWithdrawPopup from "modules/wallet-withdraw/wallet-withdraw-popup";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

const _WalletWithdrawButton: React.FC<Props> = ({
  type,
  disabled,
  currency
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const wallets = useSelector(walletsSelector);
  const Button =
    type === WALLET_DEPOSIT_BUTTON_TYPE.SMALL ? SmallButton : FullButton;
  return (
    <>
      <Button disabled={disabled} onClick={setOpenPopup} />
      <WalletWithdrawPopup
        currentWallet={safeGetElemFromArray(
          wallets,
          wallet => wallet.currency === currency
        )}
        open={isOpenPopup}
        onClose={setClosePopup}
      />
    </>
  );
};

const FullButton: React.FC<{
  disabled?: boolean;
  onClick: () => void;
}> = React.memo(({ disabled, onClick }) => {
  const [t] = useTranslation();
  return (
    <GVButton
      size={GV_BTN_SIZE.LARGE}
      color="secondary"
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
    >
      <>
        <ImageBaseElement
          className="wallet-withdraw-button__full-button-icon"
          src={ArrowIcon}
          alt={t("wallet-page.buttons.withdraw")}
        />
        {t("wallet-page.withdraw")}
      </>
    </GVButton>
  );
});

const SmallButton: React.FC<{ onClick: () => void }> = React.memo(
  ({ onClick }) => {
    const [t] = useTranslation();
    return (
      <ChipButton
        onClick={onClick}
        size={CHIP_SIZE.SMALL}
        chipLabel={
          <ImageBaseElement
            src={ArrowIcon}
            alt={t("wallet-page.buttons.withdraw")}
          />
        }
      />
    );
  }
);

interface Props {
  currency: CurrencyEnum;
  disabled?: boolean;
  type?: WALLET_DEPOSIT_BUTTON_TYPE;
}

export enum WALLET_DEPOSIT_BUTTON_TYPE {
  SMALL = "SMALL",
  FULL = "FULL"
}

const WalletWithdrawButton = React.memo(_WalletWithdrawButton);
export default WalletWithdrawButton;
