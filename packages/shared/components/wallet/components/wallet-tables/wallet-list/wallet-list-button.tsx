import { WalletData } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";

import DepositButton from "../../buttons/deposit-button";
import TransferButton from "../../buttons/transfer-button";
import WithdrawButton from "../../buttons/withdraw-button";

interface IWalletListButton {
  wallet: WalletData;
  handleOpenTransferPopup(
    wallet: WalletData
  ): (event: React.MouseEvent<HTMLElement>) => void;
  handleOpenWithdrawPopup(
    wallet: WalletData
  ): (event: React.MouseEvent<HTMLElement>) => void;
  handleOpenAddFundsPopup(
    wallet: WalletData
  ): (event: React.MouseEvent<HTMLElement>) => void;
}

const _WalletListButton: React.FC<
  IWalletListButton & InjectedTranslateProps
> = ({
  t,
  wallet,
  handleOpenTransferPopup,
  handleOpenWithdrawPopup,
  handleOpenAddFundsPopup
}) => (
  <>
    <TransferButton handleOpen={handleOpenTransferPopup(wallet)} />
    <WithdrawButton
      handleOpen={handleOpenWithdrawPopup(wallet)}
      disabled={wallet.isWithdrawalEnabled === false}
    />
    <DepositButton
      handleOpen={handleOpenAddFundsPopup(wallet)}
      disabled={wallet.isDepositEnabled === false}
    />
  </>
);

const WalletListButton = translate()(React.memo(_WalletListButton));
export default WalletListButton;
