import "./transfer.button.scss";

import { CHIP_SIZE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { InternalTransferRequestType } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import ConvertIcon from "media/convert.svg";
import TransferPopup from "modules/transfer/transfer-popup";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import React from "react";
import { useTranslation } from "react-i18next";

const _TransferButton: React.FC<Props> = ({
  singleCurrentItemContainer = false,
  size = GV_BTN_SIZE.LARGE,
  withIcon,
  color,
  variant,
  type = WALLET_BUTTON_TYPE.FULL,
  currentItem,
  sourceType,
  destinationType,
  title,
  currentItemContainer,
  label,
  onApply,
  disabled
}) => {
  const [t] = useTranslation();
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const Button = type === WALLET_BUTTON_TYPE.SMALL ? SmallButton : FullButton;
  return (
    <>
      <Button
        size={size}
        withIcon={withIcon}
        color={color}
        variant={variant}
        label={label}
        disabled={disabled}
        onClick={setIsOpenPopup}
      />
      <TransferPopup
        singleCurrentItemContainer={singleCurrentItemContainer}
        currentItem={currentItem}
        sourceType={sourceType}
        destinationType={destinationType}
        title={title || t("transfer.title")}
        currentItemContainer={currentItemContainer}
        onApply={onApply}
        open={isOpenPopup}
        onClose={setIsClosePopup}
      />
    </>
  );
};

interface Props {
  singleCurrentItemContainer?: boolean;
  size?: GV_BTN_SIZE;
  withIcon?: boolean;
  type?: WALLET_BUTTON_TYPE;
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  variant?: "text" | "outlined" | "contained";
  label?: string;
  disabled?: boolean;
  onApply: VoidFunction;
  currentItem: WalletItemType;
  sourceType?: InternalTransferRequestType;
  destinationType?: InternalTransferRequestType;
  title?: string;
  currentItemContainer?: TRANSFER_CONTAINER;
}

const FullButton: React.FC<{
  size?: GV_BTN_SIZE;
  withIcon?: boolean;
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  variant?: "text" | "outlined" | "contained";
  label?: string;
  disabled?: boolean;
  onClick: () => void;
}> = React.memo(
  ({ disabled, onClick, label, color, variant, withIcon, size }) => {
    const [t] = useTranslation();
    const labelText = label || t("wallet-page.transfer");
    return (
      <GVButton
        size={size}
        color={color || "secondary"}
        variant={variant || "outlined"}
        disabled={disabled}
        onClick={onClick}
      >
        <>
          {withIcon && (
            <img
              className="transfer-button__full-button-icon"
              src={ConvertIcon}
              alt={labelText}
            />
          )}
          {labelText}
        </>
      </GVButton>
    );
  }
);

const SmallButton: React.FC<{ onClick: () => void }> = React.memo(
  ({ onClick }) => {
    const [t] = useTranslation();
    return (
      <ChipButton
        onClick={onClick}
        size={CHIP_SIZE.SMALL}
        chipLabel={<img src={ConvertIcon} alt={t("wallet-page.transfer")} />}
      />
    );
  }
);

export enum WALLET_BUTTON_TYPE {
  SMALL = "SMALL",
  FULL = "FULL"
}

const TransferButton = React.memo(_TransferButton);
export default TransferButton;
