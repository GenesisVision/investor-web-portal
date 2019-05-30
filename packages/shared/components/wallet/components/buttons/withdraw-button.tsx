import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import ArrowIcon from "shared/media/arrow-up.svg";

import WalletButton, { ParentWalletButtonProps } from "./wallet-button";

export const _WithdrawButton: React.FC<Props> = ({
  t,
  handleOpen,
  disabled
}) => (
  <WalletButton
    title={t("wallet-page.buttons.withdraw")}
    handleOpen={handleOpen}
    className="wallet-list__withdraw"
    disabled={disabled}
  >
    <img src={ArrowIcon} alt={t("wallet-page.buttons.withdraw")} />
  </WalletButton>
);

interface Props extends InjectedTranslateProps, ParentWalletButtonProps {}

const WithdrawButton = React.memo(translate()(_WithdrawButton));
export default WithdrawButton;
