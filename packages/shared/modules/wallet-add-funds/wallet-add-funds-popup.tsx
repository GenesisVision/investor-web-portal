import { CopyTradingAccountInfo } from "gv-api-web";
import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import WalletAddFundsContainer, {
  CurrentWallet
} from "./components/wallet-add-funds-container";

const WalletAddFundsPopup: React.FC<Props> = ({
  onClose,
  currentWallet,
  open
}) => (
  <Dialog open={open} onClose={onClose}>
    <WalletAddFundsContainer currentWallet={currentWallet} />
  </Dialog>
);

interface Props {
  currentWallet: CurrentWallet;
  open: boolean;
  onClose(): void;
}

export default React.memo(WalletAddFundsPopup);
