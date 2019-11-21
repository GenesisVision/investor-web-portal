import { DialogLoader } from "components/dialog/dialog-loader/dialog-loader";
import { updateWalletTimestampAction } from "components/wallet/actions/wallet.actions";
import { walletsSelector } from "components/wallet/reducers/wallet.reducers";
import { WalletData } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twoFactorEnabledSelector } from "reducers/2fa-reducer";
import { SetSubmittingType } from "utils/types";

import * as walletWithdrawService from "../services/wallet-withdraw.services";
import WalletWithdrawForm, {
  IWalletWithdrawFormValues
} from "./wallet-withdraw-form";
import WalletWithdrawRequest from "./wallet-withdraw-request/wallet-withdraw-request";

const _WalletWithdrawContainer: React.FC<Props> = ({ currentWallet }) => {
  const twoFactorEnabled = useSelector(twoFactorEnabledSelector);
  const wallets = useSelector(walletsSelector);
  const dispatch = useDispatch();
  const [isSuccess, setSuccess, setNotSuccess] = useIsOpen();
  const { errorMessage, sendRequest } = useApiRequest({
    request: values =>
      dispatch(walletWithdrawService.newWithdrawRequest(values)),
    catchCallback: () => setNotSuccess()
  });
  const handleSubmit = useCallback(
    (values: IWalletWithdrawFormValues, setSubmitting: SetSubmittingType) => {
      sendRequest(
        { ...values, amount: Number(values.amount) },
        setSubmitting
      ).then(() => {
        setSuccess();
        dispatch(updateWalletTimestampAction());
      });
    },
    []
  );
  if (!wallets.length) return <DialogLoader />;
  const enabledWallets = wallets.filter(wallet => wallet.isWithdrawalEnabled);
  return isSuccess ? (
    <WalletWithdrawRequest />
  ) : (
    <WalletWithdrawForm
      wallets={enabledWallets}
      currentWallet={currentWallet}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      twoFactorEnabled={twoFactorEnabled}
    />
  );
};

interface Props {
  currentWallet: WalletData;
}

const WalletWithdrawContainer = React.memo(_WalletWithdrawContainer);
export default WalletWithdrawContainer;
