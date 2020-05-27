import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import { TradeCurrency } from "pages/trades/binance-trade-page/trading/trading.types";
import { TransferDialog } from "pages/trades/binance-trade-page/trading/transfer/transfer.dialog";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  asset: TradeCurrency;
}

const _TransferButton: React.FC<Props> = ({ asset }) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  return (
    <>
      <GVButton
        noPadding
        size={GV_BTN_SIZE.SMALL}
        variant={"text"}
        onClick={setIsOpen}
      >
        {t("Transfer")}
      </GVButton>
      <TransferDialog
        asset={asset}
        open={isOpen}
        onClose={setIsClose}
        onApply={setIsClose}
      />
    </>
  );
};

export const TransferButton = React.memo(_TransferButton);