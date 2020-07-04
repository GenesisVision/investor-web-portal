import { Center } from "components/center/center";
import { CHIP_TYPE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import GVButton from "components/gv-button";
import { RowItem } from "components/row-item/row-item";
import useIsOpen from "hooks/is-open.hook";
import WalletAddFundsPopup from "modules/wallet-add-funds/wallet-add-funds-popup";
import React from "react";
import { useTranslation } from "react-i18next";
import { Clickable, CurrencyEnum } from "utils/types";

import styles from "./wallet-deposit.module.scss";

const _WalletDeposit: React.FC<Props> = ({
  type,
  disabled,
  currency = "GVT"
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const Button =
    type === WALLET_DEPOSIT_BUTTON_TYPE.SMALL ? SmallButton : FullButton;
  return (
    <>
      <Button disabled={disabled} onClick={setOpenPopup} />
      <WalletAddFundsPopup
        currentCurrency={currency}
        onClose={setClosePopup}
        open={isOpenPopup}
      />
    </>
  );
};

interface IFullButtonProps extends Clickable {
  disabled?: boolean;
}

const FullButton: React.FC<IFullButtonProps> = React.memo(
  ({ disabled, onClick }) => {
    const [t] = useTranslation();
    const label = t("wallet-page:deposit");
    return (
      <GVButton
        className={label}
        size={"large"}
        disabled={disabled}
        onClick={onClick}
      >
        <Center>
          <RowItem
            size={"small"}
            className={styles["wallet-deposit__full-button-icon"]}
          >
            +
          </RowItem>
          <RowItem>{label}</RowItem>
        </Center>
      </GVButton>
    );
  }
);

const SmallButton: React.FC<Clickable> = React.memo(({ onClick }) => {
  const [t] = useTranslation();
  const label = t("wallet-page:deposit");
  return (
    <ChipButton
      className={label}
      onClick={onClick}
      size={"small"}
      chipLabel={"+"}
      type={CHIP_TYPE.POSITIVE}
    />
  );
});

interface Props {
  currency?: CurrencyEnum;
  disabled?: boolean;
  type?: WALLET_DEPOSIT_BUTTON_TYPE;
}

export enum WALLET_DEPOSIT_BUTTON_TYPE {
  SMALL = "SMALL",
  FULL = "FULL"
}

const WalletDeposit = React.memo(_WalletDeposit);
export default WalletDeposit;
